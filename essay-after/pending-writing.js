/* Pending writing tasks shown before the writing guide. Titles reuse current prototype fixtures. */
(() => {
 const fixtureTopics=writingSubmissions.filter(row=>row.studentId===previewStudentId).slice(0,2);
 window.pendingWritingTasks=fixtureTopics.map((row,index)=>({
  id:`P${String(index+1).padStart(3,'0')}`,
  topic:row.topic,
  genre:row.genre,
  keywords:row.keywords,
  thesis:row.thesis,
  publishedAt:index===0?'2026-10-28 09:00':'2026-10-27 15:30',
  activity:'guidance',
  status:'pending'
 }));
 function renderPendingWriting(){
  if(!location.hash.startsWith('#/student-pending'))return;
  const rows=window.pendingWritingTasks;
  const text=escapeWritingText,root=document.getElementById('pendingWritingApp');
  const match=location.hash.match(/^#\/student-pending\/task\/([^/]+)/);
  const task=match?rows.find(row=>row.id===decodeURIComponent(match[1].split('?')[0])):null;
  if(task){
   // 歷史深鏈保留相容，但統一轉入本項目內的寫前指導頁，不再嵌入外部頁面。
   const surface=window.studentSurface==='web'?'?surface=web':'';
   location.hash=`#/student-improved/task/${encodeURIComponent(task.id)}/start-preview${surface}`;
   return;
  }
  const surface=window.studentSurface==='web'?'?surface=web':'';
  root.innerHTML=`<header class="practice-header"><a href="${window.studentSurface==='web'?'#/student':'#/student-learning'}" aria-label="返回自主學習">‹ <span>返回</span></a><h1>待寫作文</h1></header><div class="practice-content"><div class="practice-list-heading"><span>共 ${rows.length} 篇待寫作文</span><span>按發佈時間由新到舊排列</span></div>${rows.length?`<div class="practice-list">${rows.map((row,index)=>`<a class="practice-record pending-writing-row" href="#/student-improved/task/${encodeURIComponent(row.id)}/start-preview${surface}"><h2>${text(row.topic)}</h2><div class="pending-row-meta"><span class="pending-writing-status">${index===0?'待提交':'待開始'}</span><time>${text(formatWritingTime(row.publishedAt))}</time></div><span class="practice-chevron" aria-hidden="true">›</span></a>`).join('')}</div><p class="practice-end">已顯示全部待寫作文</p>`:`<section class="practice-empty"><h2>暫無待寫作文</h2><p>有新的寫作題目時，會顯示在這裏。</p></section>`}</div>`;
 }
 window.addEventListener('previewview',event=>{if(event.detail==='student-pending')renderPendingWriting();});
})();
