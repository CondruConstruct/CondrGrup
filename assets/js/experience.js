(() => {
 'use strict';
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const {services,text}=window.CondrCatalog;
 const lang=document.documentElement.lang;
 const t=text[lang],root=document.documentElement.dataset.root||'';
 const page=s=>`${root}${lang==='ro'?'':lang+'/'}${s}`;
 const header=document.querySelector('.ex-header');
 const menu=document.getElementById('ex-menu');
 const quote=document.getElementById('quote-dialog');
 const menuToggle=document.querySelector('.ex-menu-toggle');
 const language=document.querySelector('.ex-language');
 let quoteTrigger=null;
 const closeLanguage=()=>language?.removeAttribute('open');
 const syncDialogState=()=>document.documentElement.classList.toggle('ex-dialog-open',menu.open||quote.open);
 menuToggle.addEventListener('click',()=>{closeLanguage();menu.showModal();menuToggle.setAttribute('aria-expanded','true');syncDialogState();});
 menu.addEventListener('close',()=>{menuToggle.setAttribute('aria-expanded','false');syncDialogState();if(!quote.open)menuToggle.focus();});
 document.addEventListener('click',event=>{
   const closer=event.target.closest('[data-close-dialog]');if(closer)closer.closest('dialog').close();
   const trigger=event.target.closest('[data-quote-service]');if(!trigger)return;
   quoteTrigger=trigger;closeLanguage();if(menu.open)menu.close();
   const select=quote.querySelector('[name="Lucrare"]');select.value=trigger.dataset.quoteService||'';
   quote.querySelector('.form-status').textContent='';
   quote.showModal();syncDialogState();(select.value?quote.querySelector('[name="Nume"]'):select).focus();
   window.CondrGrup?.trackConversion('quote_open',{service:select.value||'unspecified'});
 });
 quote.addEventListener('close',()=>{syncDialogState();if(quoteTrigger?.isConnected&&quoteTrigger.checkVisibility()&&!quoteTrigger.closest('[inert],dialog:not([open])'))quoteTrigger.focus();else document.querySelector('.ex-menu-toggle').focus();});
 [quote,menu].forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}}));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&language?.open){closeLanguage();language.querySelector('summary').focus();}});
 document.addEventListener('click',event=>{if(!event.target.closest('.ex-language'))closeLanguage();});
 document.addEventListener('focusin',event=>{if(language?.open&&!language.contains(event.target))closeLanguage();});
 const serviceBar=document.querySelector('.ex-service-bar');
 if(serviceBar)new ResizeObserver(()=>{document.documentElement.style.scrollPaddingTop=`${header.offsetHeight+serviceBar.offsetHeight+16}px`;}).observe(serviceBar);
 const photoHero=document.querySelector('.ex-hero.has-photos,.ex-service-hero.has-photos');
 const updateHeader=()=>{
   const scrolled=scrollY>30;
   const bounds=photoHero?.getBoundingClientRect();
   const overPhoto=!!bounds&&bounds.top<=header.offsetHeight/2&&bounds.bottom>header.offsetHeight;
   header.classList.toggle('is-scrolled',scrolled);
   header.classList.toggle('on-dark',overPhoto&&!scrolled&&!photoHero.classList.contains('is-construction-active'));
 };
 if(photoHero)new MutationObserver(updateHeader).observe(photoHero,{attributes:true,attributeFilter:['class']});
 updateHeader();addEventListener('scroll',updateHeader,{passive:true});addEventListener('resize',updateHeader);
 document.querySelectorAll('.ex-catalog-section').forEach(section=>{
   const track=section.querySelector('.ex-catalog'),prev=section.querySelector('[data-catalog-prev]'),next=section.querySelector('[data-catalog-next]');
   const update=()=>{prev.disabled=track.scrollLeft<2;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-3;};
   const move=sign=>track.scrollBy({left:sign*(track.firstElementChild.getBoundingClientRect().width+24),behavior:reduce.matches?'instant':'smooth'});
   prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));track.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(track);update();
 });
 // Vastavit-inspired layered entrances, with an immediately available primary action.
 const hero=document.querySelector('.ex-hero');
 if(hero){
   const slides=[...hero.querySelectorAll('.ex-slide')],dots=[...hero.querySelectorAll('[data-hero-dot]')],pause=hero.querySelector('[data-hero-pause]');
   let current=0,timer,paused=reduce.matches,onscreen=true,focused=false,hovered=false;
   const stop=()=>{clearTimeout(timer);timer=null;};
   const schedule=()=>{stop();if(!paused&&!focused&&!hovered&&onscreen&&!document.hidden&&!reduce.matches)timer=setTimeout(()=>go(current+1,false),current===0?10000:7000);};
   const go=(index,manual=true)=>{
     current=(index+slides.length)%slides.length;
     slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===current);slide.inert=i!==current;slide.setAttribute('aria-hidden',String(i!==current));});
     dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));
     if(manual){paused=true;updatePause();}schedule();
   };
   const updatePause=()=>{hero.classList.toggle('is-motion-paused',paused);pause.textContent=paused?'▷':'Ⅱ';pause.setAttribute('aria-label',paused?pause.dataset.playLabel:pause.dataset.pauseLabel);};
   hero.querySelector('[data-hero-prev]').addEventListener('click',()=>go(current-1));hero.querySelector('[data-hero-next]').addEventListener('click',()=>go(current+1));dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
   pause.addEventListener('click',()=>{paused=!paused;updatePause();schedule();});
   hero.addEventListener('focusin',()=>{focused=true;stop();});hero.addEventListener('focusout',()=>{setTimeout(()=>{focused=hero.contains(document.activeElement);schedule();},0);});
   hero.addEventListener('pointerenter',()=>{hovered=true;stop();});hero.addEventListener('pointerleave',()=>{hovered=false;schedule();});
   hero.addEventListener('keydown',event=>{if(event.target.closest('button,a'))return;if(event.key==='ArrowRight')go(current+1);if(event.key==='ArrowLeft')go(current-1);});
   new IntersectionObserver(entries=>{onscreen=entries[0].isIntersecting;schedule();},{threshold:.2}).observe(hero);
   document.addEventListener('visibilitychange',schedule);reduce.addEventListener('change',()=>{paused=reduce.matches;updatePause();schedule();});updatePause();schedule();
 }
 // Direct /contact/?service= links keep the chosen category across pages.
 const service=new URLSearchParams(location.search).get('service');
 if(service)document.querySelectorAll('main select[name="Lucrare"]').forEach(select=>{if(services.some(s=>s.id===service))select.value=service;});
})();
