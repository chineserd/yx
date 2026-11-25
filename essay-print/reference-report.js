// 附件《小鹿1-无愧的选择-作文報告.pdf》的原稿頁與評語內容，用於「僅供原型查看」入口。
// 附件沒有班級、學號及等級配置；班級 2A、學號 880001 取自用戶提供的資料截圖，等級 4 用於展示組合。
const referenceReport={
 student:'小鹿1',title:'無愧的選擇',className:'2A',studentNumber:'880001',total:38,grade:scoreGrade(3.8),level:'4',typoScore:3,
 overall:'文章以雨中登西山為主要內容，能營造克服阻礙、登高澄心的氛圍，但原文在關鍵處中止，未交代面對哪些選項、為何作出決定，也沒有完成「無愧」的反思，因而與題旨的連繫薄弱。語言有一定描寫意識，惟若干詞語搭配和句意不夠準確；篇章亦因結尾殘缺而欠完整。最需要改善的是補足選擇的矛盾、決斷及其價值依據，使登山經歷真正回應題目。',
 dimensions:[
  {label:'內容',score:10,max:40,comment:'文章集中描寫登山途中樓梯漫長、山路濕滑、風勢強烈等困難，並寫到心境由「文字」和「旁言」困擾，轉為澄明、逍遙，具備由外在攀登帶出內在轉變的構想。然而，「純粹是為了一個『想』字」只略示登山動機，沒有清楚呈現可供取捨的選項，也未具體說明所承受的壓力、選擇堅持登山的原因，以及事後何以問心無愧。末段更停在對文筆和立意的自評，未完成事件與主旨。宜補寫選擇前的兩難、作出決定的關鍵時刻、所付代價及登頂後的反思，建立「選擇」與「無愧」的因果關係。'},
  {label:'表達',score:15,max:30,comment:'文章能運用景物描寫和比喻表現登山的艱難，例如把漫長樓梯寫成「第一道牆」，又以風聲沖淡外界言語，嘗試把自然景象與心理變化結合；「越來越小、越來越靜」的反覆也有節奏感。不過，部分表達含混或搭配不當，如「得西山」、「西山險勢環生」、「兩旁的增強」均難以確定所指；「普通的馬……能到達千里馬的路程」的比喻亦不夠準確。部分句子反覆使用「不過」、「直到」，令語意推進略顯單調。宜選用意思明確的動詞和名詞，檢查比喻的邏輯，並以長短句交替及不同連接方式提升流暢度。'},
  {label:'結構',score:5,max:20,comment:'開首直接進入登山過程，繼而寫視野開闊和心境澄明，基本上有由山下向山頂、由受阻到振作的推進。第二段承接外在風景轉入內在感受，方向尚算清楚。然而，文章缺少選擇情境的前置交代，登山過程的關鍵轉折也未充分展開；第三段突然轉向與讀者談論文筆，且句子未完便中止，破壞敘事連貫和首尾完整性。可按「困境與選項—猶豫和決斷—登山考驗—心境轉變—無愧反思」重新安排，並以結尾回扣開首的「想」及題旨。'},
  {label:'標點字體',score:5,max:10,comment:'整體表現優秀，字體和標點均符合規範，無需扣分。'}
 ],
 strengths:['能以樓梯、濕滑山路和強風等景物呈現登山阻力。','嘗試把登山歷程與心境由紛擾轉為澄明的變化結合。','部分反覆句式具有節奏感，能加強情緒遞進。'],
 suggestions:['在開首明確交代兩個或以上的選項，例如因外界否定而放棄，或仍按內心意願登山，突出真正的抉擇。','詳寫作出決定時的心理掙扎、價值依據和所承受的代價，避免只敘述登山經過。','補寫完整結尾，說明即使過程艱難或結果未必完美，為何仍對自己的選擇無愧。','刪去或改寫突然評論自身文筆的段落，使結尾回到事件、心境和題旨。','逐句檢查含混詞語及比喻邏輯，將「得西山」、「險勢環生」、「兩旁的增強」等改為語意清楚、符合語境的表達。']
};
function makeReferenceReport(){
 const r=referenceReport;
 const manuscript=[1,2].map(i=>`<article class="report-sheet reference-manuscript-sheet" aria-label="${esc(r.student)}作文原稿第${i}頁"><img src="./assets/reference-essay-page-${i}.png" alt="${esc(r.student)}《${esc(r.title)}》作文原稿及旁批第${i}頁"><div class="reference-header-mask"><header class="score-print-heading"><h1>作文原稿與批註</h1><p><span>姓名：${esc(r.student)}</span><span>班級：${esc(r.className)}</span><span>學號：${esc(r.studentNumber)}</span><span class="report-topic">題目：${esc(r.title)}</span></p></header></div></article>`).join('');
 const head=page=>`<header class="score-print-heading"><h1>作文評語匯總</h1><p><span>姓名：${esc(r.student)}</span><span>班級：${esc(r.className)}</span><span>學號：${esc(r.studentNumber)}</span><span class="report-topic">題目：${esc(r.title)}</span></p></header>`;
 const score=`<article class="report-sheet score-report-sheet reference-score-sheet" aria-label="${esc(r.student)}作文評語匯總第3頁">${head(3)}<section class="score-print-overall"><div class="score-print-total"><span class="score-print-total-line">總分：<strong>${r.total}</strong><small>/100</small></span>${(reportDisplayMode==='all'||reportDisplayMode==='grade')?`<b class="score-print-grade">品第：${esc(r.grade)}</b>`:''}${(reportDisplayMode==='all'||reportDisplayMode==='level')?`<b class="score-print-level">等級：${esc(r.level)}</b>`:''}</div><h2>總評</h2><p>${esc(r.overall)}</p></section><section class="score-print-dimensions"><h2>各維度評語</h2>${r.dimensions.map(d=>`<section class="score-print-dimension"><h3><span>${esc(d.label)}</span><span>${d.score}<small> / ${d.max}</small></span></h3><p>${esc(d.comment)}</p></section>`).join('')}<section class="score-print-dimension"><h3><span>錯別字</span><span>${r.typoScore}<small> / 3</small></span></h3></section></section><section class="score-print-insights"><h2>整體優點</h2><ul>${r.strengths.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section><footer class="score-print-footer">第 3 / 4 頁</footer></article>`;
 const final=`<article class="report-sheet score-report-sheet reference-score-sheet" aria-label="${esc(r.student)}作文評語匯總第4頁">${head(4)}<section class="score-print-insights"><h2>整體改善建議</h2><ol>${r.suggestions.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></section><footer class="score-print-footer">第 4 / 4 頁</footer></article>`;
 return manuscript+score+final;
}
