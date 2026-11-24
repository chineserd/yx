# 评分等级设置：接口说明

V1.3 · 更新日期 2026-11-05 · 建议草稿，待研发确认及联调

## 文档范围与确认状态

本文对应PRD V2.4的SR-01至SR-06。展示项、等级数量、区间校验及报告生效范围沿用已确认业务要求。以下HTTP方法、路径、字段名称、鉴权方式、状态码及版本实现均为建议方案，不能视为线上已存在接口。接口拆分可由研发调整，但应保留独立保存、权限与历史数据约束。

原型当前使用浏览器存储，不发送下述API请求。字段及示例用于评审；真实鉴权、跨设备、并发控制、公布快照与历史兼容均未联调。

## 接口总览

| 编号／关联需求 | 能力 | 新旧归类 | 调用方 → 提供方 | 建议方法与路径 |
|---|---|---|---|---|
| G05／SR-02、03、04 | 读取本校配置 | 拟新增或扩展配置服务 | 教师设置页 → 配置服务 | GET /api/schools/{schoolId}/essay-grading-config |
| G06／SR-01、05 | 保存展示项 | 拟新增 | 教师设置页 → 配置服务 | PATCH /api/schools/{schoolId}/essay-grading-config/display |
| G07／SR-03、04、05 | 保存等级规则 | 拟新增 | 教师设置页 → 配置服务 | PUT /api/schools/{schoolId}/essay-grading-config/rules |
| G01／SR-01、06 | 读取单篇报告 | 拟复用／扩展 | 教师、学生报告 → 报告服务 | GET /api/essay-reports/{reportId} |
| G02／SR-06 | 保存评分与评语 | 拟复用／扩展 | 教师报告 → 评分服务 | PATCH /api/essay-reports/{reportId}/assessment |
| G03／SR-06 | 班级成绩及品第分布 | 拟复用／扩展 | 成绩概览 → 统计服务 | GET /api/tasks/{taskId}/essay-results |
| G04-A／SR-06 | 公布报告并固定版本 | 拟复用／扩展 | 教师公布操作 → 报告服务 | POST /api/tasks/{taskId}/essay-results/publish |
| G04-B／SR-06 | 导出班级成绩 | 拟复用／扩展 | 教师成绩概览 → 导出服务 | GET /api/tasks/{taskId}/essay-results/export |

G04原有公布、偏好与导出能力拆为可核对的操作；校级展示偏好由G05/G06承接，整体／品第模式切换为本地呈分偏好，不写回评分。复用接口的实际清单与权威文档尚未取得，以上路径是候选契约。

## 公共约定与数据模型

| 字段／位置 | 类型 | 必填／空值 | 含义、默认及校验 |
|---|---|---|---|
| schoolId／path | string | 配置接口必填 | 非空学校标识；服务端校验账号所属学校与配置权限，不能把客户端传入值当作授权。 |
| reportId、taskId／path | string | 对应接口必填 | 非空对象标识；从对象关联验证学校、班级和账号权限。 |
| Authorization／header | string | 受保护接口必填 | 建议使用Bearer令牌；若复用登录Cookie则沿用现有CSRF机制，最终协议待研发确认。 |
| Idempotency-Key／header | string | 写接口必填 | 一次逻辑提交一个非空唯一值；网络重试复用，同键不同正文拒绝。保存时效由研发确认。 |
| expectedVersion／body | string | 写接口必填 | 配置写入用configVersion，评分用reportVersion，公布用resultsVersion；不得静默覆盖新版本。 |
| code、message、requestId／response | string | 必填 | 业务码、面向调用方的说明、请求追踪标识；成功code=OK。 |
| data／response | object或null | 成功必有；失败null | 具体结构见各接口；没有业务记录与请求失败分别表达。 |
| errors／失败response | array<object> | 校验失败时有；其他可空数组 | 元素含field:string、reason:string、message:string；字段路径定位输入框。 |

读取操作不写入默认配置。首次学校配置由上线初始化或管理流程显式创建；未初始化返回CONFIG_NOT_FOUND，前端不可把默认示例当作已保存版本。当前原型预填值不代表该初始化服务已实现。所有时间采用带时区的ISO 8601；客户端展示按业务时区转换。

### 配置对象 Config

