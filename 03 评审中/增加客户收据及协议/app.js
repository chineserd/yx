const originalRecords = [
  {
    id: 1,
    studentId: "HKC105873",
    orderId: "ORD20260729001",
    studentName: "方璟明",
    campus: "中国香港",
    campusCode: "CN HK01",
    status: "已通过",
    isResubmitted: true,
    resubmitProofImage: "./中文路Logo.png",
    resubmitNote: "客户提交后系统已自动通过，付款账户与订单付款渠道一致。",
    receiptNo: "REC-CN HK01-20260729-0008",
    applyTime: "2026-07-29 10:12:36",
    payType: "全款",
    paymentAmount: "HK$7650",
    paymentDate: "2026年07月28日",
    paymentChannel: "大新转数快：103672903",
    orderType: "购买产品订单",
    paymentStatus: "已支付",
    refundStatus: "未退款",
    products: [
      { name: "小学中文阅读理解强化班", lessons: 48, giftLessons: 4, vouchers: 6, validity: "12个月" },
      { name: "港澳校本写作提升课", lessons: 24, giftLessons: 2, vouchers: 2, validity: "8个月" }
    ],
    reviewer: "中文路后台",
    reviewTime: "2026-07-29 10:12:36",
    reviewComment: "订单财务审核通过、且客户订单已确认后，客户申请收据自动通过。",
    voidReason: ""
  },
  {
    id: 2,
    studentId: "HKC104219",
    orderId: "ORD20260728012",
    studentName: "林子朗",
    campus: "中国香港",
    campusCode: "CN HK01",
    status: "已通过",
    receiptNo: "REC-CN HK01-20260728-0007",
    applyTime: "2026-07-28 15:40:18",
    payType: "分期",
    installmentCurrent: 3,
    installmentTotal: 3,
    orderTotalAmount: "HK$15300",
    paymentAmount: "HK$5280",
    paymentDate: "2026年07月27日",
    paymentChannel: "汇丰银行：808-123456-838",
    orderType: "购买产品订单",
    paymentStatus: "已支付",
    refundStatus: "全额退款",
    products: [
      { name: "S1 普通话表达专项课", lessons: 36, giftLessons: 3, vouchers: 4, validity: "10个月" }
    ],
    reviewer: "中文路后台",
    reviewTime: "2026-07-28 16:02:31",
    reviewComment: "订单财务审核通过、且客户订单已确认后，客户申请收据自动通过。",
    voidReason: ""
  },
  {
    id: 3,
    studentId: "HKC108772",
    orderId: "ORD20260727008",
    studentName: "周晴",
    campus: "中国澳门",
    campusCode: "CN Macau01",
    status: "已通过",
    receiptNo: "REC-CN Macau01-20260727-0003",
    applyTime: "2026-07-27 09:08:51",
    payType: "分期",
    installmentCurrent: 2,
    installmentTotal: 3,
    orderTotalAmount: "MOP$13140",
    paymentAmount: "MOP$4380",
    paymentDate: "2026年07月26日",
    paymentChannel: "澳门中银：12345678901",
    orderType: "购买产品订单",
    paymentStatus: "已支付",
    refundStatus: "未退款",
    products: [
      { name: "澳门小学中文综合能力课", lessons: 30, giftLessons: 0, vouchers: 3, validity: "9个月" }
    ],
    reviewer: "中文路后台",
    reviewTime: "2026-07-27 09:08:51",
    reviewComment: "订单财务审核通过、且客户订单已确认后，客户申请收据自动通过。"
  },
  {
    id: 5,
    studentId: "HKC106642",
    orderId: "ORD20260725005",
    studentName: "张嘉言",
    campus: "深圳",
    campusCode: "CN SZ01",
    status: "已通过",
    receiptNo: "REC-CN SZ01-20260725-0002",
    applyTime: "2026-07-25 12:03:09",
    payType: "全款",
    paymentAmount: "¥4200",
    paymentDate: "2026年07月24日",
    paymentChannel: "招商银行：755-88228822",
    orderType: "购买产品订单",
    paymentStatus: "已支付",
    refundStatus: "未退款",
    products: [
      { name: "个人短讲表达课", lessons: 28, giftLessons: 2, vouchers: 3, validity: "8个月" }
    ],
    reviewer: "中文路后台",
    reviewTime: "2026-07-25 14:46:18",
    reviewComment: "订单财务审核通过、且客户订单已确认后，客户申请收据自动通过。"
  }
];

const originalAgreements = [
  {
    id: 1,
    name: "中文路报名协议",
    code: "AGR-ENROLL-2026",
    currentVersion: "V2.3",
    status: "已发布",
    terminals: ["学生App端", "校园Web端", "学生启答iPad端"],
    campuses: ["中国香港/CNHK", "中国澳门/CN Macau", "深圳总部/CN SZ"],
    createdAt: "2026-07-18 10:12:08",
    updatedAt: "2026-07-30 13:21:04",
    operator: "陈晓晴",
    content: "本协议适用于课程报名、订单确认、课程服务、付款安排、退费规则、学习资料使用与个人资料保护。学生或家长确认订单前，需阅读并同意当前已发布版本。",
    history: [
      { version: "V2.3", status: "已发布", operator: "陈晓晴", updatedAt: "2026-07-30 13:21:04", content: "本协议适用于课程报名、订单确认、课程服务、付款安排、退费规则、学习资料使用与个人资料保护。学生或家长确认订单前，需阅读并同意当前已发布版本。" },
      { version: "V2.2", status: "已归档", operator: "陈晓晴", updatedAt: "2026-07-25 18:03:12", content: "本协议适用于课程报名、付款安排、退费规则与学习资料使用。学生或家长确认订单前，需阅读并同意已发布版本。" },
      { version: "V2.1", status: "已归档", operator: "卢衍飞", updatedAt: "2026-07-22 11:40:55", content: "本协议适用于课程报名、订单付款及学习服务，用户确认订单前需阅读并同意报名协议。" }
    ]
  },
  {
    id: 2,
    name: "校园Web端报名协议",
    code: "AGR-SCHOOL-2026",
    currentVersion: "V1.8",
    status: "草稿中",
    terminals: ["校园Web端"],
    campuses: ["中国香港/CNHK"],
    createdAt: "2026-07-26 09:20:31",
    updatedAt: "2026-07-29 16:45:20",
    operator: "牛圆圆",
    content: "校园 Web 端报名协议草稿，覆盖学校端老师代确认订单时的协议展示与同意授权。",
    history: [
      { version: "V1.8", status: "草稿中", operator: "牛圆圆", updatedAt: "2026-07-29 16:45:20", content: "校园 Web 端报名协议草稿，覆盖学校端老师代确认订单时的协议展示与同意授权。" },
      { version: "V1.7", status: "已归档", operator: "牛圆圆", updatedAt: "2026-07-26 09:20:31", content: "校园 Web 端报名协议历史版本，用于老师代确认订单时的协议阅读与授权记录。" }
    ]
  },
  {
    id: 3,
    name: "学生启答 iPad 使用协议",
    code: "AGR-IPAD-2026",
    currentVersion: "V1.5",
    status: "已归档",
    terminals: ["学生启答iPad端"],
    campuses: ["中国香港/CNHK", "中国澳门/CN Macau"],
    createdAt: "2026-07-10 14:18:06",
    updatedAt: "2026-07-21 10:10:45",
    operator: "彭芬兰",
    content: "启答 iPad 使用协议历史版本，已由中文路报名协议统一覆盖。",
    history: [
      { version: "V1.5", status: "已归档", operator: "彭芬兰", updatedAt: "2026-07-21 10:10:45", content: "启答 iPad 使用协议历史版本，已由中文路报名协议统一覆盖。" },
      { version: "V1.4", status: "已归档", operator: "彭芬兰", updatedAt: "2026-07-12 15:33:09", content: "启答 iPad 使用协议归档版本，用于说明学生启答 iPad 端学习资料和账号使用规则。" }
    ]
  }
];

const agreementCampusOptions = [
  "中国香港/CNHK",
  "中国澳门/CN Macau",
  "越南/Việt Nam",
  "印度尼西亚/Indonesia",
  "泰国/Thailand",
  "深圳总部/CN SZ",
  "马来西亚/Malaysia",
  "俄罗斯/Poccuя",
  "阿联酋/UAE",
  "沙特阿拉伯/Saudi Arabia"
];

