(() => {
 const stage=document.querySelector('.poster-carousel'),cards=Array.from(document.querySelectorAll('.poster-thumb-btn'));
 const dots=document.getElementById('posterDots');cards.forEach((card,i)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`第 ${i+1} 張海報`);dot.addEventListener('click',()=>card.click());dots.appendChild(dot);});
 let pointer=null,lastWheel=0;
 const index=()=>Math.max(0,cards.findIndex(c=>c.classList.contains('selected')));
 function update(){const i=index();stage.querySelector('.poster-prev img').src=cards[(i-1+cards.length)%cards.length].dataset.poster;stage.querySelector('.poster-next img').src=cards[(i+1)%cards.length].dataset.poster;document.getElementById('posterPosition').textContent=`${i+1} / ${cards.length}`;cards.forEach((c,j)=>c.setAttribute('aria-pressed',String(j===i)));Array.from(dots.children).forEach((dot,j)=>dot.setAttribute("aria-current",String(j===i)));const row=document.getElementById('posterRow'),current=cards[i];row.scrollTo({left:current.offsetLeft-row.offsetLeft-(row.clientWidth-current.clientWidth)/2,behavior:'smooth'});}
 function move(step){stage.style.setProperty('--poster-shift',step>0?'14px':'-14px');stage.classList.remove('poster-changing');cards[(index()+step+cards.length)%cards.length].click();requestAnimationFrame(()=>stage.classList.add('poster-changing'));}
 stage.querySelector('.poster-prev').addEventListener('click',()=>move(-1));stage.querySelector('.poster-next').addEventListener('click',()=>move(1));
 stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;pointer={id:e.pointerId,x:e.clientX,y:e.clientY};});
 stage.addEventListener('pointerup',e=>{if(!pointer||pointer.id!==e.pointerId)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;pointer=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){e.preventDefault();move(dx<0?1:-1);suppressClick=true;setTimeout(()=>suppressClick=false,0);}});
 let suppressClick=false;stage.addEventListener('click',e=>{if(suppressClick){e.stopImmediatePropagation();e.preventDefault()}},true);stage.addEventListener('pointercancel',()=>pointer=null);
 stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
 stage.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)&&Math.abs(e.deltaX)>8){e.preventDefault();if(Date.now()-lastWheel>350){move(e.deltaX>0?1:-1);lastWheel=Date.now()}}},{passive:false});
 window.addEventListener('poster-selection',update);update();
})();