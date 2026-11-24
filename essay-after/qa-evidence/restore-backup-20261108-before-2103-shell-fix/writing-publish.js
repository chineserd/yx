(function(){
 const page=document.getElementById('writingPublishPage');
 if(!page)return;
 const status=document.getElementById('writingPublishStatus');
 const topicDialog=document.getElementById('writingTopicDialog');
 const topicList=document.getElementById('writingTopicList');
 const topicSearch=document.getElementById('writingTopicSearch');
 const topicPicker=document.getElementById('writingPublishTopicPicker');
 const topicConfirm=document.getElementById('writingTopicConfirm');
 const topicSelectionStatus=document.getElementById('writingTopicSelectionStatus');
 const topicData=Array.isArray(window.compositionBankTopics)?window.compositionBankTopics:[];
 let topicLibrary='all';
 let selectedTopic=null;
 const topicFilters={
  form:document.getElementById('writingTopicFormFilter'),
  genre:document.getElementById('writingTopicGenreFilter'),
  category:document.getElementById('writingTopicCategoryFilter')
 };
 const addFilterOptions=(select,key)=>{
  if(!select)return;
  [...new Set(topicData.map(topic=>topic[key]).filter(Boolean))].forEach(value=>{
   const option=document.createElement('option');
   option.value=value;option.textContent=value;select.appendChild(option);
  });
 };
 addFilterOptions(topicFilters.form,'questionForm');
 addFilterOptions(topicFilters.genre,'writingGenre');
 addFilterOptions(topicFilters.category,'category');
 const renderTopicList=()=>{
  if(!topicList)return;
  const keyword=(topicSearch?.value||'').trim().toLowerCase();
  const rows=topicData.filter(topic=>{
   const inLibrary=topicLibrary==='all'||topic.library===topicLibrary;
   const inKeyword=!keyword||[topic.title,topic.requirement,topic.questionForm,topic.writingGenre,topic.category].join(' ').toLowerCase().includes(keyword);
   const inForm=!topicFilters.form?.value||topic.questionForm===topicFilters.form.value;
   const inGenre=!topicFilters.genre?.value||topic.writingGenre===topicFilters.genre.value;
   const inCategory=!topicFilters.category?.value||topic.category===topicFilters.category.value;
   return inLibrary&&inKeyword&&inForm&&inGenre&&inCategory;
  });
  topicList.innerHTML='';
  if(!rows.length){
   topicList.innerHTML='<div class="writing-topic-empty">沒有符合條件的作文題目</div>';
   return;
  }
  rows.forEach(topic=>{
   const button=document.createElement('button');
   button.type='button';
   button.className='writing-topic-row'+(selectedTopic?.id===topic.id?' is-selected':'');
   button.dataset.topicId=topic.id;
   button.innerHTML='<span class="writing-topic-row-main"><strong></strong><small></small></span><span class="writing-topic-row-meta"></span>';
   button.querySelector('strong').textContent=topic.title;
   button.querySelector('small').textContent=topic.requirement;
   button.querySelector('.writing-topic-row-meta').textContent=[topic.questionForm,topic.writingGenre,topic.library].filter(Boolean).join(' · ');
   button.addEventListener('click',()=>{
    selectedTopic=topic;
    topicSelectionStatus.textContent=`已選擇：${topic.title}`;
    renderTopicList();
   });
   topicList.appendChild(button);
  });
 };
 const openTopicDialog=()=>{
  if(!topicDialog)return;
  const current=document.getElementById('writingPublishTopic')?.value.trim();
  selectedTopic=topicData.find(topic=>topic.title===current)||null;
  topicSelectionStatus.textContent=selectedTopic?`已選擇：${selectedTopic.title}`:'尚未選擇題目';
  topicDialog.hidden=false;
  renderTopicList();
  topicSearch?.focus();
 };
 const closeTopicDialog=()=>{if(topicDialog)topicDialog.hidden=true;};
 topicPicker?.addEventListener('click',openTopicDialog);
 topicDialog?.querySelectorAll('[data-topic-dialog-close]').forEach(button=>button.addEventListener('click',closeTopicDialog));
 topicDialog?.querySelectorAll('[data-topic-library]').forEach(button=>button.addEventListener('click',()=>{
  topicLibrary=button.dataset.topicLibrary||'all';
  topicDialog.querySelectorAll('[data-topic-library]').forEach(item=>item.classList.toggle('is-active',item===button));
  renderTopicList();
 }));
 topicSearch?.addEventListener('input',renderTopicList);
 Object.values(topicFilters).forEach(select=>select?.addEventListener('change',renderTopicList));
 topicConfirm?.addEventListener('click',()=>{
  if(!selectedTopic){topicSelectionStatus.textContent='請先選擇一個作文題目。';return;}
  const topicInput=document.getElementById('writingPublishTopic');
  if(topicInput)topicInput.value=selectedTopic.requirement;
  const requirementInput=document.getElementById('writingPublishRequirement');
  if(requirementInput)requirementInput.value=`① 以「${selectedTopic.title}」為核心完成文章，清楚表達你的觀點。\n② 結合題目要求選擇合適材料，組織文章結構。\n③ 字數要求：${document.getElementById('writingPublishWords')?.value||'800字以上'}。`;
  closeTopicDialog();
 });
 const classes=page.querySelectorAll('[data-class]');
 classes.forEach(button=>button.addEventListener('click',()=>{
  button.classList.toggle('is-selected');
  const marker=button.querySelector('span');
  marker.textContent=button.classList.contains('is-selected')?'✓':'';
 }));
 page.querySelectorAll('input[name="writingUploadMethod"]').forEach(input=>input.addEventListener('change',()=>{
  page.querySelectorAll('.writing-upload-option').forEach(option=>option.classList.toggle('is-selected',option.contains(input)&&input.checked));
 }));
 const switchButton=document.getElementById('writingPublishResultsSwitch');
 switchButton?.addEventListener('click',()=>{
  const on=switchButton.classList.toggle('is-on');
  switchButton.setAttribute('aria-checked',String(on));
 });
 document.getElementById('writingPublishConfirm')?.addEventListener('click',()=>{
  const topic=document.getElementById('writingPublishTopic')?.value.trim();
  const selected=page.querySelectorAll('.writing-class-list .is-selected').length;
  const start=document.getElementById('writingPublishStart')?.value;
  const end=document.getElementById('writingPublishEnd')?.value;
  if(!topic){status.textContent='請先填寫作文題目。';status.className='writing-publish-status is-error';return;}
  if(!selected){status.textContent='請至少選擇一個發送班級。';status.className='writing-publish-status is-error';return;}
  if(start&&end&&start>end){status.textContent='截止時間不能早於發布時間。';status.className='writing-publish-status is-error';return;}
  const guidanceEnabled=page.querySelector('input[name="writingCapabilityGuidance"]')?.checked;
  const selectedClassNames=[...page.querySelectorAll('.writing-class-list .is-selected')].map(button=>button.dataset.class||button.textContent.replace('✓','').trim());
  const total=30;
  const task={id:`T${Date.now()}`,type:'essay',title:topic,className:selectedClassNames.join('、'),grade:document.getElementById('writingPublishGrade')?.value||'未設定',total,submit:`0 / ${total}`,guidanceEnabled:!!guidanceEnabled,guidance:guidanceEnabled?`0 / ${total}`:'未开始',average:'—',highest:'—',grading:'0 / 0',passRate:'—',start,end,createdAt:new Date().toISOString()};
  window.dispatchEvent(new CustomEvent('writing-task-created',{detail:task}));
  status.innerHTML=(guidanceEnabled?'任务已发布，学生可在待写列表中开始写作指导。':'任务已发布，学生可在待写列表中提交作文。')+' <a href="#/backend/tasks">查看任务列表</a>';
  status.className='writing-publish-status is-success';
  document.getElementById('writingPublishConfirm').textContent='任务已发布';
 });
})();