const appPolicyDocs = {
  service: {
    title: "中文路香港澳門區域服務協議",
    version: "V9.0",
    revisedAt: "2024年9月1日",
    effectiveAt: "2024年9月1日",
    body: `
      <p class="app-policy-note">注：在使用ChineseRd網站及App課程服務之前，請您先認真閱讀本服務協議，在充分理解並同意遵守本協議各條款內容，特別是免除或者限制責任的條款、爭議解決和法律適用條款後再進行本站課程服務的購買和使用。免除或者限制責任的條款可能將以加粗字體顯示，您應重點閱讀。如您對本協議有任何疑問的，應向本公司客服諮詢。本協議只適用於香港、澳門個人用戶，不適用於其他市場用戶。</p>
      <p class="app-policy-sign">中文路（香港）有限公司</p>
      <h3>1.協議條款的確認與接納</h3>
      <p><strong>1.1.</strong> 在使用中文路（香港）有限公司（以下簡稱「中文路」或「ChineseRd」）服務之前，請您認真閱讀本課程服務協議，當您按照提示勾選並確認同意本協議且完成全部訂立程式後，即表示您已充分閱讀、理解並接受本協議的全部內容。本協議即構成對雙方有約束力的法律檔案。您承諾接受並遵守本協議的約定，屆時您不應以未閱讀本協議的內容或者未獲得本站對您問詢的解答等理由，主張本協議無效，或要求撤銷本協議。</p>
      <p><strong>1.2.</strong> 中文路平台上的各項服務的所有權和運作權歸中文路（香港）有限公司所有。中文路提供的服務將完全按照其發布的服務條款和操作規則嚴格執行。</p>
      <p><strong>1.3.</strong> 如果您在18周歲以下，則只能在父母或監護人的監護參與下才能使用本平台。若您不具備該主體資格，則您的監護人應承擔因此而導致的一切後果，且中文路有權註銷或永久凍結您的賬戶，並向您及其監護人索償相應損失。</p>
      <p><strong>1.4.</strong> 中文路有權根據法律規範及運營的合理需要，不斷修改和完善本協議，並在本平台https://chineserd.com公告。如您繼續使用服務，即意味着同意並自願遵守修改後的協議條款，抑或您有權終止使用。</p>
      <h3>2.定義</h3>
      <p><strong>2.1.</strong> 您：指註冊帳號並經審覈同意後，在ChineseRd網站或APP上學習、觀看課程的用戶。</p>
      <p><strong>2.2.</strong> 課程：指由中文路提供的，在ChineseRd網站或APP上陳列、展示、供用戶學習、觀看的視頻、語音、文字、圖片、鏈接等課程作品/製品。本定義下的課程包括免費課程和收費課程。</p>
      <p><strong>2.3.</strong> 免費課程：指無償提供的，供用戶免費使用、觀看的課程。</p>
      <p><strong>2.4.</strong> 收費課程：指有償提供的，供用戶付費使用、觀看的課程。</p>
      <h3>3.帳號註冊及使用</h3>
      <p><strong>3.1.</strong> 您可瀏覽中文路上的課程資訊，如您希望學習、觀看該課程，您需先登錄您的帳號，或註冊中文路認可的帳號並登錄。您註冊登錄的帳號是確認您身份的唯一依據。</p>
      <p><strong>3.2.</strong> 您充分瞭解並同意，您必須為自己註冊帳號下的一切行為負責，包括但不限於使用者所發表的任何內容以及由此產生的任何後果。使用者應對本服務中的內容自行加以判斷，並承擔因使用內容而引起的所有風險，包括因對內容的正確性、完整性或實用性的依賴而產生的風險。</p>
      <p><strong>3.3.</strong> 註冊完成後，請您妥善保存有關帳號和密碼，並對該帳號進行的所有活動和行為負責。如因您自身原因（包括但不限於轉讓帳號、與他人共用、自己洩露等）或您所用電腦或其他終端產品感染病毒或木馬，而導致帳號密碼洩漏、遺失或其他損失後果將由您獨自承擔。</p>
      <p><strong>3.4.</strong> 您在註冊帳號時承諾遵守法律法規、國家利益、公民合法權益、公共秩序、社會道德風尚和資訊真實性六條底線，不得在帳號註冊資料中出現違法和不良資訊。</p>
      <p><strong>3.5.</strong> 中文路有權對您提供的帳號註冊資料進行審查，若發現或者收到舉報確認註冊資料存在不準確、不真實，或含有違法、不良資訊，有權不予註冊，並保留終止您使用本平台的權利。若您以虛假資訊騙取帳號註冊或帳號註冊資料存在侵權、違法和不良資訊的，中文路有權採取通知限期改正、暫停使用、註銷登記等措施。對於冒用其他機構或他人名義註冊帳號名稱的，中文路有權註銷該帳號，並向政府主管部門進行報告。</p>
      <p><strong>3.6.</strong> 根據相關法律、法規規定以及考慮到中文路產品服務的重要性，您同意：</p>
      <p><strong>3.6.1.</strong> 在註冊帳號時提交有效準確的個人資訊進行實名認證；</p>
      <p><strong>3.6.2.</strong> 提供及時、詳盡及準確的帳戶註冊資料；</p>
      <p><strong>3.6.3.</strong> 不得以營利、任何不正當手段或以違反誠實信用原則等為自己或他人開通、使用本服務；</p>
      <p><strong>3.6.4.</strong> 用戶對其自身帳號中的所有行為和事件負全責，不得售賣、轉借帳號，不得私自進行帳號的交易或其他積分等交易活動。如出現以上任何行為之一的，中文路將按照本服務條款要求使用者承擔相應的違約責任，如因此導致使用者無法繼續使用相關服務的，使用者應當自行承擔後果。</p>
      <p><strong>3.7.</strong> 您若發現自身帳號或密碼被他人非法使用或有登錄、使用異常情況的，應及時通知中文路，中文路將按照本協議或法律規定進行處理。</p>
      <p><strong>3.8.</strong> 您應當通過中文路提供的正當合法途徑付費以獲得全部服務，其他非官方途徑付費增值的，均不享受保護，如中文路發現用戶未支付官方對價或未通過官方途徑獲取服務的，中文路有權限制、中止或終止用戶帳號的登錄和使用，停止向使用者提供服務，中文路無需向用戶退還已支付的任何費用。</p>
      <p><strong>3.9.</strong> 您在購買課程後，應當在課程有效期限內完成學習。如課程已到期，用戶要求繼續學習的或要求退款的，中文路不予支持。</p>
      <p><strong>3.10.</strong> 您瞭解並同意，中文路可能會基於自身原因（包括但不限於：更新課程內容、改進課程安排）不定期的對付費服務內容或功能進行更新而無需經過您的事先同意。</p>
      <p><strong>3.11.</strong> 您應使用正版課程資料，若使用者出現包括但不限於違規倒賣課程、違規使用聽課帳號、在課程服務使用中反復使用侮辱語言、嚴重擾亂課堂秩序、威脅辱駡老師、惡意批量差評、惡意騷擾客服、煽動用戶退款、冒充工作人員等行為，一經證實，中文路有權將此帳號做封號處理並保留追究法律責任的權利。</p>
      <h3>4.使用規則</h3>
      <p><strong>4.1</strong> 自行配備上網的所需設備，包括個人電腦、平板電腦、網絡、麥克風、攝像頭及其他必備上網裝置。</p>
      <p><strong>4.2</strong> 自行負擔個人上網所支付的與此服務有關的電話費用、網絡費用。一旦註冊成功，即成為本平台的合法用戶。您可隨時根據指示更改您的密碼。用戶對用戶名和密碼安全負全部責任。每個用戶須對其用戶名進行的所有活動和事件負全責。用戶若發現任何非法使用用戶賬戶或存在安全性漏洞的情況，應立即通告本站並協助本站處理相關事宜。</p>
      <p><strong>4.3</strong> 您不得利用本平台製作、複製、發佈、傳播如下法律、法規和政策禁止的內容：</p>
      <p><strong>4.3.1.</strong> 反對憲法所確定的基本原則的；</p>
      <p><strong>4.3.2.</strong> 危害國家安全，洩露國家秘密，顛覆國家政權，破壞國家統一的；</p>
      <p><strong>4.3.3.</strong> 損害國家榮譽和利益的；</p>
      <p><strong>4.3.4.</strong> 煽動民族仇恨、民族歧視，破壞民族團結的；</p>
      <p><strong>4.3.5.</strong> 破壞國家宗教政策，宣揚邪教和封建迷信的；</p>
      <p><strong>4.3.6.</strong> 散佈謠言，擾亂社會秩序，破壞社會穩定的；</p>
      <p><strong>4.3.7.</strong> 散佈淫穢、色情、賭博、暴力、兇殺、恐怖或者教唆犯罪的；</p>
      <p><strong>4.3.8.</strong> 侮辱或者誹謗他人，侵害他人合法權益的；</p>
      <p><strong>4.3.9.</strong> 煽動非法集會、結社、遊行、示威、聚眾擾亂社會秩序；</p>
      <p><strong>4.3.10.</strong> 以非法民間組織名義活動的；</p>
      <p><strong>4.3.11.</strong> 含有法律、法規和政策禁止的其他內容的資訊。</p>
      <p><strong>4.4</strong> 您不得利用本平台製作、複製、發佈、傳播包括但不限於如下干擾平台的正常運營，以及侵犯其他主體或協力廠商合法權益的內容：</p>
      <p><strong>4.4.1.</strong> 廣告、騷擾、垃圾資訊的；</p>
      <p><strong>4.4.2.</strong> 涉及他人隱私、個人資訊或資料的；</p>
      <p><strong>4.4.3.</strong> 侵害他人名譽權、肖像權、智慧財產權、商業秘密等合法權利的；</p>
      <p><strong>4.4.4.</strong> 強制、誘導其他使用者關注、點選連結頁面或分享資訊的；</p>
      <p><strong>4.4.5.</strong> 虛構事實、隱瞞真相以誤導、欺騙他人的；</p>
      <p><strong>4.4.6.</strong> 未經書面許可利用本平台為協力廠商進行推廣的（包括但不限於加入協力廠商連結、廣告等行為）；</p>
      <p><strong>4.4.7.</strong> 未經書面許可使用外掛程式、外掛或其他協力廠商工具、服務接入平台和相關系統；</p>
      <p><strong>4.4.8.</strong> 利用本平台從事任何違法犯罪活動的；</p>
      <p><strong>4.4.9.</strong> 製作、發佈與以上行為相關的方法、工具，或對此類方法、工具進行運營或傳播，無論這些行為是否為商業目的；</p>
      <p><strong>4.4.10.</strong> 其他違反法律法規規定或干擾平台正常運營的行為。</p>
      <p><strong>4.5.</strong> 您知悉並同意，您購買的付費服務僅限於您自行使用，您無權對購買的收費課程及相關增值服務服務進行出售、轉讓、許可、傳播或以其他方式使除您自己以外的協力廠商（包括但不限於自然人、法人或其他組織）使用。若您存在上述違規行為，中文路有權視您違反本協議行為的嚴重程度，對您採取以下單項或多項措施：</p>
      <p><strong>4.5.1.</strong> 取消您繼續使用該付費服務的權利限制、暫停/終止提供全部或部分服務；</p>
      <p><strong>4.5.2.</strong> 刪除違規內容；</p>
      <p><strong>4.5.3.</strong> 要求您退還通過出售、轉讓、許可等其他方式取得的收益；</p>
      <p><strong>4.5.4.</strong> 暫時/永久封禁帳號；</p>
      <p><strong>4.5.5.</strong> 其他的合理措施。如您因違規被暫停部分或全部服務，終止部分服務、被限制/中止帳號的登錄和使用，對您已購買的課程費用，中文路將不予退回。如用戶因違反本協議，被終止全部服務或終止帳號登錄的，中文路無需向用戶退還已支付的任何課程費用。</p>
      <p><strong>4.6.</strong> 如果您違反本協議的行為給中文路或其他協力廠商造成損失的，您應當對此承擔法律責任。您承擔法律責任的形式包括但不限於：對受到侵害者進行賠償；以及在中文路首先承擔了因您的行為導致的行政處罰或侵權損害賠償責任後，您應給予中文路等額的賠償。若您帳戶內有剩餘款項的，中文路有權不予退回，若不足以賠償損失的，中文路仍有權要求您補足相應的損失。</p>
      <p><strong>4.7.</strong> 如果您行使本協議規定的權利而購買/接受中文路以外的協力廠商提供的內容或服務，如因此發生糾紛的，您應向銷售/提供該內容或服務的協力廠商主張權利，與中文路無關。</p>
      <p><strong>4.8.</strong> 除非中文路以書面形式明確約定，中文路對於使用者以任何方式（包括但不限於包含、經由、連接或下載）從中文路所獲得的任何內容資訊，包括但不限於音訊內容、廣告內容、其他使用者資訊、商戶資訊、使用者評價內容等，不保證其準確性、完整性、可靠性。</p>
      <h3>5.服務收費</h3>
      <p><strong>5.1</strong> 中文路涉及付費項目，包括但不限於購買提供的付費課程、證書服務以及其他增值服務。</p>
      <p><strong>5.2</strong> 您理解並同意：中文路提供付費服務實行先付款後使用的方式，您及時、足額、合法的支付所需的款項是您獲得該等服務的前提。您有權選擇使用中文路認可的支付方式，您理解並確認支付服務由中文路之外具備合法資質的協力廠商提供，該等支付服務的使用條件及規範由您與支付服務提供方確定，與中文路無關。</p>
      <p><strong>5.3</strong> 如您選擇購買付費服務，請您務必仔細瞭解本協定及確認相關具體資訊（包括但不限於課程的內容、開課的時間、開課的期限、課程價格等），並根據操作提示，確認自己的帳號並選擇相關操作選項。發佈的付費服務可能對使用的時間、次數等做出一定限制；如超出限制範圍，可能影響您繼續使用該等服務，您需要再次付費購買。一經購買，即視為您認可該項服務標明之價格；您購買成功後，該項服務即時生效。中文路可能會根據服務的整體規劃，對服務相關權益細則、收費標準、方式等進行修改和變更，前述修改、變更，中文路將在相應服務頁面進行展示。</p>
      <p><strong>5.4</strong> 使用者可以在不同設備（「設備」包括但不限於電腦及行動電話、平板電腦等移動終端設備，下同）上使用帳號，用戶知曉並同意中文路有權設置用戶的同一帳號在不同設備終端使用的終端總數，並有權限制同一帳戶同一時間只能在一個終端上登錄使用。超過上述範圍使用的，中文路有權部分或全部中止或終止對使用者的服務。您應自行承擔超範圍使用而導致的任何損失。</p>
      <p><strong>5.5</strong> 中文路不對所提供的付費項目的適用性或滿足使用者特定需求及目的進行任何明示或者默示的擔保。您在購買前應確認自身的需求，同時仔細查閱相關介紹、說明。</p>
      <p><strong>5.6</strong> 中文路老師授課時間可能會因教學安排、老師自身等原因進行調整，請以實際課程安排為准。如用戶對調整有異議，可按照平台公示的售後政策申請退款或更換課程。</p>
      <p><strong>5.7</strong> 關於售後政策為了更好的説明和提升使用者使用服務，中文路將依照公佈的《售後政策》等相關協定或規則為使用者完成課程購買後的售後服務。請用戶完整閱讀售後政策，以幫助用戶更好地體驗和學習。</p>
      <h3>6.法律管轄和適用</h3>
      <p><strong>6.1</strong> 本協議的訂立、執行和解釋及爭議的解決均應適用中國法律。</p>
      <p><strong>6.2</strong> 如發生本站服務條款與中國法律相抵觸時，則這些條款將完全按法律規定重新解釋，而其它合法條款則依舊保持對用戶產生法律效力和影響。</p>
      <p><strong>6.3</strong> 本協議的規定是可分割的，如本協議任何規定被裁定為無效或不可執行，該規定可被刪除而其餘條款應予以執行。</p>
      <p><strong>6.4</strong> 如雙方就本協議內容或其執行發生任何爭議，雙方應盡力友好協商解決；協商不成時，任何一方均可向中文路（香港）有限公司所在地的人民法院提起訴訟。</p>
      <h3>7.版權申明</h3>
      <p><strong>7.1.</strong> 本公司的直播及錄播課程視頻僅供註冊學生學習使用，未經許可拷貝、錄屏、反向工程、技術下載等手段獲取課程視頻的行為構成侵權，一經發現中文路將立即封號處理，並保留追究註冊學生法律責任的權利，包括但不限於刑事責任、民事責任以及行政責任。</p>
      <h3>8.保密義務</h3>
      <p><strong>8.1.</strong> 中文路對用戶提供的個人資料和資訊具有保密義務，除非法律規定或者有權政府機關的命令和要求或者學生同意，中文路不得將學生的個人資訊和資料洩露給任何協力廠商。</p>
      <p><strong>8.2.</strong> 用戶對本協議的內容、中文路提供的學習輔導課程的任何內容具有保密義務，未經中文路同意，用戶不得將該等內容洩露給任何第三方或者提供給第三方使用。用戶違反保密義務給中文路造成損失的，應當足額賠償中文路的損失。</p>
      <h3>9.不可抗力</h3>
      <p><strong>9.1.</strong> 「不可抗力」指超出本協議雙方控制範圍、無法預見、無法避免或無法克服、使得本協議一方部分或者全部不能履行本協議的事件。這類事件包括但不限於地震、颱風、洪水、火災、戰爭、罷工、暴動、政府行為、法律規定或其適用的變化，因網絡服務特性而特有的原因，例如境內外基礎電信運營商的故障、計算機或互聯網相關技術缺陷、互聯網覆蓋範圍、計算機病毒、黑客攻擊等因素或者其他任何無法預見、避免或者控制的事件。</p>
      <p><strong>9.2.</strong> 如任何一方不履行或遲延履行本協議規定的義務是由於不可抗力，則該方免除承擔違約責任；</p>
      <p><strong>9.3.</strong> 不可抗力事由發生後，若有可能，受不可抗力影響的一方應在10個工作日內將有關情況及時通知對方（中文路可以通過網站公告的方式通知學生），凡違反此通知義務而不履約給對方造成損失的，則必須賠償由此而給對方造成的損失；</p>
      <p><strong>9.4.</strong> 在不可抗拒因素消除後，曾受不可抗力影響而未能履約的一方應盡最大努力恢復履行其在本協議項下的義務。</p>
      <h3>10.其他事宜</h3>
      <p><strong>10.1.</strong> 為保證產品、服務的安全性及產品功能的一致性，中文路可能會對軟體進行更新。用戶應將軟體更新到最新版本，如用戶未及時更新到最新版本，中文路不保證用戶一定能正常使用服務。</p>
      <p><strong>10.2.</strong> 本協議自用戶完成本課程協議的註冊程式且將所選課程的款項支付至中文路賬戶後生效。</p>
      <p><strong>10.3.</strong> 如果您對本協定內容有任何疑問，可登錄中文路網站聯絡線上客服，或發送郵件至hkmstudents@chineserd.com獲取相關資訊。</p>
    `
  },
  afterSale: {
    title: "售後政策",
    version: "V9.0",
    revisedAt: "2024年9月1日",
    effectiveAt: "2024年9月1日",
    body: `
      <h3>1.退款規則</h3>
      <p><strong>1.1.</strong>  <strong>14日內申請退款：</strong></p><p>自課程開課之日（即課時可預約之日起）起14日之內，且未產生上課記錄的，申請退款需扣除課程金額的5%行政費，剩餘款項退還至用戶。</p><p>若在上述時間內，產生上課記錄的，已上課的部分課程按照課程價格折算扣款，並扣除10%行政費，剩餘款項退還至用戶。</p>
      <p><strong>1.2.</strong>  <strong>14日後申請退款：</strong></p><p>已上課的部分課程按照課程價格折算扣款，及10%行政費，同時扣除剩餘金額15%的退學違約金，剩餘款項退還用戶。</p>
      <p>注1：已上課的部分課程費用=已發生課時數*課程原價。</p>
      <p>注2：銀行手續費另行計算。退款申請具體方式請向客服諮詢獲取。</p>
      <p><strong>1.3.</strong> <span class="policy-danger">小班課或團體購課，自課程開始之日起超過14日不設退款</span>，協議另有特殊約定的按約定處理。</p>
      <p><strong>1.4.</strong> <strong>若按照上述規定，申請課程退款：</strong></p><p></p>
      <p><strong>1.4.1.</strong> 開課時使用消耗的優惠券/學習卡將作廢，不能提現且不能再次使用。</p>
      <p><strong>1.4.2.</strong> 若課程有贈書或禮品活動，快遞發出後，將按照贈書及禮品的價格扣除；若贈書或禮品未使用，且不影響二次銷售，用戶可將其寄回中文路指定地址，運費自行承擔，贈書及禮品費用可不予扣除。</p>
      <p><strong>1.4.3.</strong> 若課程有限時贈課或贈送的抵用優惠券，限時贈課或優惠券代碼在贈送後並未使用，在退款時限時贈課或抵用優惠券將被註銷，無法進行使用；若課程有限時贈課或抵用優惠券，一旦使用後，所贈送的課堂或抵用優惠券的相關費用在退款時也將一併扣除。</p>
      <p><strong>1.4.4.</strong> 申請退款時需將已開出的發票寄回，平台收到後處理退款申請。發票寄回費用由用戶自行承擔。</p>
      <p><strong>1.4.5.</strong> 無特殊情況，用戶發起退款申請的14個工作日内，中文路方進行核實處理，退款完成後，不再保留任何課程的聽課等使用權限。</p>
      <p><strong>1.4.6.</strong> 所退款項經銀行退回。</p>
      <p>注：退款周期可能會受銀行、支付機構等相關因素影響，具體退款時間請以實際到賬時間為準。</p>
      <p>注：2023年1月1日前購買課程的用戶，適用原有售後政策。</p>
      <h3>2.更換老師</h3>
      <p><strong>2.1.</strong> 當用戶購買課程後，如授課老師身體出現疾病、懷孕等特殊情況或因國家法律法規或相關政策之規定不再適合擔任授課老師時，中文路經核實後，可以調整授課時間或更換老師。</p>
      <p><strong>2.2.</strong> 當老師因教學安排或個人原因無法繼續授課時，中文路原則上要求老師依據工作要求完成未完成的課時，但如老師無法執行，中文路可以在課前或課中更換老師。發生本條所述情況，中文路均會提前通知用戶，為用戶替換合適的老師，做好原老師及接任老師的順利銜接。</p>
      <p><strong>2.3.</strong> 更換老師規則：</p>
      <p><strong>2.3.1.</strong> 自課程開始之日起（除短期班的課程外），享有1次自主申請更換老師的機會，並扣除相應課時，申請更換老師事宜請與學管聯繫。</p>
      <p><strong>2.3.2.</strong> 若因老師個人原因導致更換，每位學生與接任老師的首次上堂，將設為免費試堂，不會扣除課時。</p>
      <h3>3.凍結課程規則</h3>
      <p><strong>3.1</strong> 學生因特殊原因，需要暫停課程（即：凍結課程）。需至少提前1天進行申請，經由相關負責人審批通過后，學生所有剩余課程將會進行暫停（即：凍結）。</p>
      <p><strong>3.2</strong> 一個學生同一個課程，原則上只有1次凍結課程機會。</p>
      <p><strong>3.3</strong> 凍結課程時限，最長不超過3個月。3個月內若需提前恢復課程，需至少提前3天進行申請。經由相關負責人審批通過后，學生所有剩余課程將會重新恢復。恢復課程時，若原上課老師時間允許，原則上優先安排原上課老師繼續服務。若原上課老師時間不允許，會為學生安排新的接任老師，新的接任老師首次上堂，將設為免費試堂，不會扣除課時。</p>
      <p><strong>3.4</strong> 凍結課程時效到期時，課程將自動恢復。如不能上堂需至少提前2小時請假，否則課程正常課消。</p>
    `
  }
};