| 字段／位置 | 类型 | 必填／空值 | 含义、默认及校验 |
|---|---|---|---|
| schoolId | string | 必填 | 当前学校标识。 |
| configVersion | string | 必填 | 不透明版本标识；任何成功配置变更生成新版本。 |
| display.student | array<string> | 必填，1–3项 | 枚举percent、grade、level；必须包含固定项percent，grade及level可选且不重复。首次初始化建议仅percent，报告排序由PRD确定，不取决于数组顺序。 |
| display.teacherLevel | boolean | 必填 | 是否在教师整体评分模式展示等级；初始false，教师固定分数和品第按模式呈现。 |
| rules.basis | string | 必填 | 固定percent，不接受品第换算依据。 |
| rules.options | array<object> | 必填，1–10项 | 数组顺序为等级从高到低。 |
| rules.options[].id | string | 必填且唯一 | 稳定选项ID；改名不改ID。建议前端新建UUID，服务端在学校配置范围内校验唯一性。 |
| rules.options[].name | string | 必填 | 去除首尾空格后非空、不重复；0与U不是同一名称。名称最大长度及字符限制待研发与产品确认。 |
| rules.ranges | array<object> | 必填，1–10项 | 按最低分由高至低，数量独立于选项数量。 |
| rules.ranges[].id | string | 必填且唯一 | 稳定区间ID，建议UUID，便于错误定位。 |
| rules.ranges[].levelId | string | 必填 | 必须引用options内ID；相邻区间可同级，不可随分数降低反而升级。 |
| rules.ranges[].minScore | integer | 必填 | 0–100，严格递减、不可重复，末项固定0。最高区间含100，其余含下限不含上限。 |
| rulesComplete | boolean | 返回必填、只读 | 服务端根据保存规则校验后生成，客户端不可声明配置有效。 |
| updatedAt | string | 返回必填、只读 | 最后成功保存时间。 |

默认数据为8个选项5**、5*、5、4、3、2、1、U，最低分95、90、80、65、50、35、20、0。它们是当前原型预填参考值，不是DSE官方分数线。允许学校调整；配置ID与名称分别维护，名称修改后引用不丢失。

## G05 读取本校配置

建议GET /api/schools/{schoolId}/essay-grading-config；教师进入设置页、刷新或处理版本冲突时调用。须有当前学校配置读取权限；学生报告不通过本接口读取管理配置。输入为公共path schoolId及登录凭据，无body。无分页。成功返回公共包装，data为完整Config。

### 请求示例（方法、路径、鉴权均为建议）

```json
{
  "method": "GET",
  "path": "/api/schools/school-example/essay-grading-config",
  "headers": {
    "Authorization": "Bearer <登录令牌>"
  }
}
```

### 成功响应示例

```json
{
  "code": "OK",
  "message": "",
  "requestId": "req-example-001",
  "data": {
    "schoolId": "school-example",
    "configVersion": "cfg-12",
    "display": {
      "student": [
        "percent"
      ],
      "teacherLevel": false
    },
    "rules": {
      "basis": "percent",
      "options": [
        {
          "id": "level-1",
          "name": "5**"
        },
        {
          "id": "level-2",
          "name": "5*"
        },
        {
          "id": "level-3",
          "name": "5"
        },
        {
          "id": "level-4",
          "name": "4"
        },
        {
          "id": "level-5",
          "name": "3"
        },
        {
          "id": "level-6",
          "name": "2"
        },
        {
          "id": "level-7",
          "name": "1"
        },
        {
          "id": "level-8",
          "name": "U"
        }
      ],
      "ranges": [
        {
          "id": "range-1",
          "levelId": "level-1",
          "minScore": 95
        },
        {
          "id": "range-2",
          "levelId": "level-2",
          "minScore": 90
        },
        {
          "id": "range-3",
          "levelId": "level-3",
          "minScore": 80
        },
        {
          "id": "range-4",
          "levelId": "level-4",
          "minScore": 65
        },
        {
          "id": "range-5",
          "levelId": "level-5",
          "minScore": 50
        },
        {
          "id": "range-6",
          "levelId": "level-6",
          "minScore": 35
        },
        {
          "id": "range-7",
          "levelId": "level-7",
          "minScore": 20
        },
        {
          "id": "range-8",
          "levelId": "level-8",
          "minScore": 0
        }
      ]
    },
    "rulesComplete": true,
    "updatedAt": "2026-11-04T10:00:00Z"
  }
}
```

