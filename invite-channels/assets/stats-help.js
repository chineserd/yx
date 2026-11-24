(()=>{
const content={
period:{title:"当期已获赠课数",body:`<p class="stats-help-intro">根据筛选时间，显示对应时间区间内实际赠出的堂数。</p><p>以实际赠课时间为准，包含开始日与结束日；切换当周、当月或自定义日期后，点击“查询”应用筛选。</p>`},
summary:{title:'汇总统计说明',body:`<p class="stats-help-intro">区分历史累计与当期获赠，避免将两个数值重复相加。</p><dl>
<dt>剩余赠课数</dt><dd>全部学员仍可通过分享获得的课次数；按已购产品的赠课额度扣除已获赠和已过期未获赠的部分计算。</dd>
<dt>累计已获赠堂数</dt><dd>全部学员历史实际已赠堂数累加，跨月不归零，不随下方筛选变化。</dd>
<dt>当期已获赠课数</dt><dd>按实际赠课时间，统计筛选区间内实际赠出的课次数；随查询条件联动，不等于分享次数。</dd>
<dt>已过期赠课数</dt><dd>产品过期后未获得的赠课次数，不计入已获赠堂数。</dd>
<dt>可获赠课总数</dt><dd>全部学员已购产品的赠课上限累加。</dd></dl><p class="stats-help-note">除当期已获赠课数外，顶部额度汇总不随下方筛选变化；列表仅展示筛选后的学员，列表合计不一定等于全体学员汇总。</p>`},
list:{title:'列表统计说明',body:`<p class="stats-help-intro">每行对应一位学员；点击“查询”应用筛选条件。</p><dl>
<dt>累计与当期</dt><dd>累计已获赠堂数为该学员历史所有实际已赠堂数，不因日期筛选改变；当期已获赠课数只统计所选区间内实际赠出的课次数。累计已包含当期，两者不可相加。</dd>
<dt>统计时间</dt><dd>默认当周（周一至周日），可切换当月或自定义起止日期；按北京时间统计，包含开始日与结束日。</dd>
<dt>当月分享状态</dt><dd>默认未分享，可选全部、已分享、未分享。此条件判断当月是否分享，与“统计时间”选择的赠课统计区间分别生效。</dd>
<dt>其他筛选</dt><dd>可结合学员姓名、编号、所属学管、所属顾问及剩余赠课数查询；“剩余赠课数 &gt;”表示严格大于输入值。</dd>
<dt>额度与月份</dt><dd>剩余、累计已获赠、已过期及可获赠总数均为该学员对应额度；最近分享月份展示最近一次分享所属月份，无记录显示“--”。</dd>
<dt>导出</dt><dd>导出当前筛选结果，包含所有结果页。</dd></dl>`}
};
const dialog=document.createElement('dialog');dialog.className='stats-help-dialog';dialog.setAttribute('aria-labelledby','statsHelpTitle');document.body.append(dialog);
document.querySelectorAll('[data-stats-help]').forEach(button=>button.addEventListener('click',()=>{const item=content[button.dataset.statsHelp];dialog.innerHTML=`<header><h2 id="statsHelpTitle">${item.title}</h2><button type="button" aria-label="关闭统计说明">×</button></header><div class="stats-help-body">${item.body}</div>`;dialog.querySelector('header button').addEventListener('click',()=>dialog.close());dialog.showModal();}));
})();