const originalShareGiftRecords = [
  {
    id: 1,
    studentName: "黄钰蓝",
    studentId: "HKC107276",
    manager: "牛圆圆",
    advisor: "黄俊",
    month: "2026-07",
    proofImage: "./中文路Logo.png",
    uploadTime: "2026-07-30 10:37:56",
    status: "待审核",
    giftLessons: "--",
    reviewer: "--",
    reviewTime: "--"
  },
  {
    id: 2,
    studentName: "张晞琳",
    studentId: "HKC15330",
    manager: "彭芬兰",
    advisor: "黄俊",
    month: "2026-07",
    proofImage: "./中文路Logo.png",
    uploadTime: "2026-07-30 07:51:57",
    status: "已赠课",
    giftLessons: "+1课",
    reviewer: "黄俊",
    reviewTime: "2026-07-30 09:28:13"
  },
  {
    id: 3,
    studentName: "林言律",
    studentId: "HKC107055",
    manager: "牛圆圆",
    advisor: "陈晓晴",
    month: "2026-07",
    proofImage: "./中文路Logo.png",
    uploadTime: "2026-07-29 12:06:07",
    status: "已赠课",
    giftLessons: "+1课",
    reviewer: "黄俊",
    reviewTime: "2026-07-30 09:28:46"
  },
  {
    id: 4,
    studentName: "陈锡莹",
    studentId: "HKC19535",
    manager: "彭芬兰",
    advisor: "卢衍飞",
    month: "2026-07",
    proofImage: "./中文路Logo.png",
    uploadTime: "2026-07-28 22:17:48",
    status: "已赠课",
    giftLessons: "+1课",
    reviewer: "黄俊",
    reviewTime: "2026-07-30 09:29:29"
  },
  {
    id: 5,
    studentName: "杨昊林",
    studentId: "HKC107057",
    manager: "彭芬兰",
    advisor: "陈晓晴",
    month: "2026-07",
    proofImage: "./中文路Logo.png",
    uploadTime: "2026-07-28 18:42:23",
    status: "已赠课",
    giftLessons: "+1课",
    reviewer: "黄俊",
    reviewTime: "2026-07-30 09:30:06"
  },
  {
    id: 6,
    studentName: "欢欢",
    studentId: "HKC107376",
    manager: "彭芬兰",
    advisor: "黄俊",
    month: "2026-07",
    proofImage: "./中文路Logo.png",
    uploadTime: "2026-07-27 19:05:28",
    status: "已赠课",
    giftLessons: "+1课",
    reviewer: "黄俊",
    reviewTime: "2026-07-30 09:30:37"
  },
  {
    id: 7,
    studentName: "余雪言",
    studentId: "HKC31818",
    manager: "曹园园",
    advisor: "卢衍飞",
    month: "2026-07",
    proofImage: "./中文路Logo.png",
    uploadTime: "2026-07-27 11:51:05",
    status: "已赠课",
    giftLessons: "+1课",
    reviewer: "黄俊",
    reviewTime: "2026-07-30 09:31:11"
  }
];

let records = structuredClone(originalRecords);
let visibleRecords = [];
let activeRecord = null;
let agreements = structuredClone(originalAgreements);
let visibleAgreements = [];
let activeAgreement = null;
let activeAppPolicyKey = "service";
let activeAppPolicyBackScreen = "agreement";
let shareGiftRecords = structuredClone(originalShareGiftRecords);
let visibleShareGiftRecords = [];
let consentRecords = [
  {
    studentId: "HKC105873",
    orderId: "ORD20260729001",
    agreementName: "服务协议",
    policyKey: "service",
    version: "V9.0",
    agreedAt: "2026-07-29 10:14:08"
  },
  {
    studentId: "HKC105873",
    orderId: "ORD20260729001",
    agreementName: "售后政策",
    policyKey: "afterSale",
    version: "V9.0",
    agreedAt: "2026-07-29 10:14:08"
  }
];

const statusClass = {
  待审核: "pending",
  已通过: "approved"
};

const tableBody = document.querySelector("[data-table-body]");
const emptyState = document.querySelector("[data-empty]");
const resultCount = document.querySelector("[data-result-count]");
const totalCount = document.querySelector("[data-total-count]");
const modal = document.querySelector("[data-modal]");
const modalBackdrop = document.querySelector("[data-modal-backdrop]");
const modalCard = document.querySelector("[data-modal-card]");
const devPanel = document.querySelector("[data-dev-panel]");
const devStatus = document.querySelector("[data-dev-status]");
const statusSelect = document.querySelector("[data-status-select]");
const statusLabel = document.querySelector("[data-status-label]");
const viewEls = document.querySelectorAll("[data-view]");
const navViewLinks = document.querySelectorAll("[data-open-view]");
const orderTableBody = document.querySelector("[data-order-table-body]");
const orderEmptyState = document.querySelector("[data-order-empty]");
const orderResultCount = document.querySelector("[data-order-result-count]");
const orderTotalCount = document.querySelector("[data-order-total-count]");
const orderListTableBody = document.querySelector("[data-order-list-table-body]");
const orderListEmptyState = document.querySelector("[data-order-list-empty]");
const orderListResultCount = document.querySelector("[data-order-list-result-count]");
const orderListTotalCount = document.querySelector("[data-order-list-total-count]");
const agreementTableBody = document.querySelector("[data-agreement-table-body]");
const agreementEmptyState = document.querySelector("[data-agreement-empty]");
const agreementResultCount = document.querySelector("[data-agreement-result-count]");
const agreementTotalCount = document.querySelector("[data-agreement-total-count]");
const shareGiftTableBody = document.querySelector("[data-share-gift-table-body]");
const shareGiftEmptyState = document.querySelector("[data-share-gift-empty]");
const shareGiftTotalCount = document.querySelector("[data-share-gift-total-count]");
const consentTableBody = document.querySelector("[data-consent-table-body]");
const appPolicyReader = document.querySelector("[data-app-policy-reader]");
const appPolicyTitle = document.querySelector("[data-app-policy-title]");
const hasReceiptAuditView = Boolean(tableBody && emptyState && resultCount && totalCount);
const hasAgreementView = Boolean(agreementTableBody && agreementEmptyState && agreementResultCount && agreementTotalCount);
const hasShareGiftView = Boolean(shareGiftTableBody && shareGiftEmptyState && shareGiftTotalCount);
const hasOrderListView = Boolean(orderListTableBody && orderListEmptyState && orderListResultCount && orderListTotalCount);

function switchView(viewName) {
  if (!viewEls.length) return;
  viewEls.forEach((view) => {
    view.hidden = view.dataset.view !== viewName;
  });
  navViewLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.openView === viewName);
  });
  if (viewName === "orders") renderOrders();
  if (viewName === "order-list") renderOrderList();
  if (viewName === "share-gift") applyShareGiftFilters();
  if (viewName === "platform-agreement") applyAgreementFilters();
}

function setAppScreen(screenName) {
  document.querySelectorAll("[data-app-screen]").forEach((screen) => {
    screen.hidden = screen.dataset.appScreen !== screenName;
  });
  if (screenName === "agreement-detail") renderAppPolicyDetail(activeAppPolicyKey);
}

function getFilters() {
  return Object.fromEntries([...document.querySelectorAll("[data-filter]")].map((input) => [input.dataset.filter, input.value.trim()]));
}

function setFilter(name, value) {
  const input = document.querySelector(`[data-filter="${name}"]`);
  if (input) input.value = value;
  if (name === "status") syncStatusSelect(value);
}

function applyFilters() {
  if (!hasReceiptAuditView) return;
  const filters = getFilters();
  if (filters.dateStart && filters.dateEnd && filters.dateEnd < filters.dateStart) {
    showToast("申请结束时间不能早于开始时间");
    return;
  }
  visibleRecords = records.filter((item) => {
    const textMatch = (field, value) => !value || item[field].toLowerCase().includes(value.toLowerCase());
    const receiptMatch = !filters.receiptNo || (item.receiptNo || "").toLowerCase().includes(filters.receiptNo.toLowerCase());
    const startOk = !filters.dateStart || item.applyTime.slice(0, 10) >= filters.dateStart;
    const endOk = !filters.dateEnd || item.applyTime.slice(0, 10) <= filters.dateEnd;
    return textMatch("studentId", filters.studentId)
      && textMatch("orderId", filters.orderId)
      && textMatch("studentName", filters.studentName)
      && (!filters.payType || item.payType === filters.payType)
      && (!filters.campus || item.campus === filters.campus)
      && (!filters.status || item.status === filters.status)
      && receiptMatch
      && startOk
      && endOk;
  }).sort((a, b) => b.applyTime.localeCompare(a.applyTime));
  render();
}

function resetFilters() {
  document.querySelectorAll("[data-filter]").forEach((input) => {
    input.value = "";
  });
  syncStatusSelect("");
  applyFilters();
}

function clearReceiptFilters() {
  document.querySelectorAll("[data-filter]").forEach((input) => {
    input.value = "";
  });
  syncStatusSelect("");
}

function getOrderFilters() {
  return Object.fromEntries([...document.querySelectorAll("[data-order-filter]")].map((input) => [input.dataset.orderFilter, input.value.trim()]));
}

function applyOrderFilters() {
  renderOrders();
}

function setOrderFilter(name, value) {
  const input = document.querySelector(`[data-order-filter="${name}"]`);
  if (input) input.value = value;
}

function setOrderAuditStatus(value) {
  setOrderFilter("auditStatus", value);
  document.querySelectorAll("[data-order-audit-tab]").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.orderAuditTab === value);
  });
}

function clearOrderFilters() {
  document.querySelectorAll("[data-order-filter]").forEach((input) => {
    input.value = "";
  });
  setOrderAuditStatus("未审核");
}

function resetOrderFilters() {
  clearOrderFilters();
  renderOrders();
}

function getOrderListFilters() {
  return Object.fromEntries([...document.querySelectorAll("[data-order-list-filter]")].map((input) => [input.dataset.orderListFilter, input.value.trim()]));
}

function setOrderListFilter(name, value) {
  const input = document.querySelector(`[data-order-list-filter="${name}"]`);
  if (input) input.value = value;
}

function clearOrderListFilters() {
  document.querySelectorAll("[data-order-list-filter]").forEach((input) => {
    input.value = "";
  });
  setOrderListFilter("auditStatus", "审核通过");
}

function applyOrderListFilters() {
  renderOrderList();
}

function resetOrderListFilters() {
  clearOrderListFilters();
  renderOrderList();
}

function getAgreementFilters() {
  return Object.fromEntries([...document.querySelectorAll("[data-agreement-filter]")].map((input) => [input.dataset.agreementFilter, input.value.trim()]));
}

function applyAgreementFilters() {
  if (!hasAgreementView) return;
  const filters = getAgreementFilters();
  visibleAgreements = agreements.filter((item) => {
    const textMatch = (field, value) => !value || item[field].toLowerCase().includes(value.toLowerCase());
    return textMatch("name", filters.name)
      && textMatch("code", filters.code)
      && (!filters.status || item.status === filters.status)
      && (!filters.campus || normalizeAgreementList(item.campuses).includes(filters.campus))
      && (!filters.createdAt || item.createdAt.slice(0, 10) === filters.createdAt)
      && (!filters.updatedAt || item.updatedAt.slice(0, 10) === filters.updatedAt)
      && textMatch("operator", filters.operator);
  }).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  renderAgreements();
}

function resetAgreementFilters() {
  document.querySelectorAll("[data-agreement-filter]").forEach((input) => {
    input.value = "";
  });
  applyAgreementFilters();
}

function getShareGiftFilters() {
  return Object.fromEntries([...document.querySelectorAll("[data-share-gift-filter]")].map((input) => [input.dataset.shareGiftFilter, input.value.trim()]));
}

function setShareGiftFilter(name, value) {
  const input = document.querySelector(`[data-share-gift-filter="${name}"]`);
  if (input) input.value = value;
}

function applyShareGiftFilters() {
  if (!hasShareGiftView) return;
  const filters = getShareGiftFilters();
  visibleShareGiftRecords = shareGiftRecords.filter((item) => {
    const studentText = `${item.studentName} ${item.studentId}`.toLowerCase();
    return (!filters.student || studentText.includes(filters.student.toLowerCase()))
      && (!filters.month || item.month === filters.month)
      && (!filters.status || item.status === filters.status)
      && (!filters.manager || item.manager === filters.manager)
      && (!filters.advisor || item.advisor === filters.advisor)
      && (!filters.uploadStart || item.uploadTime.slice(0, 10) >= filters.uploadStart)
      && (!filters.uploadEnd || item.uploadTime.slice(0, 10) <= filters.uploadEnd);
  }).sort((a, b) => b.uploadTime.localeCompare(a.uploadTime));
  renderShareGiftRecords();
}

function resetShareGiftFilters() {
  document.querySelectorAll("[data-share-gift-filter]").forEach((input) => {
    input.value = "";
  });
  applyShareGiftFilters();
}

function render() {
  renderTable();
  renderOrderList();
  renderOrders();
  renderShareGiftRecords();
  document.querySelectorAll("[data-status-shortcut]").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.statusShortcut === getFilters().status);
  });
}

function renderStats() {
  if (!hasReceiptAuditView) return;
  const counts = {
    all: records.length,
    pending: records.filter((item) => item.status === "待审核").length,
    approved: records.filter((item) => item.status === "已通过").length
  };
  Object.entries(counts).forEach(([key, value]) => {
    const countEl = document.querySelector(`[data-count="${key}"]`);
    if (countEl) countEl.textContent = value;
  });
}

function renderTable() {
  if (!hasReceiptAuditView) return;
  resultCount.textContent = `${visibleRecords.length} 条记录`;
  totalCount.textContent = visibleRecords.length;
  emptyState.hidden = visibleRecords.length > 0;
  tableBody.innerHTML = visibleRecords.map((item) => `
    <tr>
      <td>${item.studentId}</td>
      <td>${item.orderId}</td>
      <td>${item.payType || "全款"}</td>
      <td>${item.studentName}</td>
      <td>${item.campus}</td>
      <td><span class="status ${statusClass[item.status]}">${item.status}</span></td>
      <td>${item.receiptNo || "--"}</td>
      <td>${item.applyTime}</td>
      <td>${item.reviewTime || "--"}</td>
      <td><div class="actions">${renderActions(item)}</div></td>
    </tr>
  `).join("");
}

function renderOrders() {
  if (!orderTableBody) return;
  const filters = getOrderFilters();
  const orderRows = records.filter((item) => {
    const meta = getOrderMeta(item);
    const studentText = `${item.studentId} ${item.studentName}`.toLowerCase();
    return (!filters.orderId || item.orderId.toLowerCase().includes(filters.orderId.toLowerCase()))
      && (!filters.student || studentText.includes(filters.student.toLowerCase()))
      && (!filters.campus || item.campus === filters.campus)
      && (!filters.orderType || meta.orderType === filters.orderType)
      && (!filters.payType || meta.payType === filters.payType)
      && (!filters.auditStatus || meta.auditStatus === filters.auditStatus)
      && (!filters.payMethod || meta.payMethod === filters.payMethod)
      && (!filters.createStart || item.applyTime.slice(0, 10) >= filters.createStart)
      && (!filters.createEnd || item.applyTime.slice(0, 10) <= filters.createEnd)
      && (!filters.payStart || meta.paymentDateKey >= filters.payStart)
      && (!filters.payEnd || meta.paymentDateKey <= filters.payEnd)
      && (!filters.lessonCount || String(meta.lessonCount).includes(filters.lessonCount))
      && (!filters.paymentAccount || meta.paymentAccount === filters.paymentAccount)
      && (!filters.orderOwner || meta.owner.includes(filters.orderOwner))
      && (!filters.auditStatus || meta.auditStatus === filters.auditStatus);
  }).sort((a, b) => b.applyTime.localeCompare(a.applyTime));

  orderResultCount.textContent = `${orderRows.length} 条记录`;
  orderTotalCount.textContent = orderRows.length;
  orderEmptyState.hidden = orderRows.length > 0;
  orderTableBody.innerHTML = orderRows.map((item) => {
    const meta = getOrderMeta(item);
    const auditActionLabel = meta.auditStatus === "未审核" ? "审核" : "查看审核";
    return `
      <tr>
        <td><button class="text-link" type="button" data-action="order" data-id="${item.id}">${item.studentName}</button></td>
        <td>${item.studentId}</td>
        <td>${item.orderId}</td>
        <td><button class="text-link" type="button" data-action="order" data-id="${item.id}">${meta.auditStatus}</button></td>
        <td>${meta.rejectCount}</td>
        <td>${meta.orderType}</td>
        <td>${item.paymentAmount}</td>
        <td>${meta.arrivedAmount}</td>
        <td>${meta.productNames}</td>
        <td>${meta.payType}</td>
        <td>${meta.userChoice}</td>
        <td>${meta.payMethod}</td>
        <td>${meta.paymentAccount}</td>
        <td>${meta.owner}</td>
        <td>${meta.statementNo}</td>
        <td><div class="actions">${actionButton(auditActionLabel, "order", item.id)}</div></td>
      </tr>
    `;
  }).join("");
}