失败处理：CONFIG_NOT_FOUND显示未初始化状态及联系管理人员入口建议，具体初始化入口待产品确认；FORBIDDEN不展示其他学校配置；网络失败保留当前页并提供重试，不回退为默认已保存值。

## G06 自动保存展示项

建议PATCH /api/schools/{schoolId}/essay-grading-config/display；教师勾选展示项后调用，需配置修改权限。保存期间暂停勾选，成功后使用服务端返回值显示已自动保存。

| 字段／位置 | 类型 | 必填／空值 | 含义、默认及校验 |
|---|---|---|---|
| expectedVersion／body | string | 必填 | 当前已保存configVersion。 |
| display／body | object | 必填 | 完整展示子对象：student及teacherLevel，字段规则见Config。请求禁止携带rules。 |

等级被选中时校验服务器已保存规则，而不是页面未保存草稿。学生展示必须包含percent；grade和level可同时关闭。学生百分制分数及固定教师评分项不允许由请求取消。成功仅更新display及配置版本；rules原样保留。成功data为最新完整Config，前端更新已保存基线但不得覆盖当前规则草稿。

### 请求体示例

```json
{
  "expectedVersion": "cfg-12",
  "display": {
    "student": [
      "percent",
      "grade",
      "level"
    ],
    "teacherLevel": true
  }
}
```

### 成功响应示例（规则沿用G05，以下返回关键字段）

```json
{
  "code": "OK",
  "message": "",
  "requestId": "req-example-001",
  "data": {
    "schoolId": "school-example",
    "configVersion": "cfg-13",
    "display": {
      "student": [
        "percent",
        "grade",
        "level"
      ],
      "teacherLevel": true
    },
    "rulesComplete": true,
    "updatedAt": "2026-11-04T10:01:00Z"
  }
}
```

以上响应仅节选关键字段；实际data还须包含Config.rules，与G05读取结构一致。失败恢复上一次已保存勾选；RULES_INCOMPLETE提示先配置，DISPLAY_REQUIRED提示「百分制分數為固定展示項，請重新載入設定。」，VERSION_CONFLICT重新读取并让用户重试，不静默自动覆盖。

## G07 保存等级规则

建议PUT /api/schools/{schoolId}/essay-grading-config/rules；点击第二步底部「保存等級設定」时调用，需配置修改权限。抽屉完成、取消或页面规则编辑均不调用。

| 字段／位置 | 类型 | 必填／空值 | 含义、默认及校验 |
|---|---|---|---|
| expectedVersion／body | string | 必填 | 最近已保存configVersion，展示保存成功后应更新此基线。 |
| rules／body | object | 必填 | 完整规则集合，结构见Config；不允许携带display。 |

服务端一次校验并原子保存选项与区间，任何一项失败均不部分写入。删除后遗留levelId、空最低分、名称重名、末行不为0或等级倒置均拒绝；允许相邻区间引用同一levelId。成功data为完整Config，保留服务器当前display，生成新configVersion。保存失败保留规则草稿并定位错误；取消修改只恢复规则，不撤销展示项。

### 请求体示例

```json
{
  "expectedVersion": "cfg-13",
  "rules": {
    "basis": "percent",
    "options": [
      {
        "id": "level-1",
        "name": "5**"
      },
      {
        "id": "level-2",
        "name": "5*"
      },
      {
        "id": "level-3",
        "name": "5"
      },
      {
        "id": "level-4",
        "name": "4"
      },
      {
        "id": "level-5",
        "name": "3"
      },
      {
        "id": "level-6",
        "name": "2"
      },
      {
        "id": "level-7",
        "name": "1"
      },
      {
        "id": "level-8",
        "name": "U"
      }
    ],
    "ranges": [
      {
        "id": "range-1",
        "levelId": "level-1",
        "minScore": 95
      },
      {
        "id": "range-2",
        "levelId": "level-2",
        "minScore": 90
      },
      {
        "id": "range-3",
        "levelId": "level-3",
        "minScore": 80
      },
      {
        "id": "range-4",
        "levelId": "level-4",
        "minScore": 65
      },
      {
        "id": "range-5",
        "levelId": "level-5",
        "minScore": 50
      },
      {
        "id": "range-6",
        "levelId": "level-6",
        "minScore": 35
      },
      {
        "id": "range-7",
        "levelId": "level-7",
        "minScore": 20
      },
      {
        "id": "range-8",
        "levelId": "level-8",
        "minScore": 0
      }
    ]
  }
}
```

