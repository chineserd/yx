(()=>{
const content={
summary:{title:'汇总统计说明',body:`<p class="stats-help-intro">汇总统计区分历史累计、当期获赠和当前额度。</p><dl>
<dt>剩余赠课数</dt><dd>全部学员当前仍可通过分享获得的课次数。<strong>公式：剩余赠课数 = 可获赠课总数 − 累计已获赠堂数 − 已过期赠课数。</strong></dd>
<dt>累计已获赠堂数</dt><dd>全部学员历次实际到账赠堂数之和，跨月累计，包含当期已获赠数量，不随下方筛选变化。</dd>
<dt>当期已获赠课数</dt><dd>当前学生在筛选统计时间内实际已获赠课数累计，按实际赠课日期统计，包含开始日和结束日；随日期及学员筛选联动，不等于分享次数。</dd>
<dt>已过期赠课数</dt><dd>已购产品到期时尚未领取、已失效的赠课额度之和，不计入累计已获赠堂数。</dd>
<dt>可获赠课总数</dt><dd>全部学员各已购产品的赠课上限之和。<strong>额度关系：可获赠课总数 = 剩余赠课数 + 累计已获赠堂数 + 已过期赠课数。</strong></dd></dl><p class="stats-help-note">除当期已获赠课数外，顶部额度汇总不随下方筛选变化；列表仅展示筛选后的学员。</p>`},
list:{title:'列表统计说明',body:`<dl>
<dt>剩余赠课数</dt><dd>该学员当前仍可获赠的课次数。<strong>公式：剩余赠课数 = 可获赠课总数 − 累计已获赠堂数 − 已过期赠课数。</strong></dd>
<dt>累计已获赠堂数</dt><dd>该学员历次实际到账赠堂数之和，跨月累计，包含当期已获赠数量，不随日期筛选变化。</dd>
<dt>当期已获赠课数</dt><dd>当前学生在筛选统计时间内实际已获赠课数累计，按实际赠课日期合计，包含开始日和结束日。</dd>
<dt>最近分享月份</dt><dd>该学员最近一次分享所在的年月。</dd>
<dt>已过期赠课数</dt><dd>该学员已购产品到期时，尚未领取并已失效的赠课堂数之和。</dd>
<dt>可获赠课总数</dt><dd>该学员各已购产品的赠课上限之和，包含剩余、已获赠和已过期的额度。<strong>公式：可获赠课总数 = 剩余赠课数 + 累计已获赠堂数 + 已过期赠课数。</strong></dd></dl>`}
};
const dialog=document.createElement('dialog');dialog.className='stats-help-dialog';dialog.setAttribute('aria-labelledby','statsHelpTitle');document.body.append(dialog);
document.querySelectorAll('[data-stats-help]').forEach(button=>button.addEventListener('click',()=>{const item=content[button.dataset.statsHelp];dialog.innerHTML=`<header><h2 id="statsHelpTitle">${item.title}</h2><button type="button" aria-label="关闭统计说明">×</button></header><div class="stats-help-body">${item.body}</div>`;dialog.querySelector('header button').addEventListener('click',()=>dialog.close());dialog.showModal();}));
})();