function renderOrderList() {
  if (!hasOrderListView) return;
  const filters = getOrderListFilters();
  const rows = records.filter((item) => {
    const meta = getOrderListMeta(item);
    const studentText = `${item.studentId} ${item.studentName}`.toLowerCase();
    return (!filters.orderId || item.orderId.toLowerCase().includes(filters.orderId.toLowerCase()))
      && (!filters.student || studentText.includes(filters.student.toLowerCase()))
      && (!filters.campus || item.campus === filters.campus)
      && (!filters.orderType || meta.orderType === filters.orderType)
      && (!filters.payType || meta.payType === filters.payType)
      && (!filters.auditStatus || meta.auditStatus === filters.auditStatus)
      && (!filters.payMethod || meta.payMethod === filters.payMethod)
      && (!filters.createStart || item.applyTime.slice(0, 10) >= filters.createStart)
      && (!filters.createEnd || item.applyTime.slice(0, 10) <= filters.createEnd)
      && (!filters.payStart || meta.paymentDateKey >= filters.payStart)
      && (!filters.payEnd || meta.paymentDateKey <= filters.payEnd)
      && (!filters.lessonCount || String(meta.lessonCount).includes(filters.lessonCount))
      && (!filters.orderOwner || meta.owner.includes(filters.orderOwner))
      && (!filters.classBound || meta.classBound === filters.classBound);
  }).sort((a, b) => b.applyTime.localeCompare(a.applyTime));

  orderListResultCount.textContent = `${rows.length} 条记录`;
  orderListTotalCount.textContent = rows.length;
  orderListEmptyState.hidden = rows.length > 0;
  orderListTableBody.innerHTML = rows.map((item) => {
    const meta = getOrderListMeta(item);
    return `
      <tr>
        <td><button class="text-link" type="button" data-action="order" data-id="${item.id}">${item.studentName}</button></td>
        <td>${item.studentId}</td>
        <td>${item.orderId}</td>
        <td><span class="status ${orderListStatusClass(meta.auditStatus)}">${meta.auditStatus}</span></td>
        <td>${meta.orderType}</td>
        <td>${meta.confirmStatus}</td>
        <td>${meta.transactionType}</td>
        <td>${meta.orderStatus}</td>
        <td>${meta.productNames}</td>
        <td>${meta.rmbAmount}</td>
        <td>${item.paymentAmount}</td>
        <td>${meta.arrivedAmount}</td>
        <td>${meta.classBound}</td>
        <td>${meta.customerSource}</td>
        <td>${meta.payType}</td>
        <td><div class="actions">${orderListActionButtons(item, meta)}</div></td>
      </tr>
    `;
  }).join("");
}

function renderShareGiftRecords() {
  if (!hasShareGiftView) return;
  shareGiftTotalCount.textContent = visibleShareGiftRecords.length;
  shareGiftEmptyState.hidden = visibleShareGiftRecords.length > 0;
  shareGiftTableBody.innerHTML = visibleShareGiftRecords.map((item) => {
    const actionLabel = item.status === "待审核" ? "审核" : "查看";
    const reviewInfo = item.status === "待审核"
      ? "--<br>--"
      : `${item.reviewer}<br><span class="muted-cell">${item.reviewTime}</span>`;
    return `
      <tr>
        <td><strong>${item.studentName}</strong></td>
        <td>${item.studentId}</td>
        <td>${item.manager}</td>
        <td>${item.advisor}</td>
        <td>${item.month}</td>
        <td><img class="share-proof-thumb" src="${item.proofImage}" alt="分享凭证"></td>
        <td>${item.uploadTime}</td>
        <td><span class="status ${shareGiftStatusClass(item.status)}">${item.status}</span></td>
        <td><strong class="${item.status === "已赠课" ? "text-success" : ""}">${item.giftLessons}</strong></td>
        <td>${reviewInfo}</td>
        <td><button class="link-btn" type="button" data-share-gift-action="${item.id}">${actionLabel}</button></td>
      </tr>
    `;
  }).join("");
}

function renderAgreements() {
  if (!hasAgreementView) return;
  agreementResultCount.textContent = `${visibleAgreements.length} 条记录`;
  agreementTotalCount.textContent = visibleAgreements.length;
  agreementEmptyState.hidden = visibleAgreements.length > 0;
  agreementTableBody.innerHTML = visibleAgreements.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.code}</td>
      <td>${item.currentVersion}</td>
      <td><span class="status ${agreementStatusClass(item.status)}">${item.status}</span></td>
      <td>${agreementListText(item.terminals)}</td>
      <td>${agreementListText(item.campuses)}</td>
      <td>${item.createdAt}</td>
      <td>${item.updatedAt}</td>
      <td>${item.operator}</td>
      <td>
        <div class="actions">
          ${agreementButton("编辑", "edit", item.id)}
          ${agreementButton("归档", "archive", item.id)}
          ${agreementButton("历史版本", "history", item.id)}
        </div>
      </td>
    </tr>
  `).join("");
}

function renderConsentRecords() {
  if (!consentTableBody) return;
  consentTableBody.innerHTML = consentRecords.map((item) => `
    <tr>
      <td>${item.studentId}</td>
      <td>${item.orderId}</td>
      <td>${item.agreementName}</td>
      <td>${item.version}</td>
      <td>${item.agreedAt}</td>
    </tr>
  `).join("");
}

function agreementStatusClass(status) {
  if (status === "已发布") return "approved";
  if (status === "草稿中") return "pending";
  return "archived";
}

function shareGiftStatusClass(status) {
  if (status === "已赠课") return "approved";
  return "pending";
}

function agreementButton(label, action, id) {
  return `<button class="link-btn" type="button" data-agreement-action="${action}" data-id="${id}">${label}</button>`;
}

function getOrderMeta(item) {
  const orderTypeMap = {
    1: "首销",
    2: "首销",
    3: "转介绍",
    5: "复购"
  };
  const customerSourceMap = {
    1: "官网CMS",
    2: "Messenger",
    3: "Messenger",
    5: "现场录入"
  };
  const classBoundMap = {
    1: "否",
    2: "是",
    3: "否",
    5: "是"
  };
  const confirmStatusMap = {
    1: "未确认",
    2: "已确认",
    3: "未确认",
    5: "已确认"
  };
  const auditStatusMap = {
    1: "未审核",
    2: "未审核",
    3: "未审核",
    5: "未审核"
  };
  const auditStatus = auditStatusMap[item.id] || "未审核";
  const lessonCount = item.products.reduce((sum, product) => sum + Number(product.lessons || 0), 0);
  const paymentAccount = String(item.paymentChannel || "").split(/[：:]/)[0];
  return {
    auditStatus,
    rejectCount: 0,
    orderType: orderTypeMap[item.id] || "首销",
    confirmStatus: confirmStatusMap[item.id] || "未确认",
    productNames: item.products.map((product) => product.lessons).join(", "),
    rmbAmount: `¥ ${(Number(item.paymentAmount.replace(/[^\d.]/g, "")) * 0.92).toFixed(0)}`,
    arrivedAmount: item.refundStatus === "全额退款" ? "HK$0" : item.paymentAmount,
    classBound: classBoundMap[item.id] || "否",
    customerSource: customerSourceMap[item.id] || "官网CMS",
    payType: item.payType || "全款",
    payMethod: "线下汇款",
    paymentAccount,
    userChoice: "否",
    owner: "超级管理员",
    statementNo: "--",
    lessonCount,
    paymentDateKey: toDateKey(item.paymentDate),
    extraActions: getOrderExtraActions(item)
  };
}

function canViewReceiptFromOrder(item, meta) {
  return meta.auditStatus === "审核通过"
    && meta.confirmStatus === "已确认"
    && meta.receiptAuditStatus === "已通过"
    && meta.receiptIssueStatus === "已发放"
    && item.status === "已通过"
    && Boolean(item.receiptNo);
}

function getOrderListMeta(item) {
  const base = getOrderMeta(item);
  const auditStatusMap = {
    1: "审核通过",
    2: "审核通过",
    3: "审核通过",
    5: "审核通过"
  };
  const confirmStatusMap = {
    1: "已确认",
    2: "已确认",
    3: "未确认",
    5: "已确认"
  };
  const orderStatusMap = {
    1: "已完成",
    2: "已完成",
    3: "已完成",
    5: "已完成"
  };
  const transactionTypeMap = {
    1: "购买产品",
    2: "购买产品",
    3: "购买产品",
    5: "购买产品"
  };
  return {
    ...base,
    auditStatus: auditStatusMap[item.id] || "未审核",
    confirmStatus: confirmStatusMap[item.id] || "未确认",
    transactionType: transactionTypeMap[item.id] || "购买产品",
    orderStatus: orderStatusMap[item.id] || "待支付",
    productNames: item.products.map((product) => product.name).join("、"),
    receiptAuditStatus: item.status,
    receiptIssueStatus: item.receiptNo ? "已发放" : "未发放"
  };
}

function hasRepaymentPlan(item, meta = getOrderListMeta(item)) {
  return meta.payType === "分期";
}
function orderListActionButtons(item, meta) {
  const receiptButton = canViewReceiptFromOrder(item, meta) ? actionButton("查看收据", "receipt", item.id) : "";
  const repaymentPlanButton = hasRepaymentPlan(item, meta) ? actionButton("还款计划", "repayment-plan", item.id) : "";
  return actionButton("详情", "order", item.id) + receiptButton + repaymentPlanButton;
}

function repaymentPlanAmount(record) {
  const sourceAmount = record.orderTotalAmount || record.paymentAmount || "HK$0";
  const prefix = sourceAmount.match(/^[^\d]+/)?.[0] || "HK$";
  const total = Number(String(sourceAmount).replace(/[^\d.]/g, "")) || 0;
  const count = Number(record.installmentTotal || 2);
  return `${prefix}${Math.round(total / count)}`;
}

function repaymentPlanRows(record) {
  const amount = repaymentPlanAmount(record);
  const isCancelled = record.refundStatus === "全额退款";
  const receiptAction = canViewReceiptFromOrder(record, getOrderListMeta(record))
    ? `<button class="link-btn" type="button" data-action="receipt" data-id="${record.id}">查看收据</button>`
    : "";
  return [
    {
      planDate: "2026-07-25",
      actualDate: "2026-07-25",
      amount,
      status: "支付成功",
      auditStatus: "审核通过",
      paymentNo: `PAY-${record.orderId.slice(-5)}-01`,
      payMethod: "线下汇款",
      actions: `<button class="link-btn" type="button" data-action="order" data-id="${record.id}">详情</button>${receiptAction}<button class="link-btn" type="button" disabled>修改日期</button>`
    },
    {
      planDate: "2026-08-24",
      actualDate: "--",
      amount,
      status: isCancelled ? "订单取消" : "待还款",
      auditStatus: "--",
      paymentNo: "--",
      payMethod: "--",
      actions: `<button class="link-btn" type="button" data-action="order" data-id="${record.id}">还款</button><button class="link-btn" type="button">修改日期</button><button class="link-btn" type="button">编辑</button>`
    }
  ];
}

function openRepaymentPlan(record) {
  if (!record) return;
  const planRows = repaymentPlanRows(record);
  const rows = planRows.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.planDate}</td>
      <td>${item.actualDate}</td>
      <td>${item.amount}</td>
      <td>${item.status}</td>
      <td>${item.auditStatus}</td>
      <td>${item.paymentNo}</td>
      <td>${item.payMethod}</td>
      <td><div class="actions repayment-plan-actions">${item.actions}</div></td>
    </tr>
  `).join("");
  const body = `
    <div class="repayment-plan-table-wrap">
      <table class="repayment-plan-table">
        <thead><tr><th>序号</th><th>计划还款日</th><th>实际还款日</th><th>分期金额</th><th>状态</th><th>审核状态</th><th>支付流水号</th><th>支付方式</th><th>操作</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="repayment-plan-pagination">
      <span>总记录数: ${planRows.length}</span>
      <button class="page-btn" type="button" disabled>‹</button>
      <button class="page-btn is-current" type="button">1</button>
      <button class="page-btn" type="button" disabled>›</button>
      <select aria-label="每页条数"><option>10 条/页</option></select>
    </div>
  `;
  openModal(modalShell("还款计划", `${record.studentName} / ${record.orderId}`, body, "", "wide"));
}
function orderListStatusClass(status) {
  if (status === "审核通过") return "approved";
  if (status === "审核拒绝") return "rejected";
  return "pending";
}

function getOrderExtraActions(item) {
  const actions = [];
  if (item.status === "待审核") actions.push(actionButton("赠送", "order", item.id));
  if (item.id === 3) actions.push(actionButton("报班", "order", item.id));
  if (item.id === 5) actions.push(actionButton("绑定复购", "order", item.id));
  return actions.join("");
}

function renderActions(item) {
  if (item.status === "待审核") {
    return actionButton("查看订单", "order", item.id);
  }
  if (item.status === "已通过") {
    return actionButton("查看审核", "audit-detail", item.id)
      + actionButton("查看收据", "receipt", item.id)
      + actionButton("查看订单", "order", item.id);
  }
  return actionButton("查看审核", "audit-detail", item.id)
    + actionButton("查看收据", "receipt", item.id)
    + actionButton("查看订单", "order", item.id);
}

function actionButton(label, action, id) {
  return `<button class="link-btn" type="button" data-action="${action}" data-id="${id}">${label}</button>`;
}

function openModal(content) {
  const isAppConfirm = content.includes("app-confirm-dialog");
  const wantsAppPhoneModal = isAppConfirm
    || content.includes("app-receipt-sheet")
    || content.includes("app-email-dialog")
    || content.includes("app-success-dialog")
    || content.includes("app-agreement-sheet");
  const phoneShell = document.querySelector(".phone-shell");
  const isAppPhoneModal = wantsAppPhoneModal && Boolean(phoneShell);
  modalCard.innerHTML = content;
  modalCard.classList.toggle("is-wide", content.includes("modal-body-wide"));
  modalCard.classList.toggle("is-compact", content.includes("modal-body-compact"));
  modalCard.classList.toggle("is-app-confirm", isAppConfirm);
  modalCard.classList.toggle("is-app-sheet", content.includes("app-receipt-sheet"));
  modalCard.classList.toggle("is-app-agreement", content.includes("app-agreement-sheet"));
  modalCard.classList.toggle("is-app-compact", content.includes("app-email-dialog") || content.includes("app-success-dialog"));
  modal.classList.toggle("is-app-phone-modal", isAppPhoneModal);
  if (isAppPhoneModal) {
    const rect = phoneShell.getBoundingClientRect();
    modal.style.setProperty("--app-modal-left", `${rect.left}px`);
    modal.style.setProperty("--app-modal-top", `${rect.top}px`);
    modal.style.setProperty("--app-modal-width", `${rect.width}px`);
    modal.style.setProperty("--app-modal-height", `${rect.height}px`);
  } else {
    modal.removeAttribute("style");
  }
  modal.classList.add("is-open");
  modalBackdrop.classList.add("is-open");
}