### 成功响应示例（关键字段）

```json
{
  "code": "OK",
  "message": "",
  "requestId": "req-example-001",
  "data": {
    "schoolId": "school-example",
    "configVersion": "cfg-14",
    "display": {
      "student": [
        "percent",
        "grade",
        "level"
      ],
      "teacherLevel": true
    },
    "rulesComplete": true,
    "updatedAt": "2026-11-04T10:02:00Z"
  }
}
```

实际成功data包含保存后的完整rules，格式同G05。界面使用服务端响应确认持久化成功，再清除草稿状态。

## G01 读取单篇作文报告

建议GET /api/essay-reports/{reportId}；教师从查看详情进入、学生打开本人已公布报告或刷新时调用。教师须具备对象访问权限，学生身份从会话推导且只能读取本人已公布报告。输入为path reportId，不接受学生自行指定audience绕过权限。

| 字段／位置 | 类型 | 必填／空值 | 含义、默认及校验 |
|---|---|---|---|
| reportId、reportVersion／data | string | 必填 | 报告标识与评分版本。 |
| status／data | string | 必填 | ungraded、graded、published；业务状态映射待对接已有枚举。 |
| assessment.dimensions／data | array<object> | 必填 | 四项原始分；每项key为content、expression、structure、mechanics，rawScore为0–10 number或null。缺项保留null。 |
| assessment.totalRaw／data | number或null | 必填 | 四项齐全时按4:3:2:1加权，否则null；服务端生成。 |
| assessment.gradeName／data | string或null | 必填 | round(totalRaw/10)映射；缺项null。不是参考等级。 |
| assessment.summary／data | string | 必填 | 已保存总评，缺少评语可为空字符串。 |
| scoreStandardVersion／data | string | 必填 | 原始评分规则版本；实际版本编号待研发提供。 |
| presentation.source／data | string | 必填 | current_config、published_snapshot、legacy：区分最新配置、公布快照和历史逻辑。 |
| presentation.configVersion／data | string或null | 必填 | 当前或公布时配置版本；legacy可null。 |
| presentation.levelName／data | string或null | 必填 | 按原始总分匹配等级；未评分、规则缺失或旧报告未记录时为null，不自动当U。 |
| presentation.display／data | object | 必填 | 当前访问角色适用的展示对象：学生为student数组；教师为teacherLevel布尔。 |
| publishedAt／data | string或null | 必填 | 未公布为null；公布后为固定时间。 |

### 请求示例

```json
{
  "method": "GET",
  "path": "/api/essay-reports/report-example"
}
```

### 教师未公布报告成功响应示例

```json
{
  "code": "OK",
  "message": "",
  "requestId": "req-example-001",
  "data": {
    "reportId": "report-example",
    "reportVersion": "report-7",
    "status": "graded",
    "scoreStandardVersion": "score-rule-example",
    "assessment": {
      "dimensions": [
        {
          "key": "content",
          "rawScore": 8
        },
        {
          "key": "expression",
          "rawScore": 8
        },
        {
          "key": "structure",
          "rawScore": 8
        },
        {
          "key": "mechanics",
          "rawScore": 10
        }
      ],
      "totalRaw": 82,
      "gradeName": "上下",
      "summary": "内容完整，表达流畅。"
    },
    "presentation": {
      "source": "current_config",
      "configVersion": "cfg-14",
      "levelName": "5",
      "display": {
        "teacherLevel": true
      }
    },
    "publishedAt": null
  }
}
```

学生成功响应的presentation.display替换为公布快照中的student数组，source为published_snapshot；其他报告数据按既有学生接口权限裁剪。展示样式见PRD，接口不返回HTML。REPORT_NOT_PUBLISHED时学生不展示成绩；对象不存在或越权按错误表处理。

