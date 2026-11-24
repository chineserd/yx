const state={metric:'task-score',period:'month',scope:'class',scenario:'within'};
const names=['梓軒','嘉欣','子朗','张晓敏','曉晴','浩然','穎彤','芷晴','卓賢','樂彤'];
const scores=[1752,1642,1402,1216,1086,929,771,613,456,312];
const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
function value(i){const factor=({week:.24,month:1,term:3.6})[state.period]*(state.metric==='task-score'?1:.83);return Math.round((scores[i]??Math.max(20,300-(i-9)*12))*factor)+(state.scope==='grade'?200:0)}
function avatar(i){return `<div class="rank-avatar ${i===0?'orange':i===1?'blue':i===2?'coral':'purple'} avatar-${i%10+1}" aria-hidden="true"></div>`}
function render(){
const outside=state.scenario==='outside';
const mineIndex=outside?11:3;
const mineName=outside?'陈嘉怡':names[3];
const limit=state.scope==='class'?10:30;

$$('[data-scenario]').forEach(e=>{const active=e.dataset.scenario===state.scenario;e.setAttribute('aria-selected',active);e.tabIndex=active?0:-1});
$('#ranking-panel').setAttribute('aria-labelledby',`${state.scenario}-tab`);
$('.task-my-rank').hidden=false;
$('.task-my-rank').classList.toggle('outside-card',outside);
$('[data-practice-my-rank]').hidden=outside;
$('[data-my-nickname]').textContent=mineName;
$('[data-practice-my-trend]').hidden=outside;

$('.practice-rank-page').classList.toggle('metric-practice-score',state.metric==='practice-score');
$$('[data-practice-metric]').forEach(e=>{const active=e.dataset.practiceMetric===state.metric;e.classList.toggle('active',active);e.setAttribute('aria-pressed',active)});
$$('[data-practice-period]').forEach(e=>{const active=e.dataset.practicePeriod===state.period;e.classList.toggle('active',active);e.setAttribute('aria-pressed',active)});
$('[data-practice-scope-label]').textContent=state.scope==='class'?'班級':'年級';
$$('[data-practice-scope-option]').forEach(e=>{const active=e.dataset.practiceScopeOption===state.scope;e.classList.toggle('active',active);e.setAttribute('aria-checked',active)});
$('[data-practice-my-rank]').textContent=mineIndex+1;$('[data-practice-my-value]').textContent=value(mineIndex);
$('[data-practice-my-trend]').innerHTML=`<span class="rank-change up">↑ 上升 1 名</span><b>距離上一名還差 ${value(mineIndex-1)-value(mineIndex)} 分！繼續加油！</b>`;
$('[data-practice-rank-list]').innerHTML=Array.from({length:limit},(_,i)=>{
const up=i===mineIndex||i%2===0;
return `<article class="task-rank-row ${i===mineIndex?'is-me':''}"><b class="rank-position ${i<3?'medal medal-'+(i+1):''}" aria-label="第${i+1}名"><span>${i+1}</span></b>${avatar(i===mineIndex?3:i)}<strong class="rank-name">${i===mineIndex?mineName:names[i]||['宇軒','詠晴','家朗','心怡','俊熙'][i%5]}</strong><div class="rank-result"><div><em>${value(i)}</em><span class="score-unit">分</span></div><small class="rank-change ${up?'up':'down'}">${up?'↑ 上升':'↓ 下降'} 1 名</small></div></article>`;
}).join('');
$('[data-practice-rank-list]').scrollTop=0;
}
$$('[data-scenario]').forEach(e=>{e.onclick=()=>{state.scenario=e.dataset.scenario;close();render()};e.onkeydown=event=>{if(['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();const items=[...$$('[data-scenario]')];const next=event.key==='Home'?items[0]:event.key==='End'?items[1]:items.find(item=>item!==e);next.click();next.focus()}}});
$$('[data-practice-metric]').forEach(e=>e.onclick=()=>{state.metric=e.dataset.practiceMetric;render()});
$$('[data-practice-period]').forEach(e=>e.onclick=()=>{state.period=e.dataset.practicePeriod;render()});
const menu=$('[data-practice-scope-dropdown]'),toggle=$('[data-practice-scope-toggle]');
function close(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')}
toggle.onclick=()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',open)};
$$('[data-practice-scope-option]').forEach(e=>e.onclick=()=>{state.scope=e.dataset.practiceScopeOption;close();render();toggle.focus()});
document.addEventListener('click',e=>{if(!menu.contains(e.target))close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();toggle.focus()}});
$('#back').onclick=()=>{location.href='../../index.html'};render();