function closeModal() {
  modal.classList.remove("is-open");
  modalBackdrop.classList.remove("is-open");
  modalCard.classList.remove("is-wide");
  modalCard.classList.remove("is-compact");
  modalCard.classList.remove("is-app-confirm");
  modalCard.classList.remove("is-app-sheet");
  modalCard.classList.remove("is-app-agreement");
  modalCard.classList.remove("is-app-compact");
  modal.classList.remove("is-app-phone-modal");
  modal.removeAttribute("style");
  modalCard.innerHTML = "";
  activeRecord = null;
}

function modalShell(title, subtitle, body, foot = "", size = "") {
  return `
    <div class="modal-head">
      <div>
        <h3>${title}</h3>
        <p>${subtitle}</p>
      </div>
      <button class="modal-close" type="button" data-close-modal>×</button>
    </div>
    <div class="modal-body ${size ? `modal-body-${size}` : ""}">${body}</div>
    ${foot ? `<div class="modal-foot">${foot}</div>` : ""}
  `;
}

function openAudit(record) {
  activeRecord = record;
  const resubmitBlock = record.isResubmitted ? `
    <div class="resubmit-review-block">
      <div class="resubmit-proof-card">
        <span>重新提交图片</span>
        <div class="resubmit-proof-thumb">
          <img src="${record.resubmitProofImage || "./中文路Logo.png"}" alt="重新提交图片预览">
          <strong>付款凭证补充图</strong>
        </div>
      </div>
      <div class="resubmit-note-card">
        <span>补充说明</span>
        <p>${record.resubmitNote || "--"}</p>
      </div>
    </div>
  ` : "";
  const body = `
    <div class="application-strip">
      <span>申请姓名：<strong>${record.studentName}</strong></span>
      <span>学员编号：<strong>${record.studentId}</strong></span>
      <span>申请时间：<strong>${record.applyTime}</strong></span>
    </div>
    ${resubmitBlock}
    ${orderDetail(record, { showStudentStrip: false })}
    <div class="field">
      <label for="auditComment">审核意见</label>
      <textarea id="auditComment" rows="4" maxlength="200" placeholder="拒绝时必填，最多 200 字；通过时可填写备注。"></textarea>
      <div class="input-hint"><span data-comment-count>0</span>/200</div>
    </div>
  `;
  const foot = `
    <button class="secondary-btn" type="button" data-close-modal>取消</button>
    <button class="secondary-btn reject-btn" type="button" data-submit-audit="rejected">拒绝</button>
    <button class="primary-btn" type="button" data-submit-audit="approved">通过</button>
  `;
  openModal(modalShell("审核收据申请", `${record.studentName} / ${record.orderId}`, body, foot, "wide"));
}

function submitAudit(result) {
  const comment = document.querySelector("#auditComment").value.trim();
  if (result === "rejected" && !comment) {
    showToast("审核拒绝必须填写审核意见");
    return;
  }
  if (comment.length > 200) {
    showToast("审核意见最多 200 字");
    return;
  }
  if (activeRecord.refundStatus !== "未退款" && result === "approved") {
    showToast("异常或已退款订单不可审核通过");
    return;
  }
  const target = records.find((item) => item.id === activeRecord.id);
  target.reviewer = "中文路后台";
  target.reviewTime = "2026-07-29 16:30:00";
  target.reviewComment = comment || "订单财务审核通过、且客户订单已确认后，客户申请收据自动通过。";
  if (result === "approved") {
    target.status = "已通过";
    target.receiptNo = `REC-${target.campusCode}-20260729-000${target.id}`;
    showToast("审核通过，已生成电子收据");
  } else {
    target.status = "待审核";
    showToast("审核拒绝，已生成用户通知");
  }
  closeModal();
  applyFilters();
}

function openAuditDetail(record) {
  const reviewer = "中文路后台";
  const reviewComment = "订单财务审核通过、且客户订单已确认后，客户申请收据自动通过。";
  const body = `
    <div class="info-box">
      <h4>审核详情</h4>
      ${kv([
        ["审核结果", "已通过"],
        ["审核人", reviewer],
        ["审核时间", record.reviewTime || "--"],
        ["审核意见", reviewComment]
      ])}
    </div>
  `;
  openModal(modalShell("查看审核", `${record.studentName} / ${record.orderId}`, body));
}

function receiptDocumentMarkup(record, extraClass = "") {
  const receiptIssueDate = getReceiptIssueDate(record);
  const isInstallmentReceipt = record.payType === "分期";
  const installmentText = `${record.installmentCurrent || 1}/${record.installmentTotal || 1}`;
  const productRows = record.products.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.lessons}</td>
      <td>${item.giftLessons}</td>
      <td>${item.vouchers}</td>
      <td>${item.validity}</td>
    </tr>
  `).join("");
  return `
    <div class="receipt-doc-paper ${extraClass}">
      <div class="receipt-doc-brand">
        <img src="./中文路Logo.png" alt="中文路Logo">
      </div>
      <h3>收據</h3>
      <div class="receipt-doc-field">學生編號：<strong>${record.studentId}</strong></div>
      <div class="receipt-doc-field">學生姓名：<strong>${record.studentName}</strong></div>
      <div class="receipt-doc-label">產品名稱及課堂數量：</div>
      <table class="receipt-doc-table">
        <colgroup>
          <col class="receipt-product-col">
          <col>
          <col>
          <col>
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>產品名稱</th>
            <th>課次數</th>
            <th>贈送課次數</th>
            <th>贈送課程券（張）</th>
            <th>有效期（月）</th>
          </tr>
        </thead>
        <tbody>${productRows}</tbody>
      </table>
      ${isInstallmentReceipt ? '<p class="receipt-installment-note">註：此為分期憑證，上述課次數、贈送課次數、贈送課程券及有效期，須全數結清後完整生效。</p>' : ""}
      <div class="receipt-doc-field">付款金額：<strong>${record.paymentAmount}</strong></div>
      ${isInstallmentReceipt ? `<div class="receipt-doc-field">期数：<strong>${installmentText}</strong></div>` : ""}
      <div class="receipt-doc-field">付款时间：<strong>${record.paymentDate}</strong></div>
      <div class="receipt-doc-field">付款渠道：<strong>${toTraditionalChannel(record.paymentChannel)}</strong></div>
      <div class="receipt-doc-field">收据编号：<strong>${record.receiptNo}</strong></div>
      <div class="receipt-doc-footer">
        <div class="receipt-doc-signature">
          <div class="receipt-doc-signature-row">
            <img class="receipt-doc-seal" src="./中文路（香港）有限公司-正式章.png" alt="中文路（香港）有限公司正式章">
            <strong>中文路（香港）有限公司</strong>
          </div>
          <div class="receipt-doc-date">日期：${receiptIssueDate}</div>
        </div>
      </div>
      <div class="receipt-doc-slogan">— Better Chinese , Better Jobs —</div>
    </div>
  `;
}

function openReceipt(record) {
  const body = `
    <div class="pdf-toolbar">
      <span>PDF 预览</span>
      <button class="primary-btn compact" type="button" data-download-pdf="${record.id}">下载 PDF</button>
    </div>
    <div class="pdf-preview">
      ${receiptDocumentMarkup(record)}
    </div>
  `;
  openModal(modalShell("查看收据", `${record.receiptNo}`, body, "", "wide"));
}

function openOrder(record) {
  openModal(modalShell("查看订单详情", `${record.studentName} / ${record.orderId}`, orderDetail(record), "", "wide"));
}

function findRecordByOrderId(orderId) {
  return records.find((item) => item.orderId === orderId);
}

function findAgreement(id) {
  return agreements.find((item) => item.id === Number(id));
}

function getPublishedEnrollmentAgreement() {
  return agreements.find((item) => item.code === "AGR-ENROLL-2026" && item.status === "已发布") || agreements[0];
}

function buildVersionOptions(selected = "V1.0") {
  const options = [];
  for (let major = 1; major <= 100; major += 1) {
    for (let minor = 0; minor <= 10; minor += 1) {
      const version = `V${major}.${minor}`;
      options.push(`<option value="${version}" ${version === selected ? "selected" : ""}>${version}</option>`);
    }
  }
  return options.join("");
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char]);
}

function isHtmlContent(content = "") {
  return /<\/?[a-z][\s\S]*>/i.test(String(content));
}

function editorContent(content = "") {
  if (!content) return "";
  return isHtmlContent(content) ? content : escapeHtml(content);
}

function textFromHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function agreementContentHasValue(html = "") {
  return Boolean(textFromHtml(html) || /<img\b/i.test(String(html)));
}

function normalizeAgreementList(value, fallback = []) {
  if (Array.isArray(value) && value.length) return value;
  if (Array.isArray(fallback) && fallback.length) return fallback;
  return [];
}

function agreementListText(value, fallback = []) {
  const list = normalizeAgreementList(value, fallback);
  return list.length ? list.join("、") : "--";
}

function agreementEditorToolbar() {
  return `
    <div class="rich-editor-toolbar" role="toolbar" aria-label="协议富文本工具栏">
      <select data-editor-block aria-label="段落样式">
        <option value="P">正文</option>
        <option value="H1">标题1</option>
        <option value="H2">标题2</option>
        <option value="H3">标题3</option>
        <option value="BLOCKQUOTE">引用</option>
      </select>
      <button type="button" data-editor-command="formatBlock" data-editor-value="BLOCKQUOTE" title="引用">“</button>
      <span class="toolbar-divider"></span>
      <button type="button" data-editor-command="bold" title="加粗"><b>B</b></button>
      <button type="button" data-editor-command="underline" title="下划线"><u>U</u></button>
      <button type="button" data-editor-command="italic" title="斜体"><i>I</i></button>
      <select data-editor-color="foreColor" aria-label="文字颜色">
        <option value="#111827">文字色</option>
        <option value="#dc2626">红色</option>
        <option value="#1769d1">蓝色</option>
        <option value="#059669">绿色</option>
      </select>
      <select data-editor-color="hiliteColor" aria-label="背景颜色">
        <option value="#ffffff">背景色</option>
        <option value="#fef3c7">浅黄</option>
        <option value="#dbeafe">浅蓝</option>
        <option value="#dcfce7">浅绿</option>
      </select>
      <select data-editor-command-select="fontSize" aria-label="字号">
        <option value="3">默认字号</option>
        <option value="2">小号</option>
        <option value="4">中号</option>
        <option value="5">大号</option>
      </select>
      <select data-editor-command-select="fontName" aria-label="字体">
        <option value="Microsoft YaHei">默认字体</option>
        <option value="SimSun">宋体</option>
        <option value="SimHei">黑体</option>
        <option value="Arial">Arial</option>
      </select>
      <select data-editor-line-height aria-label="行高">
        <option value="1.75">默认行高</option>
        <option value="1.4">紧凑</option>
        <option value="2">宽松</option>
      </select>
      <span class="toolbar-divider"></span>
      <button type="button" data-editor-command="insertUnorderedList" title="无序列表">列表</button>
      <button type="button" data-editor-command="insertOrderedList" title="有序列表">1.</button>
      <button type="button" data-editor-command="insertHTML" data-editor-value="<ul class=&quot;editor-check-list&quot;><li>待办事项</li></ul>" title="待办列表">待办</button>
      <select data-editor-command-select="justify" aria-label="对齐方式">
        <option value="">对齐</option>
        <option value="justifyLeft">左对齐</option>
        <option value="justifyCenter">居中</option>
        <option value="justifyRight">右对齐</option>
      </select>
      <button type="button" data-editor-command="outdent" title="减少缩进">减少缩进</button>
      <button type="button" data-editor-command="indent" title="增加缩进">增加缩进</button>
      <button type="button" data-editor-command="insertHTML" data-editor-value="<table><tbody><tr><td>条款</td><td>说明</td></tr><tr><td></td><td></td></tr></tbody></table>" title="表格">表格</button>
      <button type="button" data-editor-image title="图片">图片</button>
      <input class="editor-image-input" type="file" accept="image/*" data-editor-image-input aria-label="插入图片">
      <span class="toolbar-divider"></span>
      <button type="button" data-editor-command="undo" title="撤销">撤销</button>
      <button type="button" data-editor-command="redo" title="重做">重做</button>
      <button type="button" data-editor-fullscreen title="全屏">全屏</button>
    </div>
  `;
}

function nextVersion(version) {
  const match = String(version || "V1.0").match(/^V(\d+)\.(\d+)$/);
  if (!match) return "V1.1";
  const major = Number(match[1]);
  const minor = Number(match[2]);
  if (minor < 10) return `V${major}.${minor + 1}`;
  return `V${Math.min(major + 1, 100)}.0`;
}

function nowMinute() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function openAgreementEditor(agreement = null) {
  activeAgreement = agreement;
  const isNew = !agreement;
  const current = agreement || {
    name: "",
    code: `AGR-${Date.now().toString().slice(-6)}`,
    currentVersion: "V1.0",
    terminals: ["学生App端"],
    campuses: ["中国香港/CNHK"],
    content: ""
  };
  const terminalChecked = (terminal) => current.terminals.includes(terminal) ? "checked" : "";
  const currentCampuses = current.campuses && current.campuses.length ? current.campuses : ["中国香港/CNHK"];
  const campusChecked = (campus) => currentCampuses.includes(campus) ? "checked" : "";
  const campusOptions = agreementCampusOptions.map((campus) => (
    `<label><input type="checkbox" data-agreement-campus value="${campus}" ${campusChecked(campus)}> ${campus}</label>`
  )).join("");
  const body = `
    <div class="agreement-editor-grid">
      <div class="field">
        <label for="editAgreementName">协议名称</label>
        <input id="editAgreementName" data-agreement-form="name" type="text" value="${current.name}" placeholder="请输入协议名称">
      </div>
      <div class="field">
        <label for="editAgreementCode">协议编号</label>
        <input id="editAgreementCode" data-agreement-form="code" type="text" value="${current.code}" ${isNew ? "" : "readonly"}>
      </div>
      <div class="field">
        <label for="editAgreementVersion">版本</label>
        <select id="editAgreementVersion" data-agreement-form="currentVersion">${buildVersionOptions(current.currentVersion)}</select>
      </div>
      <fieldset class="terminal-fieldset">
        <legend>适用终端（必选）</legend>
        <label><input type="checkbox" data-agreement-terminal value="学生App端" ${terminalChecked("学生App端")}> 学生App端</label>
        <label><input type="checkbox" data-agreement-terminal value="校园Web端" ${terminalChecked("校园Web端")}> 校园Web端</label>
        <label><input type="checkbox" data-agreement-terminal value="学生启答iPad端" ${terminalChecked("学生启答iPad端")}> 学生启答iPad端</label>
      </fieldset>
      <fieldset class="terminal-fieldset campus-fieldset">
        <legend>适用校区（必选）</legend>
        ${campusOptions}
      </fieldset>
      <div class="rich-editor-wrap">
        <label>协议内容</label>
        ${agreementEditorToolbar()}
        <div class="rich-editor" contenteditable="true" data-agreement-form="content" data-placeholder="请输入协议内容，支持富文本编辑。">${editorContent(current.content)}</div>
      </div>
    </div>
  `;
  const foot = `
    <button class="secondary-btn" type="button" data-close-modal>取消</button>
    <button class="secondary-btn" type="button" data-save-agreement-version>保存</button>
    <button class="primary-btn" type="button" data-publish-agreement>发布</button>
  `;
  openModal(modalShell(isNew ? "新增协议" : "编辑协议", isNew ? "创建草稿协议并配置适用终端与适用校区" : "编辑内容、适用终端与适用校区后可保存为新版本或发布", body, foot, "wide"));
}

function collectAgreementForm() {
  const name = document.querySelector('[data-agreement-form="name"]').value.trim();
  const code = document.querySelector('[data-agreement-form="code"]').value.trim();
  const currentVersion = document.querySelector('[data-agreement-form="currentVersion"]').value;
  const editor = document.querySelector('[data-agreement-form="content"]');
  const content = editor.innerHTML.trim();
  const terminals = [...document.querySelectorAll("[data-agreement-terminal]:checked")].map((input) => input.value);
  const campuses = [...document.querySelectorAll("[data-agreement-campus]:checked")].map((input) => input.value);
  return { name, code, currentVersion, content, terminals, campuses };
}

function upsertAgreement(status) {
  const form = collectAgreementForm();
  if (!form.name || !form.code || !agreementContentHasValue(form.content) || !form.terminals.length || !form.campuses.length) {
    showToast("请完整填写协议名称、编号、内容、适用终端和适用校区");
    return null;
  }
  const now = nowMinute();
  const versionRecord = {
    version: form.currentVersion,
    status,
    operator: "当前管理员",
    updatedAt: now,
    terminals: [...form.terminals],
    campuses: [...form.campuses],
    content: form.content
  };
  if (!activeAgreement) {
    const created = {
      id: Math.max(...agreements.map((item) => item.id)) + 1,
      ...form,
      status,
      createdAt: now,
      updatedAt: now,
      operator: "当前管理员",
      history: [versionRecord]
    };
    agreements.unshift(created);
    activeAgreement = created;
  } else {
    Object.assign(activeAgreement, form, {
      status,
      updatedAt: now,
      operator: "当前管理员"
    });
    activeAgreement.history.unshift(versionRecord);
  }
  if (status === "已发布") {
    activeAgreement.history.forEach((item, index) => {
      item.status = index === 0 ? "已发布" : "已归档";
    });
  }
  applyAgreementFilters();
  return activeAgreement;
}

function saveAgreementVersion() {
  const proceed = window.confirm("是否保存为新版本？");
  if (!proceed) {
    showToast("已取消保存");
    return;
  }
  const versionSelect = document.querySelector('[data-agreement-form="currentVersion"]');
  if (activeAgreement && versionSelect) {
    versionSelect.value = nextVersion(activeAgreement.currentVersion);
  }
  if (upsertAgreement(activeAgreement ? "草稿中" : "草稿中")) {
    closeModal();
    showToast("已保存为新版本草稿");
  }
}

function publishAgreement() {
  const saved = upsertAgreement("已发布");
  if (!saved) return;
  agreements.forEach((item) => {
    if (item.code === saved.code && item.id !== saved.id) item.status = "已归档";
  });
  closeModal();
  showToast("已发布当前版本，其他版本已归档");
}

function archiveAgreement(agreement) {
  if (!agreement) return;
  const body = `
    <div class="agreement-archive-confirm">
      <p>是否确认进行归档？</p>
    </div>
  `;
  const foot = `
    <button class="secondary-btn" type="button" data-close-modal>取消</button>
    <button class="primary-btn" type="button" data-confirm-agreement-archive="${agreement.id}">确认</button>
  `;
  openModal(modalShell("归档确认", `${agreement.name} / ${agreement.currentVersion}`, body, foot, "compact"));
}

function confirmArchiveAgreement(agreement) {
  if (!agreement) return;
  agreement.status = "已归档";
  agreement.updatedAt = nowMinute();
  agreement.operator = "当前管理员";
  agreement.history.unshift({
    version: agreement.currentVersion,
    status: "已归档",
    operator: "当前管理员",
    updatedAt: agreement.updatedAt,
    terminals: [...normalizeAgreementList(agreement.terminals)],
    campuses: [...normalizeAgreementList(agreement.campuses)],
    content: agreement.content
  });
  applyAgreementFilters();
  closeModal();
  showToast("协议已归档");
}

function openAgreementHistory(agreement) {
  if (!agreement) return;
  const rows = agreement.history.map((item, index) => `
    <tr>
      <td>${item.version}</td>
      <td><span class="status ${agreementStatusClass(item.status)}">${item.status}</span></td>
      <td>${agreementListText(item.terminals, agreement.terminals)}</td>
      <td>${agreementListText(item.campuses, agreement.campuses)}</td>
      <td>${item.updatedAt}</td>
      <td>${item.operator}</td>
      <td><button class="link-btn" type="button" data-agreement-version="${agreement.id}" data-version-index="${index}">查看</button></td>
    </tr>
  `).join("");
  const body = `
    <div class="table-wrap history-table">
      <table>
        <thead><tr><th>版本名称</th><th>版本状态</th><th>适用终端</th><th>适用校区</th><th>更新时间</th><th>操作人</th><th>操作</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
  openModal(modalShell("历史版本", agreement.name, body));
}