## G02 保存评分与评语

建议PATCH /api/essay-reports/{reportId}/assessment；教师点击确认修改且存在实际变更时调用。仅教师评分权限可写，学生禁止调用。仅切换模式、输入相同呈分整数不写回原始分。

| 字段／位置 | 类型 | 必填／空值 | 含义、默认及校验 |
|---|---|---|---|
| expectedVersion／body | string | 必填 | 报告当前reportVersion，不使用学校configVersion。 |
| changes／body | object | 必填、不可空 | 只传实际变更项。 |
| changes.dimensions／body | array<object> | 可省略，不可空数组 | 每项key唯一且为四项枚举之一，rawScore为0–10有效数字，不接受null、NaN。 |
| changes.summary／body | string | 可省略 | 存在表示更新总评；是否允许清空及长度上限待产品/研发确认，未确认前沿用现有评语规则。 |

前端将当前模式实际修改值转换为原始十分制再提交；例如内容百分制28/40提交rawScore=7。总分、综合品第、等级由服务端计算，客户端不得上传并覆盖派生结果。建议保留至4位小数的原分精度，实际数据库精度待研发确认。成功data与G01同构，含新reportVersion；列表和统计随后重取。

### 请求体示例

```json
{
  "expectedVersion": "report-7",
  "changes": {
    "dimensions": [
      {
        "key": "content",
        "rawScore": 7
      }
    ]
  }
}
```

### 成功响应关键字段示例

```json
{
  "code": "OK",
  "message": "",
  "requestId": "req-example-001",
  "data": {
    "reportId": "report-example",
    "reportVersion": "report-8",
    "assessment": {
      "dimensions": [
        {
          "key": "content",
          "rawScore": 7
        },
        {
          "key": "expression",
          "rawScore": 8
        },
        {
          "key": "structure",
          "rawScore": 8
        },
        {
          "key": "mechanics",
          "rawScore": 10
        }
      ],
      "totalRaw": 78,
      "gradeName": "上下",
      "summary": "内容完整，表达流畅。"
    },
    "presentation": {
      "source": "current_config",
      "configVersion": "cfg-14",
      "levelName": "4",
      "display": {
        "teacherLevel": true
      }
    }
  }
}
```

实际响应包含G01全部字段，以上省略未变化元信息。未公布报告保存后按当前配置更新参考等级；已公布报告修改是否允许及是否重新公布尚待产品与研发确认。建议确认前返回REPORT_PUBLISHED拒绝覆盖快照。版本冲突保留编辑内容，提示重新读取后处理。

## G03 班级成绩与品第分布

建议GET /api/tasks/{taskId}/essay-results；教师打开成绩概览、保存评分后刷新或翻页时调用。校验任务、班级及教师访问权限。

| 字段／位置 | 类型 | 必填／空值 | 含义、默认及校验 |
|---|---|---|---|
| classId／query | string | 必填 | 所属任务下可访问班级。 |
| cursor／query | string | 可选 | 缺省首批，服务端生成的不透明游标。 |
| pageSize／query | integer | 可选 | 建议默认30，1–100；正式分页限制待研发确认。 |
| items／data | array<object> | 必填 | 无记录返回[]；元素字段见下行。 |
| items[]／data | object | 每条必填 | studentId/name:string；reportId:string或null；totalRaw:number或null；gradeName:string或null；rank:integer或null；durationSeconds:integer或null；status:string。 |
| nextCursor／data | string或null | 必填 | 最后一页为null。 |
| resultsVersion／data | string | 必填 | 本次班级结果集合版本，用于公布一致性检查。 |
| statistics／data | object | 必填 | scoredCount、excludedCount为非负integer；gradeDistribution为各gradeScore/count的数组，统计整个所选班级任务，不只是本页。 |

品第得分0–10；缺项不计入有效评分分母、不以0分参与分布。排名按既有原始分规则，不能按显示取整值重排；同分排序规则需核对现行服务。列表字段保留「用时」，不新增提交时间列。

### 请求示例

```json
{
  "method": "GET",
  "path": "/api/tasks/task-example/essay-results",
  "query": {
    "classId": "class-example",
    "pageSize": 30
  }
}
```

### 成功响应示例

