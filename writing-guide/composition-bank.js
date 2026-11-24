/*
 * 作文題庫只保留後台入口。
 * 题目数据由 composition-bank-data.js 提供，发布任务的题目选择抽屉由 writing-publish.js 使用。
 * 独立题库列表、题目新增、编辑和详情暂不接通，避免在本项目内形成第二套题库页面。
 */
(function(){
  window.compositionBankReady = true;
})();