function openAgreementVersion(agreement, versionRecord) {
  if (!agreement || !versionRecord) return;
  const versionAgreement = {
    ...agreement,
    status: versionRecord.status,
    currentVersion: versionRecord.version,
    updatedAt: versionRecord.updatedAt,
    operator: versionRecord.operator,
    terminals: normalizeAgreementList(versionRecord.terminals, agreement.terminals),
    campuses: normalizeAgreementList(versionRecord.campuses, agreement.campuses),
    content: versionRecord.content || agreement.content
  };
  openModal(modalShell("版本内容", `${agreement.name} / ${versionRecord.version}`, agreementDocumentMarkup(versionAgreement), "", "wide"));
}

function insertAgreementEditorImage(file) {
  if (!file || !file.type.startsWith("image/")) {
    showToast("请选择图片文件");
    return;
  }
  const editor = document.querySelector('[data-agreement-form="content"]');
  if (!editor) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = document.createElement("img");
    img.src = reader.result;
    img.alt = "协议图片";
    editor.appendChild(img);
    const spacer = document.createElement("p");
    spacer.appendChild(document.createElement("br"));
    editor.appendChild(spacer);
    editor.focus();
  };
  reader.readAsDataURL(file);
}

function runEditorCommand(command, value = null) {
  const editor = document.querySelector('[data-agreement-form="content"]');
  if (!editor) return;
  editor.focus();
  if (command === "formatBlock") {
    document.execCommand(command, false, value);
    return;
  }
  document.execCommand(command, false, value);
}

function agreementDocumentMarkup(agreement) {
  return `
    <article class="agreement-doc">
      <div class="agreement-doc-head">
        <span>${agreement.status}</span>
        <h3>${agreement.name}</h3>
        <p>协议编号：${agreement.code} · 当前版本：${agreement.currentVersion}</p>
      </div>
      <section>
        <h4>一、适用范围</h4>
        <p>本协议适用于${agreement.terminals.join("、")}，适用校区为${(agreement.campuses || ["中国香港/CNHK"]).join("、")}，覆盖课程报名、订单确认与学习服务流程。</p>
      </section>
      <section>
        <h4>二、协议确认</h4>
        <p>用户确认订单前，需手动勾选“我已阅读并同意《服务协议》和《售后政策》”。系统会记录学员编号、订单 id、协议名称、同意的协议版本和同意时间戳。</p>
      </section>
      <section>
        <h4>三、协议内容</h4>
        <div class="agreement-content">${editorContent(agreement.content)}</div>
      </section>
      <section>
        <h4>四、版本生效</h4>
        <p>当前发布版本生效后，同一协议的其他版本自动归档；历史同意记录仍保留用户确认时的协议版本。</p>
      </section>
    </article>
  `;
}

function appPolicyDocumentMarkup(policy) {
  return `
    <div class="app-policy-logo">
      <img src="./中文路Logo.png" alt="中文路">
    </div>
    <div class="app-policy-divider"></div>
    <h2>${policy.title}</h2>
    <div class="app-policy-meta">
      <p><strong>版本：</strong>${policy.version}</p>
      <p><strong>最新修訂時間：</strong>${policy.revisedAt}</p>
      <p><strong>生效日期：</strong>${policy.effectiveAt}</p>
    </div>
    <div class="app-policy-content">${policy.body}</div>
  `;
}

function policyDisplayName(policyKey) {
  return policyKey === "afterSale" ? "售后政策" : "服务协议";
}

function findOrderConsent(orderId, policyKey) {
  return consentRecords.find((item) => item.orderId === orderId && item.policyKey === policyKey);
}

function canShowAcceptedAgreements(record) {
  const meta = getOrderListMeta(record);
  return meta.auditStatus === "审核通过"
    && meta.confirmStatus === "已确认"
    && Boolean(findOrderConsent(record.orderId, "service"))
    && Boolean(findOrderConsent(record.orderId, "afterSale"));
}

function acceptedAgreementsMarkup(record) {
  if (!canShowAcceptedAgreements(record)) return "";
  const rows = ["service", "afterSale"].map((policyKey, index) => {
    const consent = findOrderConsent(record.orderId, policyKey);
    return `
      <div class="accepted-agreement-row">
        <span>${index + 1}. 协议名称：<button class="order-agreement-link" type="button" data-order-agreement-policy="${policyKey}" data-order-id="${record.orderId}">${policyDisplayName(policyKey)}</button></span>
        <span>协议版本：<strong>${consent.version}</strong></span>
      </div>
    `;
  }).join("");
  return `
    <div class="accepted-agreements">
      <h5>已同意协议</h5>
      ${rows}
    </div>
  `;
}

function openOrderAgreementDetail(orderId, policyKey) {
  const record = findRecordByOrderId(orderId);
  const consent = findOrderConsent(orderId, policyKey);
  const policy = appPolicyDocs[policyKey] || appPolicyDocs.service;
  if (!record || !consent) {
    showToast("未找到该订单的协议同意记录");
    return;
  }
  const title = policyDisplayName(policyKey);
  const body = `
    <div class="order-agreement-context">
      ${kv([
        ["学生姓名", record.studentName],
        ["学员编号", record.studentId],
        ["订单编号", record.orderId],
        ["协议名称", title],
        ["协议版本", consent.version],
        ["学生同意时间", consent.agreedAt],
        ["协议更新时间", policy.revisedAt]
      ])}
    </div>
    <article class="agreement-reader-card app-policy-reader order-policy-reader">
      ${appPolicyDocumentMarkup({ ...policy, version: consent.version })}
    </article>
  `;
  openModal(modalShell(title, `学生确认订单时同意版本：${consent.version}`, body, "", "wide"));
}

function renderAppPolicyDetail(policyKey = "service") {
  const policy = appPolicyDocs[policyKey] || appPolicyDocs.service;
  activeAppPolicyKey = policyKey in appPolicyDocs ? policyKey : "service";
  const displayTitle = activeAppPolicyKey === "afterSale" ? "售後政策" : "服務協議";
  if (appPolicyTitle) appPolicyTitle.textContent = displayTitle;
  if (appPolicyReader) {
    appPolicyReader.innerHTML = appPolicyDocumentMarkup(policy);
    appPolicyReader.closest(".agreement-app-scroll").scrollTop = 0;
  }
}

function openEnrollmentAgreement(appSheet = false) {
  const servicePolicy = appPolicyDocs.service;
  if (appSheet) {
    const content = `
      <div class="app-agreement-sheet">
        <div class="app-sheet-head">
          <strong>服務協議</strong>
          <button type="button" data-close-modal>×</button>
        </div>
        <article class="agreement-reader-card app-policy-reader">${appPolicyDocumentMarkup(servicePolicy)}</article>
      </div>
    `;
    openModal(content);
    return;
  }
  openModal(modalShell("服务协议", `${servicePolicy.version} / 最新修訂時間：${servicePolicy.revisedAt}`, `<article class="agreement-reader-card app-policy-reader">${appPolicyDocumentMarkup(servicePolicy)}</article>`, "", "wide"));
}

function buildConsentRecords(studentId = "HKC105873", orderId = "ORD20260729001") {
  const agreedAt = nowMinute();
  return ["service", "afterSale"].map((policyKey) => ({
    studentId,
    orderId,
    agreementName: policyDisplayName(policyKey),
    policyKey,
    version: appPolicyDocs[policyKey].version,
    agreedAt
  }));
}

function submitAppOrderConfirm() {
  const checkbox = document.querySelector("[data-app-confirm-agreement-check]");
  if (!checkbox || !checkbox.checked) {
    showToast("请先手动勾选并同意《服务协议》和《售后政策》");
    return;
  }
  const newRecords = buildConsentRecords("HKC109901", "ORD20260730018");
  consentRecords.unshift(...newRecords);
  renderConsentRecords();
  checkbox.checked = false;
  const content = `
    <div class="app-success-dialog app-consent-success">
      <div class="app-sheet-head">
        <strong>订单确认成功</strong>
        <button type="button" data-close-modal>×</button>
      </div>
      <p>已新增协议同意记录</p>
      ${kv([
        ["学员编号", newRecords[0].studentId],
        ["訂單 id", newRecords[0].orderId],
        ["协议名称", newRecords.map((item) => `${item.agreementName} ${item.version}`).join("、")],
        ["同意时间戳", newRecords[0].agreedAt]
      ])}
      <button class="primary-btn" type="button" data-close-modal>完成</button>
    </div>
  `;
  openModal(content);
}

function kv(rows) {
  return `<div class="kv">${rows.map(([key, value]) => `<span>${key}</span><strong>${value || "--"}</strong>`).join("")}</div>`;
}

function orderDetail(record, options = {}) {
  const showStudentStrip = options.showStudentStrip !== false;
  const totalAmount = record.paymentAmount.replace(/[^\d.]/g, "") || "0";
  const productRows = record.products.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>¥ ${(Number(item.lessons) * 88).toFixed(0)}</td>
      <td>${record.paymentAmount}</td>
      <td>${item.lessons}</td>
      <td>${item.giftLessons}</td>
      <td>10</td>
      <td>${record.paymentAmount}</td>
      <td>${item.vouchers}</td>
      <td>通用</td>
    </tr>
  `).join("");
  return `
    <div class="order-detail">
      ${showStudentStrip ? `
      <div class="order-student-strip">
        <span>学生姓名: <strong>${record.studentName}</strong></span>
        <span>学生ID: <strong>${record.studentId}</strong></span>
      </div>` : ""}
      <div class="order-main-grid">
        <div class="order-info-column">
          <div class="order-section">
            <h4>订单</h4>
            <div class="order-grid">
              ${kv([
                ["订单类型", "首销"],
                ["订单归属", "卢衍飞"],
                ["订单来源", "系统下单"],
                ["订单金额", record.paymentAmount],
                ["到账金额", record.refundStatus === "全额退款" ? "HK$0" : record.paymentAmount],
                ["创建时间", record.applyTime],
                ["订单编号", record.orderId]
              ])}
            </div>
          </div>
          <div class="order-section">
            <h4>支付信息</h4>
            <div class="order-grid">
              ${kv([
                ["实付金额", record.paymentAmount],
                ["付款类型", record.payType || "全款"],
                ["支付方式", "线上"],
                ["收款账户", record.paymentChannel],
                ["实际支付时间", record.paymentDate || "--"],
                ["备注", `${record.products[0].lessons}堂课程，赠送${record.products.reduce((sum, item) => sum + item.giftLessons, 0)}课；收据申请来源：客户线上申请。`]
              ])}
            </div>
          </div>
        </div>
        <div class="order-section transfer-section">
          <h4>转账凭证</h4>
          <div class="transfer-proof" aria-label="转账凭证预览">
            <img src="./中文路Logo.png" alt="转账凭证预览">
            <span>${record.paymentChannel}</span>
            <strong>${record.paymentAmount}</strong>
          </div>
        </div>
      </div>
      <div class="order-section">
        <h4>购买产品</h4>
        <div class="order-table-wrap">
          <table>
            <thead><tr><th>产品名称</th><th>人民币标准价</th><th>标准价格</th><th>课次数</th><th>赠送课次</th><th>折扣</th><th>实付价格</th><th>赠送课程券</th><th>课程券类型</th></tr></thead>
            <tbody>${productRows}</tbody>
          </table>
        </div>
        <div class="order-total">
          <span>订单总额：<strong>¥ ${totalAmount}</strong></span>
          <span>已减优惠：<strong>-HK$0</strong></span>
          <span>实付金额：<strong>${record.paymentAmount}</strong></span>
        </div>
        ${acceptedAgreementsMarkup(record)}
      </div>
    </div>
  `;
}

function toTraditionalChannel(channel) {
  return channel
    .replace("转数快", "轉數快")
    .replace("汇丰银行", "匯豐銀行")
    .replace("澳门中银", "澳門中銀")
    .replace("招商银行", "招商銀行");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getProductNames(record) {
  return record.products.map((product) => product.name).join("、");
}

function getReceiptCompanyName(record) {
  const account = String(record.paymentChannel || "").toLowerCase();
  const educationTechAccounts = ["中银", "中銀", "汇丰", "匯豐", "stripe", "payoneer", "blibli", "payme"];
  return educationTechAccounts.some((item) => account.includes(item))
    ? "中文路教育科技（香港）有限公司"
    : "中文路（香港）有限公司";
}

function getReceiptCompanyEmail(record) {
  return getReceiptCompanyName(record) === "中文路教育科技（香港）有限公司"
    ? "receipt@chineserdtech.com.hk"
    : "receipt@chineserd.com.hk";
}

function buildReceiptEmailTemplate(record, recipientEmail) {
  const productNames = getProductNames(record);
  const attachment = buildAppReceiptFileName(record);
  return {
    recipientEmail,
    subject: `【中文路電子收據】您的 ${productNames} 訂單`,
    sender: getReceiptCompanyEmail(record),
    attachment,
    body: [
      `尊敬的 ${record.studentName} 家長/同學，您好：`,
      `感謝您選擇中文路 ${productNames}。`,
      `中文路已為您提交收據申請時對應的訂單 ${record.orderId} 開具電子收據，收據編號為：${record.receiptNo}。`,
      "請查閱本郵件附件（PDF 格式）以獲取完整的電子收據憑證，您也可以在 ChineseRd App「我的訂單」中查看收據。",
      "如您對此收據有任何疑問，請隨時與我們的專屬教務/客服人員聯絡。"
    ].join("\n\n")
  };
}

function parseDateOnly(value) {
  if (!value) return null;
  const normalized = String(value).trim();
  let match = normalized.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    match = normalized.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  }
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function parseReceiptDateFromNo(receiptNo) {
  const match = String(receiptNo || "").match(/-(\d{8})-/);
  if (!match) return null;
  const raw = match[1];
  return parseDateOnly(`${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`);
}

function formatChineseDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}年${month}月${day}日`;
}

function toDateKey(value) {
  const date = parseDateOnly(value);
  if (!date) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function getReceiptIssueDate(record) {
  const applyDate = parseDateOnly(record.applyTime) || new Date();
  const candidates = [
    parseDateOnly(record.reviewTime),
    parseReceiptDateFromNo(record.receiptNo),
    applyDate
  ].filter(Boolean);
  const issueDate = candidates.reduce((latest, current) => current > latest ? current : latest, applyDate);
  return formatChineseDate(issueDate < applyDate ? applyDate : issueDate);
}

function findRecord(id) {
  return records.find((item) => item.id === Number(id));
}

function showToast(message) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2200);
}