```json
{
  "code": "OK",
  "message": "",
  "requestId": "req-example-001",
  "data": {
    "items": [
      {
        "studentId": "student-example",
        "name": "学生甲",
        "reportId": "report-example",
        "totalRaw": 82,
        "gradeName": "上下",
        "rank": 1,
        "durationSeconds": 740,
        "status": "graded"
      }
    ],
    "nextCursor": null,
    "resultsVersion": "results-5",
    "statistics": {
      "scoredCount": 1,
      "excludedCount": 0,
      "gradeDistribution": [
        {
          "gradeScore": 0,
          "count": 0
        },
        {
          "gradeScore": 1,
          "count": 0
        },
        {
          "gradeScore": 2,
          "count": 0
        },
        {
          "gradeScore": 3,
          "count": 0
        },
        {
          "gradeScore": 4,
          "count": 0
        },
        {
          "gradeScore": 5,
          "count": 0
        },
        {
          "gradeScore": 6,
          "count": 0
        },
        {
          "gradeScore": 7,
          "count": 0
        },
        {
          "gradeScore": 8,
          "count": 1
        },
        {
          "gradeScore": 9,
          "count": 0
        },
        {
          "gradeScore": 10,
          "count": 0
        }
      ]
    }
  }
}
```

错误时不把上一次统计标作当前结果；保留筛选条件并提示重试。导出G04-B使用同一范围和评分口径。

## G04-A 公布报告与固定版本

建议POST /api/tasks/{taskId}/essay-results/publish；教师确认公布时调用，需公布权限。建议按单班级原子提交；已有服务若支持批量，须另行明确部分失败协议。

| 字段／位置 | 类型 | 必填／空值 | 含义、默认及校验 |
|---|---|---|---|
| classId／body | string | 必填 | 当前任务所属班级。 |
| expectedVersion／body | string | 必填 | G03的resultsVersion，防止预览后成绩改变。 |
| expectedConfigVersion／body | string | 必填 | 教师预览时configVersion，防止公布期间学校配置改变。 |
| publishedReportIds／data | array<string> | 必填 | 成功固定快照的已评分报告。 |
| skippedReportIds／data | array<string> | 必填 | 未评分报告，无成绩不作为0分公布；空集合返回[]。 |
| resultsVersion、configVersion、publishedAt／data | string | 必填 | 公布后的结果版本、此次配置版本及时间。 |

服务端同一次提交固定报告状态、原始分、品第、参考等级、配置版本及师生展示项。配置或评分版本不匹配则整体拒绝并重新预览；不得部分标记已公布却缺快照。无已评分报告返回NO_GRADED_REPORTS。已公布报告不能被普通再次公布静默覆盖；重新公布策略待确认。

### 请求体示例

```json
{
  "classId": "class-example",
  "expectedVersion": "results-5",
  "expectedConfigVersion": "cfg-14"
}
```

### 成功响应示例

```json
{
  "code": "OK",
  "message": "",
  "requestId": "req-example-001",
  "data": {
    "publishedReportIds": [
      "report-example"
    ],
    "skippedReportIds": [],
    "resultsVersion": "results-6",
    "configVersion": "cfg-14",
    "publishedAt": "2026-11-04T10:05:00Z"
  }
}
```

## G04-B 导出班级成绩

建议GET /api/tasks/{taskId}/essay-results/export；教师点击全班导出时调用，需导出权限。按完整班级范围导出而不是当前分页；具体异步容量方案待研发评估。

| 字段／位置 | 类型 | 必填／空值 | 含义、默认及校验 |
|---|---|---|---|
| classId／query | string | 必填 | 与G03范围相同。 |
| expectedVersion／query | string | 必填 | G03的resultsVersion；结果变更时拒绝并提示刷新。 |
| format／query | string | 可选 | 默认csv，本期仅csv。 |
| 成功响应／body | binary UTF-8 CSV | 必填 | Content-Type:text/csv;charset=utf-8；Content-Disposition:attachment，文件名由服务端安全编码。 |

CSV字段建议为studentId、name、totalRaw、gradeScore、gradeName、durationSeconds、status；品第分按原始总分计算，缺失字段为空，0保留。字段最终与现有导出核对；姓名、评语等文本按CSV转义并防止电子表格公式执行。权限失败不返回文件；版本变化或生成失败保留页面。