function syncStatusSelect(value) {
  if (!statusSelect || !statusLabel) return;
  const label = value || "全部状态";
  statusLabel.textContent = label;
  statusSelect.querySelectorAll("[data-status-option]").forEach((option) => {
    option.classList.toggle("is-selected", option.dataset.statusOption === value);
  });
}

function downloadReceiptPdf(record, fileNameOverride = "") {
  if (!record) return;
  const receipt = document.querySelector(".receipt-doc-paper");
  if (!receipt) return;
  const fileName = fileNameOverride || buildReceiptFileName(record);
  const printWindow = window.open("", "_blank", "width=900,height=1000");
  if (!printWindow) {
    showToast("浏览器阻止了新窗口，请允许弹窗后重试");
    return;
  }
  const baseHref = window.location.href.replace(/[^/]*$/, "");
  printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><base href="${baseHref}"><title>${fileName}</title><link rel="stylesheet" href="./styles.css?v=20260731-2220"><style>body{margin:0;background:#fff}.receipt-doc-paper{box-shadow:none;margin:0 auto}.app-receipt-paper{transform:none;flex:none}@page{size:A4;margin:12mm}</style></head><body>${receipt.outerHTML}</body></html>`);
  printWindow.document.close();
  printWindow.focus();
  window.setTimeout(() => {
    printWindow.print();
  }, 350);
  showToast(`已打开打印窗口，建议文件名：${fileName}`);
}

function sanitizeFileNamePart(value) {
  return String(value || "")
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "") || "NA";
}

function buildReceiptFileName(record) {
  const name = sanitizeFileNamePart(record.studentName);
  const studentId = sanitizeFileNamePart(record.studentId);
  const receiptNo = sanitizeFileNamePart(record.receiptNo || record.orderId);
  return `${name}_${studentId}_${receiptNo}.pdf`;
}