### 请求示例

```json
{
  "method": "GET",
  "path": "/api/tasks/task-example/essay-results/export",
  "query": {
    "classId": "class-example",
    "expectedVersion": "results-6",
    "format": "csv"
  }
}
```

### 成功文件示例

```csv
studentId,name,totalRaw,gradeScore,gradeName,durationSeconds,status
student-example,学生甲,82,8,上下,740,published
```

## 异常协议与调用方处理

| 建议HTTP／业务码 | 触发条件 | 提示／调用方处理 |
|---|---|---|
| 401／UNAUTHENTICATED | 登录失效 | 重新登录；保留允许保留的页面草稿，不跨账号恢复敏感内容。 |
| 403／FORBIDDEN | 学校或对象越权 | 显示无权限，不返回配置或报告正文。 |
| 404／NOT_FOUND | 对象不存在 | 提示记录不存在，提供返回入口。 |
| 404／CONFIG_NOT_FOUND | 学校配置尚未初始化 | 提示尚未配置；不伪造已保存版本，初始化方式待确认。 |
| 422／DISPLAY_REQUIRED | 学生展示数组为空或不含percent | 百分制分數為固定展示項，請重新載入設定；恢复已保存配置。 |
| 422／RULES_INCOMPLETE | 等级展示依赖规则不完整 | 请先完成等级设置；恢复勾选并提供前往配置。 |
| 422／VALIDATION_FAILED | 空名称、重名、缺引用、最低分越界、顺序错误等 | 定位errors[].field；保留草稿，不部分写入。 |
| 409／VERSION_CONFLICT | 期望版本与服务器不一致 | 配置已更新，请重新读取后重试；不自动覆盖他人数据。 |
| 409／IDEMPOTENCY_CONFLICT | 同幂等键但正文不同 | 拒绝本次提交；修正请求后使用新的逻辑提交键。 |
| 409／REPORT_PUBLISHED | 试图改写已公布评分或快照 | 已公布报告需按既定更正流程处理；流程待确认。 |
| 403／REPORT_NOT_PUBLISHED | 学生读取未公布成绩 | 成绩尚未公布；不返回成绩内容。 |
| 422／NO_GRADED_REPORTS | 没有可公布评分 | 暂无可公布成绩。 |
| 500／INTERNAL_ERROR | 服务端写入或生成失败 | 展示保存恢复原选择，规则/评分保存保留草稿；可重试。 |
| 无HTTP响应／NETWORK_ERROR | 超时或连接中断，结果未知 | 不宣告保存成功；用同一幂等键重试或重新读取核对。 |

### 校验失败响应示例

```json
{
  "code": "VALIDATION_FAILED",
  "message": "请修正等级规则后保存。",
  "requestId": "req-example-002",
  "data": null,
  "errors": [
    {
      "field": "rules.ranges[2].levelId",
      "reason": "UNKNOWN_LEVEL",
      "message": "原等级已移除，请重新选择等级。"
    }
  ]
}
```

建议成功读写使用HTTP 200；业务码与HTTP组合需研发确认。数组错误路径仅针对提交版本，服务端可附稳定ID辅助定位。读取重试不产生写入；写入超时不能通过更换幂等键无限重提。

## 保存顺序、版本与历史兼容

G06与G07分别只更新display和rules，服务端按预期版本原子检查、更新对应字段并生成新configVersion。两个客户端并发写入时，一个成功、另一个返回冲突；失败者重新读取后保留本地草稿，再由用户处理。不能用整份旧配置覆盖另一路刚保存的内容。

未公布预览使用最新已保存配置；已公布报告使用公布时快照。学校新增、改名、删除等级或修改分数线，不改写原始评分，也不更新旧公布快照。无版本的历史已公布报告返回source=legacy，configVersion和未记录的levelName为null，沿用原有展示，不自动补算等级。

当前学校配置的旧版单选display按已知枚举迁移为student数组，并补齐固定项percent；旧数组缺少percent时同样补齐，保留原grade和level选择。此迁移不修改已公布报告快照；教师旧字段base/withLevel可映射为teacherLevel=false/true；未知值不得默认为合法数据。当前原型的labels/minimums并行数组迁移为稳定ID关联时，需要一次性校验数量与对应关系；不得仅按名称匹配已重名或失效资料。实际旧字段取值与迁移脚本必须以生产样本确认。