function compactDateFromChinese(value) {
  const date = parseDateOnly(value);
  if (!date) return "00000000";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}${month}${day}`;
}

function buildAppReceiptFileName(record) {
  const name = sanitizeFileNamePart(record.studentName);
  const issueDate = compactDateFromChinese(getReceiptIssueDate(record));
  return `中文路收據_${name}_${issueDate}.pdf`;
}

function exportReceiptList() {
  if (!hasReceiptAuditView) return;
  const rows = visibleRecords;
  const headers = ["学员编号", "订单编号", "付款类型", "学员姓名", "学员校区", "审核状态", "收据编号", "申请时间", "审核通过时间"];
  const tableRows = rows.map((item) => [
    item.studentId,
    item.orderId,
    item.payType || "全款",
    item.studentName,
    item.campus,
    item.status,
    item.receiptNo || "--",
    item.applyTime,
    item.reviewTime || "--"
  ]);
  const htmlRows = [headers, ...tableRows].map((row) => `<tr>${row.map((cell) => `<td>${String(cell).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>`).join("")}</tr>`).join("");
  const workbookHtml = `<!doctype html><html><head><meta charset="utf-8"></head><body><table>${htmlRows}</table></body></html>`;
  const blob = new Blob([workbookHtml], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "收据列表.xlsx";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(`已导出当前筛选范围 ${rows.length} 条记录：收据列表.xlsx`);
}

function runDevAction(action) {
  if (action === "order-list-view") {
    switchView("order-list");
    if (devStatus) devStatus.textContent = "已切换：订单列表页";
    return;
  }
  if (action === "receipt-audit-view") {
    switchView("receipt-audit");
    if (devStatus) devStatus.textContent = "已切换：收据凭证页";
    return;
  }
  if (action === "orders-view") {
    switchView("orders");
    if (devStatus) devStatus.textContent = "已切换：订单审核页";
    return;
  }
  if (action === "agreement-view") {
    switchView("platform-agreement");
    if (devStatus) devStatus.textContent = "已切换：平台协议页";
    return;
  }
  if (action === "student-app-view") {
    switchView("student-app");
    setAppScreen("account");
    if (devStatus) devStatus.textContent = "已切换：学生 App 收据页";
    return;
  }
  if (action === "app-orders-view") {
    switchView("student-app");
    setAppScreen("orders");
    if (devStatus) devStatus.textContent = "已切换：学生 App 我的订单";
    return;
  }
  if (action === "app-order-confirm-view") {
    switchView("student-app");
    setAppScreen("order-confirm");
    if (devStatus) devStatus.textContent = "已切换：学生 App 订单确认";
    return;
  }
  if (action === "app-agreement-view") {
    switchView("student-app");
    setAppScreen("agreement");
    if (devStatus) devStatus.textContent = "已切换：学生 App 平台协议";
    return;
  }
  if (action === "app-agreement-detail") {
    switchView("student-app");
    activeAppPolicyKey = "service";
    activeAppPolicyBackScreen = "agreement";
    setAppScreen("agreement-detail");
    if (devStatus) devStatus.textContent = "已切换：学生 App 服務協議";
    return;
  }
  if (action === "app-after-sale-policy") {
    switchView("student-app");
    activeAppPolicyKey = "afterSale";
    activeAppPolicyBackScreen = "agreement";
    setAppScreen("agreement-detail");
    if (devStatus) devStatus.textContent = "已切换：学生 App 售後政策";
    return;
  }
  if (action === "share-gift-view") {
    switchView("share-gift");
    if (devStatus) devStatus.textContent = "已切换：分享赠课";
    return;
  }
  if (action === "agreement-new") {
    switchView("platform-agreement");
    openAgreementEditor();
    if (devStatus) devStatus.textContent = "已打开：新增协议";
    return;
  }
  if (action === "agreement-edit") {
    switchView("platform-agreement");
    openAgreementEditor(agreements[0]);
    if (devStatus) devStatus.textContent = "已打开：编辑协议";
    return;
  }
  if (action === "agreement-campus") {
    switchView("platform-agreement");
    openAgreementEditor(agreements[0]);
    if (devStatus) devStatus.textContent = "已打开：适用校区多选";
    return;
  }
  if (action === "agreement-campus-filter") {
    switchView("platform-agreement");
    const campusFilter = document.querySelector('[data-agreement-filter="campus"]');
    if (campusFilter) campusFilter.value = "中国香港/CNHK";
    applyAgreementFilters();
    if (devStatus) devStatus.textContent = "已筛选：适用校区 中国香港/CNHK";
    return;
  }
  if (action === "agreement-image") {
    switchView("platform-agreement");
    openAgreementEditor(agreements[0]);
    if (devStatus) devStatus.textContent = "已打开：图片工具";
    return;
  }
  if (action === "agreement-history") {
    switchView("platform-agreement");
    openAgreementHistory(agreements[0]);
    if (devStatus) devStatus.textContent = "已打开：历史版本";
    return;
  }
  if (action === "agreement-history-view") {
    switchView("platform-agreement");
    openAgreementVersion(agreements[0], agreements[0].history[0]);
    if (devStatus) devStatus.textContent = "已打开：历史版本查看";
    return;
  }
  if (action === "agreement-archive") {
    switchView("platform-agreement");
    archiveAgreement(agreements.find((item) => item.status !== "已归档"));
    if (devStatus) devStatus.textContent = "已触发：协议归档";
    return;
  }
  if (action === "enrollment-agreement") {
    openEnrollmentAgreement(Boolean(document.querySelector(".phone-shell")));
    if (devStatus) devStatus.textContent = "已打开：服务协议";
    return;
  }
  if (action === "order-list-agreements") {
    switchView("order-list");
    clearOrderListFilters();
    setOrderListFilter("auditStatus", "审核通过");
    renderOrderList();
    const sample = records.find((item) => canShowAcceptedAgreements(item));
    if (sample) openOrder(sample);
    if (devStatus) devStatus.textContent = "已打开：已同意协议订单详情";
    return;
  }
  const orderActions = {
    "orders-pending": { label: "未审核订单", auditStatus: "未审核" },
    "orders-approved": { label: "已审核订单", auditStatus: "已审核" },
    "orders-rejected": { label: "未通过订单", auditStatus: "未通过" },
    "orders-all": { label: "全部订单", auditStatus: "" },
    "orders-payment-account": { label: "收款账户筛选", auditStatus: "", paymentAccount: "大新转数快" }
  };
  const orderListActions = {
    "order-list-all": { label: "订单列表全部", auditStatus: "" },
    "order-list-receipt": { label: "可查看收据订单", auditStatus: "审核通过" },
    "order-list-installment-plan": { label: "分期还款计划", auditStatus: "审核通过", payType: "分期", openPlan: true }
  };
  if (action in orderListActions) {
    const config = orderListActions[action];
    switchView("order-list");
    clearOrderListFilters();
    setOrderListFilter("auditStatus", config.auditStatus);
    if (config.payType) setOrderListFilter("payType", config.payType);
    renderOrderList();
    if (config.openPlan) {
      const sample = records.find((item) => hasRepaymentPlan(item, getOrderListMeta(item)));
      if (sample) openRepaymentPlan(sample);
    }
    if (devStatus) devStatus.textContent = `已切换：${config.label}`;
    return;
  }
  if (action in orderActions) {
    const config = orderActions[action];
    switchView("orders");
    clearOrderFilters();
    if (Object.prototype.hasOwnProperty.call(config, "auditStatus")) setOrderAuditStatus(config.auditStatus);
    if (config.paymentAccount) setOrderFilter("paymentAccount", config.paymentAccount);
    renderOrders();
    if (devStatus) devStatus.textContent = `已切换：${config.label}`;
    return;
  }
  const shareGiftActions = {
    "share-gift-all": { label: "全部分享赠课", status: "" },
    "share-gift-pending": { label: "待审核分享赠课", status: "待审核" },
    "share-gift-approved": { label: "已赠课记录", status: "已赠课" },
    "share-gift-advisor": { label: "所属顾问筛选", advisor: "黄俊" }
  };
  if (action in shareGiftActions) {
    const config = shareGiftActions[action];
    switchView("share-gift");
    resetShareGiftFilters();
    if (Object.prototype.hasOwnProperty.call(config, "status")) setShareGiftFilter("status", config.status);
    if (config.advisor) setShareGiftFilter("advisor", config.advisor);
    applyShareGiftFilters();
    if (devStatus) devStatus.textContent = `已切换：${config.label}`;
    return;
  }
  const byStatus = { pending: "待审核", approved: "已通过" };
  if (action in byStatus || action === "all") {
    switchView("receipt-audit");
    clearReceiptFilters();
    setFilter("status", byStatus[action] || "");
    applyFilters();
    if (devStatus) devStatus.textContent = `已切换：${byStatus[action] || "全部凭证"}`;
    return;
  }
  const receiptPayTypeActions = {
    "receipt-full-pay": "全款",
    "receipt-installment": "分期"
  };
  if (action in receiptPayTypeActions) {
    switchView("receipt-audit");
    clearReceiptFilters();
    setFilter("payType", receiptPayTypeActions[action]);
    applyFilters();
    if (devStatus) devStatus.textContent = `已切换：${receiptPayTypeActions[action]}凭证`;
    return;
  }
  if (action === "receipt-empty") {
    switchView("receipt-audit");
    clearReceiptFilters();
    setFilter("studentName", "不存在的学生");
    applyFilters();
    if (devStatus) devStatus.textContent = "已进入：收据凭证空状态";
    return;
  }
  if (action === "export-receipts") {
    switchView("receipt-audit");
    exportReceiptList();
    if (devStatus) devStatus.textContent = "已触发：导出收据列表";
    return;
  }
  if (action === "reset-data") {
    records = structuredClone(originalRecords);
    resetFilters();
    resetOrderListFilters();
    resetOrderFilters();
    if (devStatus) devStatus.textContent = "演示数据已重置";
    return;
  }
  if (action === "export-toast") {
    showToast("原型提示：导出操作留给后端实现");
    if (devStatus) devStatus.textContent = "已触发：导出提示";
    return;
  }
  const sample = {
    audit: records.find((item) => item.status === "待审核"),
    "audit-detail": records.find((item) => item.status === "已通过"),
    receipt: records.find((item) => item.status === "已通过"),
    "installment-receipt": records.find((item) => item.status === "已通过" && item.payType === "分期" && item.receiptNo),
    "order-receipt": records.find((item) => item.status === "已通过" && item.receiptNo),
    order: records[0]
  }[action];
  if (action === "audit" && sample) openAudit(sample);
  if (action === "audit-detail" && sample) openAuditDetail(sample);
  if (action === "receipt" && sample) openReceipt(sample);
  if (action === "installment-receipt" && sample) openReceipt(sample);
  if (action === "order-receipt" && sample) openReceipt(sample);
  if (action === "order" && sample) openOrder(sample);
  if (action === "app-apply") {
    setAppScreen("orders");
    openAppReceiptApply();
  }
  if (action === "app-installment-receipt" || action === "app-installment-total") {
    setAppScreen("orders");
    openAppInstallmentReceipt();
  }
  if (action === "app-auto-approved") {
    setAppScreen("orders");
    showToast("客户提交后，系统已自动通过并生成收据凭证");
  }
  if (action === "app-approved") {
    setAppScreen("orders");
    openAppApprovedReceipt();
  }
  if (action === "app-installment-approved") {
    setAppScreen("orders");
    openAppApprovedReceipt(3);
  }
  if (action === "app-email-template") {
    setAppScreen("orders");
    openAppEmailSent(records.find((item) => item.id === 5 && item.receiptNo) || records.find((item) => item.receiptNo), "parent@example.com");
  }
  if (action === "app-receipt-issued-notice") {
    setAppScreen("orders");
    openReceiptIssuedNotice(records.find((item) => item.id === 1 && item.receiptNo) || records.find((item) => item.receiptNo));
  }
  if (action === "app-order-confirm-submit") {
    setAppScreen("order-confirm");
    const checkbox = document.querySelector("[data-app-confirm-agreement-check]");
    if (checkbox) checkbox.checked = true;
    submitAppOrderConfirm();
  }
}

function openAppReceiptApply() {
  const content = `
    <div class="app-confirm-dialog">
      <p>是否為該訂單申請收據？</p>
      <div class="app-confirm-actions">
        <button class="secondary-btn" type="button" data-close-modal>取消</button>
        <button class="primary-btn" type="button" data-submit-app-apply>提交</button>
      </div>
    </div>
  `;
  openModal(content);
}

function buildReceiptIssuedNotice(record) {
  return {
    types: "App 推送、站内消息",
    trigger: "系统判断订单财务审核通过且客户订单已确认后，自动通过客户收据申请并生成电子收据。",
    template: "您提交的訂單「{订单编号}」收据申请已已成功開立，收据编号：{收据编号}，可前往「我的订单」查看电子收据。",
    params: [
      `订单编号：${record.orderId}`,
      `收据编号：${record.receiptNo}`,
      `自动通过时间：${record.reviewTime || record.applyTime}`
    ],
    example: `您提交的訂單「${record.orderId}」收據已成功開立，收據編號：${record.receiptNo}。您可前往「我的訂單」查看電子收據。`
  };
}

function openReceiptIssuedNotice(record) {
  if (!record) return;
  const notice = buildReceiptIssuedNotice(record);
  const content = `
    <div class="app-success-dialog app-notice-preview-dialog">
      <div class="app-sheet-head">
        <strong>收據開立通知</strong>
        <button type="button" data-close-modal>×</button>
      </div>
      <div class="app-email-template-preview">
        <span>通知類型</span>
        <strong>${escapeHtml(notice.types)}</strong>
        <span>觸發條件</span>
        <strong>${escapeHtml(notice.trigger)}</strong>
        <span>參數</span>
        <strong>${escapeHtml(notice.params.join("；"))}</strong>
      </div>
      <p class="app-notice-label">通知模板</p>
      <pre class="app-email-body-preview">${escapeHtml(notice.template)}</pre>
      <p class="app-notice-label">通知例子</p>
      <pre class="app-email-body-preview">${escapeHtml(notice.example)}</pre>
      <div class="app-confirm-actions single">
        <button class="primary-btn" type="button" data-close-modal>知道了</button>
      </div>
    </div>
  `;
  openModal(content);
}

function openAppInstallmentReceipt() {
  const content = `
    <div class="app-confirm-dialog app-installment-receipt-dialog">
      <p>是否確認申請本期收據？</p>
      <div class="app-confirm-actions">
        <button class="secondary-btn" type="button" data-close-modal>取消</button>
        <button class="primary-btn" type="button" data-submit-app-installment-receipt>提交</button>
      </div>
    </div>
  `;
  openModal(content);
}

function openAppReceiptPending() {
  const body = `
    <div class="app-receipt-summary">
      <div class="app-state-box">
        <strong>收据已自动通过</strong>
        <p>您的收据申请已提交，系统已自动通过并生成收据凭证。</p>
      </div>
      ${kv([
        ["订单编号", "ORD20260729001"],
        ["提交时间", "2026-07-29 10:12:36"],
        ["当前状态", "已通过"],
        ["审核人", "中文路后台"]
      ])}
    </div>
  `;
  openModal(modalShell("收据自动通过", "学生 App / 收据凭证", body));
}

function openAppApprovedReceipt(recordId = 5) {
  const record = records.find((item) => item.id === Number(recordId) && item.receiptNo) || records.find((item) => item.status === "已通过" && item.receiptNo);
  if (!record) return;
  const title = record.payType === "分期" ? "查看分期收據" : "查看收據";
  const content = `
    <div class="app-receipt-sheet">
      <div class="app-sheet-head">
        <strong>${title}</strong>
        <button type="button" data-close-modal>×</button>
      </div>
      <div class="app-receipt-thumbnail">
        ${receiptDocumentMarkup(record, "app-receipt-paper")}
      </div>
      <div class="app-receipt-actions">
        <button class="secondary-btn" type="button" data-download-app-pdf="${record.id}">下載收據</button>
        <button class="primary-btn" type="button" data-open-app-email="${record.id}">發送郵箱</button>
      </div>
    </div>
  `;
  openModal(content);
}

function openAppEmailDialog(record) {
  if (!record) return;
  const content = `
    <div class="app-email-dialog">
      <div class="app-sheet-head">
        <strong>發送郵箱</strong>
        <button type="button" data-close-modal>×</button>
      </div>
      <label class="app-email-field">
        <span>接收郵箱</span>
        <input type="email" data-app-email-input placeholder="example@email.com" autocomplete="email">
      </label>
      <p class="app-email-error" data-app-email-error hidden>請輸入有效的郵箱地址</p>
      <div class="app-confirm-actions">
        <button class="secondary-btn" type="button" data-close-modal>取消</button>
        <button class="primary-btn" type="button" data-submit-app-email="${record.id}">確認並提交</button>
      </div>
    </div>
  `;
  openModal(content);
}

function openAppEmailSent(record, recipientEmail) {
  if (!record) return;
  const template = buildReceiptEmailTemplate(record, recipientEmail);
  const content = `
    <div class="app-success-dialog app-email-sent-dialog">
      <div class="app-sheet-head">
        <strong>郵件已提交</strong>
        <button type="button" data-close-modal>×</button>
      </div>
      <p>收據將在10分鐘內發送至您的郵箱，請查收！</p>
      <div class="app-email-template-preview">
        <span>收件郵箱</span>
        <strong>${escapeHtml(template.recipientEmail)}</strong>
        <span>郵件主題</span>
        <strong>${escapeHtml(template.subject)}</strong>
        <span>發送者</span>
        <strong>${escapeHtml(template.sender)}</strong>
        <span>附件</span>
        <strong>${escapeHtml(template.attachment)}</strong>
      </div>
      <pre class="app-email-body-preview">${escapeHtml(template.body)}</pre>
      <div class="app-confirm-actions single">
        <button class="primary-btn" type="button" data-close-modal>知道了</button>
      </div>
    </div>
  `;
  openModal(content);
}

function submitAppEmail(record) {
  if (!record) return;
  const input = document.querySelector("[data-app-email-input]");
  const error = document.querySelector("[data-app-email-error]");
  const email = input ? input.value.trim() : "";
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValid) {
    if (error) error.hidden = false;
    if (input) input.focus();
    return;
  }
  openAppEmailSent(record, email);
}

document.addEventListener("click", (event) => {
  const viewTrigger = event.target.closest("[data-open-view]");
  if (viewTrigger) {
    event.preventDefault();
    switchView(viewTrigger.dataset.openView);
    return;
  }

  const statusTrigger = event.target.closest("[data-status-trigger]");
  if (statusTrigger) {
    statusSelect.classList.toggle("is-open");
    return;
  }

  const statusOption = event.target.closest("[data-status-option]");
  if (statusOption) {
    setFilter("status", statusOption.dataset.statusOption);
    statusSelect.classList.remove("is-open");
    applyFilters();
    return;
  }

  if (statusSelect && !event.target.closest("[data-status-select]")) {
    statusSelect.classList.remove("is-open");
  }

  const actionButtonEl = event.target.closest("[data-action]");
  if (actionButtonEl) {
    const record = findRecord(actionButtonEl.dataset.id);
    const action = actionButtonEl.dataset.action;
    if (action === "audit") openAudit(record);
    if (action === "audit-detail") openAuditDetail(record);
    if (action === "receipt") openReceipt(record);
    if (action === "repayment-plan") openRepaymentPlan(record);
    if (action === "order") openOrder(record);
  }
  const agreementActionEl = event.target.closest("[data-agreement-action]");
  if (agreementActionEl) {
    const agreement = findAgreement(agreementActionEl.dataset.id);
    const action = agreementActionEl.dataset.agreementAction;
    if (action === "edit") openAgreementEditor(agreement);
    if (action === "archive") archiveAgreement(agreement);
    if (action === "history") openAgreementHistory(agreement);
  }
  const archiveConfirmEl = event.target.closest("[data-confirm-agreement-archive]");
  if (archiveConfirmEl) {
    const agreement = findAgreement(archiveConfirmEl.dataset.confirmAgreementArchive);
    confirmArchiveAgreement(agreement);
    return;
  }
  const agreementVersionEl = event.target.closest("[data-agreement-version]");
  if (agreementVersionEl) {
    const agreement = findAgreement(agreementVersionEl.dataset.agreementVersion);
    const versionRecord = agreement ? agreement.history[Number(agreementVersionEl.dataset.versionIndex)] : null;
    openAgreementVersion(agreement, versionRecord);
  }
  const orderAgreementEl = event.target.closest("[data-order-agreement-policy]");
  if (orderAgreementEl) {
    openOrderAgreementDetail(orderAgreementEl.dataset.orderId, orderAgreementEl.dataset.orderAgreementPolicy);
    return;
  }
  const editorCommandEl = event.target.closest("[data-editor-command]");
  if (editorCommandEl) {
    runEditorCommand(editorCommandEl.dataset.editorCommand, editorCommandEl.dataset.editorValue || null);
  }
  if (event.target.matches("[data-editor-image]")) {
    const input = document.querySelector("[data-editor-image-input]");
    if (input) input.click();
  }
  if (event.target.matches("[data-editor-fullscreen]")) {
    modalCard.classList.toggle("is-editor-fullscreen");
  }
  if (event.target.matches("[data-close-modal]") || event.target === modalBackdrop) closeModal();
  if (event.target.matches("[data-submit-audit]")) submitAudit(event.target.dataset.submitAudit);
  if (event.target.matches("[data-agreement-new]")) openAgreementEditor();
  if (event.target.matches("[data-save-agreement-version]")) saveAgreementVersion();
  if (event.target.matches("[data-publish-agreement]")) publishAgreement();
  if (event.target.matches("[data-agreement-search]")) applyAgreementFilters();
  if (event.target.matches("[data-agreement-reset]")) resetAgreementFilters();
  if (event.target.matches("[data-open-enrollment-agreement]")) openEnrollmentAgreement(false);
  if (event.target.matches("[data-submit-app-order-confirm]")) submitAppOrderConfirm();
  if (event.target.matches("[data-download-pdf]")) downloadReceiptPdf(findRecord(event.target.dataset.downloadPdf));
  if (event.target.matches("[data-download-app-pdf]")) {
    const record = findRecord(event.target.dataset.downloadAppPdf);
    downloadReceiptPdf(record, record ? buildAppReceiptFileName(record) : "");
  }
  if (event.target.matches("[data-open-app-email]")) openAppEmailDialog(findRecord(event.target.dataset.openAppEmail));
  if (event.target.matches("[data-submit-app-email]")) submitAppEmail(findRecord(event.target.dataset.submitAppEmail));
  if (event.target.matches("[data-submit-app-apply]")) {
    closeModal();
    showToast("收据申请已提交，系统已自动通过，可查看收据");
  }
  if (event.target.matches("[data-submit-app-installment-receipt]")) {
    closeModal();
    const applyButton = document.querySelector("[data-installment-apply-button]");
    if (applyButton) {
      applyButton.textContent = "查看分期收據";
      applyButton.dataset.appReceiptAction = "installment-approved";
      applyButton.dataset.recordId = "2";
    }
    showToast("分期收據申請已提交，系統已自動通過，可查看分期收據");
  }
  const appNav = event.target.closest("[data-app-nav]");
  if (appNav) {
    setAppScreen(appNav.dataset.appNav);
    return;
  }
  if (event.target.closest("[data-app-policy-back]")) {
    setAppScreen(activeAppPolicyBackScreen);
    return;
  }
  const appPolicyLink = event.target.closest("[data-app-policy-link]");
  if (appPolicyLink) {
    event.preventDefault();
    activeAppPolicyKey = appPolicyLink.dataset.appPolicyLink;
    activeAppPolicyBackScreen = "order-confirm";
    setAppScreen("agreement-detail");
    return;
  }
  const appPolicy = event.target.closest("[data-app-policy]");
  if (appPolicy) {
    activeAppPolicyKey = appPolicy.dataset.appPolicy;
    activeAppPolicyBackScreen = "agreement";
    setAppScreen("agreement-detail");
    return;
  }
  const appReceiptAction = event.target.closest("[data-app-receipt-action]");
  if (appReceiptAction) {
    const action = appReceiptAction.dataset.appReceiptAction;
    if (action === "apply") openAppReceiptApply();
    if (action === "installment-apply" || action === "installment-total") openAppInstallmentReceipt();
    if (action === "installment-approved") openAppApprovedReceipt(appReceiptAction.dataset.recordId || 2);
    if (action === "pending") openAppReceiptPending();
    if (action === "approved") openAppApprovedReceipt();
    if (action === "blocked") showToast("该订单不符合申请前提：仅购买产品订单可申请收据");
  }
  if (event.target.matches("[data-search]")) applyFilters();
  if (event.target.matches("[data-reset]")) resetFilters();
  if (event.target.matches("[data-order-search]")) applyOrderFilters();
  if (event.target.matches("[data-order-reset]")) resetOrderFilters();
  if (event.target.matches("[data-order-list-search]")) applyOrderListFilters();
  if (event.target.matches("[data-order-list-reset]")) resetOrderListFilters();
  if (event.target.matches("[data-share-gift-search]")) applyShareGiftFilters();
  if (event.target.matches("[data-share-gift-reset]")) resetShareGiftFilters();
  const shareGiftAction = event.target.closest("[data-share-gift-action]");
  if (shareGiftAction) {
    const record = shareGiftRecords.find((item) => item.id === Number(shareGiftAction.dataset.shareGiftAction));
    if (record) showToast(record.status === "待审核" ? "已打开分享赠课审核" : "已打开分享赠课记录");
  }
  const orderAuditTab = event.target.closest("[data-order-audit-tab]");
  if (orderAuditTab) {
    document.querySelector('[data-order-filter="auditStatus"]').value = orderAuditTab.dataset.orderAuditTab;
    document.querySelectorAll("[data-order-audit-tab]").forEach((tab) => {
      tab.classList.toggle("is-active", tab === orderAuditTab);
    });
    renderOrders();
  }
  if (event.target.matches("[data-export]")) showToast("原型提示：导出操作留给后端实现");
  if (event.target.matches("[data-export-receipts]")) exportReceiptList();
  const statusShortcut = event.target.closest("[data-status-shortcut]");
  if (statusShortcut) {
    setFilter("status", statusShortcut.dataset.statusShortcut);
    applyFilters();
  }
  if (event.target.matches("[data-dev-toggle]")) devPanel.classList.toggle("is-open");
  if (event.target.matches("[data-dev-close]")) devPanel.classList.remove("is-open");
  const devAction = event.target.closest("[data-dev-action]");
  if (devAction) runDevAction(devAction.dataset.devAction);
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-editor-block]")) {
    runEditorCommand("formatBlock", event.target.value);
  }
  if (event.target.matches("[data-editor-color]")) {
    runEditorCommand(event.target.dataset.editorColor, event.target.value);
  }
  if (event.target.matches("[data-editor-command-select]")) {
    if (event.target.dataset.editorCommandSelect === "justify") {
      if (event.target.value) runEditorCommand(event.target.value);
      event.target.value = "";
      return;
    }
    runEditorCommand(event.target.dataset.editorCommandSelect, event.target.value);
  }
  if (event.target.matches("[data-editor-line-height]")) {
    const editor = document.querySelector('[data-agreement-form="content"]');
    if (editor) editor.style.lineHeight = event.target.value;
  }
  if (event.target.matches("[data-editor-image-input]")) {
    insertAgreementEditorImage(event.target.files && event.target.files[0]);
    event.target.value = "";
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("#auditComment")) {
    const counter = document.querySelector("[data-comment-count]");
    if (counter) counter.textContent = event.target.value.length;
  }
});

if (hasReceiptAuditView) {
  applyFilters();
  switchView("receipt-audit");
} else {
  switchView("student-app");
  setAppScreen("account");
}