旧客户端原字段语义保留；新增能力优先由服务端支持，再接后台、教师报告与学生端，最后验证公布及导出。具体发布批次、最低客户端版本与回退方案待研发提供。六分制、新增业务Tab及自动按排名划分5*/5**不属于本期接口能力。

## 联调验收清单

| 用例／接口 | 操作与输入 | 预期结果 | 状态 |
|---|---|---|---|
| A01／G05 | 读取有权限学校、跨校请求、未初始化学校 | 返回本校Config；越权无数据；未初始化不伪造版本。 | 待验收 |
| A02／G06 | 学生固定percent，另选grade和level的四种组合；提交空数组或仅grade | 四种合法组合保存成功；界面percent置灰不可取消，缺少percent的请求拒绝。 | 待验收 |
| A03／G06 | 规则无效时启用学生或教师等级 | 服务端拒绝，提示前往配置，草稿不作为已保存规则。 | 待验收 |
| A04／G07 | 选项和区间分别1、8、10、11项；名称空白/重复 | 1至10项按约束保存，超限和非法名称定位错误；数量独立。 | 待验收 |
| A05／G07 | 相邻同级、等级倒置、删除后悬空levelId | 同级成功；倒置和失效引用拒绝，保留分数草稿。 | 待验收 |
| A06／G07 | 最低分空、小数、重复、末项非0及95/90/80等合法边界 | 非法值拒绝，合法区间下限含上限不含、最高含100。 | 待验收 |
| A07／G06/G07 | 展示保存与规则保存并发，或旧请求晚到 | 版本冲突可见，不覆盖其他已保存字段。 | 待验收 |
| A08／全部写接口 | 同键重试、同键不同正文、超时后重试 | 同请求不重复写入；不同正文拒绝；结果可核对。 | 待验收 |
| A09／G01/G02 | 0、缺项、54.9999、55、79、80、89、90、94.9、95、100 | 0保留，缺项null；分数显示取整不改变品第或等级原分换算。 | 待验收 |
| A10／G02 | 切换模式、输入相同显示整数、实际修改内容为7/10 | 前两者不回写源分；实际修改为28/40并同步报告及统计。 | 待验收 |
| A11／G04-A/G01 | 公布后修改学校规则；读取无版本历史报告 | 公布快照不变；历史不补算等级；学生只能看本人已公布报告。 | 待验收 |
| A12／G03/G04-B | 空班级、缺项、本页少于全班、导出前结果变化 | 分布分母正确；导出全班同版本；过期版本拒绝并提示刷新。 | 待验收 |
| A13／报告展示 | 教师两模式与学生四种展示组合 | 教师整体模式按开关在分数下显示「等級：5*」等对应等级，品第模式只显示分数与品第；学生按自身配置呈现。 | 待验收 |

## 待研发确认与联调前置

| 事项 | 所需资料或决定 | 负责角色 | 状态 |
|---|---|---|---|
| 真实接口定义 | 现有服务清单、鉴权协议、HTTP方法路径与错误码；确认上述能力拆分。 | 后端／前端 | 待确认 |
| 权限 | 学校配置读取/写入、报告评分/公布/导出、学生本人读取的权限点。 | 产品／后端 | 待确认 |
| 历史及公布后更正 | 历史字段样本、版本迁移、更正及重新公布政策；不自动覆盖既有快照。 | 产品／后端／测试 | 待确认 |
| 技术限额 | 名称长度、评语清空规则与长度、原分精度、分页上限、导出容量、幂等保留期限。 | 产品／研发 | 待确认 |
| 正式等级门槛 | 学校适用的分数线，不能把预填值当DSE官方标准。 | 学校／教研 | 待确认 |
| 联调证据 | 执行A01–A13，记录环境、请求响应、失败恢复和历史数据结果。 | 研发／测试 | 待验证 |

规则依据：当前PRD「报告展示规则」「换算规则与示例」「资料生效与历史报告」；实现参照src/schoolRules.js、src/grading.js、src/App.vue。业务验收保持待验收；文档完善、原型构建或页面检查不代表真实接口已接通。
