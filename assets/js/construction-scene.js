/* Original Condr Grup vector illustration. No external artwork or animation library. */
(() => {
  'use strict';
  const hero = document.querySelector('.ex-hero');
  const slide = hero?.querySelector('.ex-slide:first-child');
  if (!slide || slide.querySelector('.construction-scene')) return;
  const language = document.documentElement.lang;
  const description = {
    ro: 'Ilustrație conceptuală animată: fundație, structură și anvelopa unei clădiri.',
    en: 'Animated conceptual illustration: a building foundation, structure and envelope.',
    ru: 'Анимированная концептуальная иллюстрация: фундамент, каркас и оболочка здания.'
  }[language] || 'Construction illustration';
  // An axonometric study rather than a measured project or construction drawing.
  const project = (x, y, z = 0) => [650 + (x-y)*43, 330 + (x+y)*18-z*39];
  const point = p => project(...p).map(n => Number(n.toFixed(2))).join(',');
  const polygon = (points, cls, extra = '') => `<polygon class="${cls}" points="${points.map(point).join(' ')}" ${extra}/>`;
  const line = (a, b, cls, extra = '') => `<line class="${cls}" x1="${project(...a)[0]}" y1="${project(...a)[1]}" x2="${project(...b)[0]}" y2="${project(...b)[1]}" ${extra}/>`;
  const prism = (x, y, z, w, d, h, cls) => `<g class="${cls}">${polygon([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],'cs-top')}${polygon([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]],'cs-front')}${polygon([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],'cs-side')}</g>`;
  let ground = '', floor = '', columns = '', beams = '', envelope = '', roof = '', details = '';
  for (let x = -2; x <= 12; x++) ground += line([x,-2,-.22],[x,8,-.22],'cs-ground-line');
  for (let y = -2; y <= 8; y++) ground += line([-2,y,-.22],[12,y,-.22],'cs-ground-line');
  floor += prism(-.3,-.3,-.22,10.6,6.6,.25,'cs-slab');
  for (let x = 1; x < 10; x++) floor += line([x,0,.035],[x,6,.035],'cs-floor-line');
  for (let y = 1; y < 6; y++) floor += line([0,y,.035],[10,y,.035],'cs-floor-line');
  // Thin structural members keep the visual architectural, not toy-like.
  for (const x of [0,3.3,6.6,10]) {
    for (const y of [0,6]) {
      const order = x/3.3 + (y === 6 ? 1 : 0);
      columns += `<g class="cs-member" style="--member-delay:${(1.05 + order*.12).toFixed(2)}s">${prism(x-.09,y-.09,0,.18,.18,3.55,'cs-column')}${polygon([[x-.25,y-.25,.03],[x+.25,y-.25,.03],[x+.25,y+.25,.03],[x-.25,y+.25,.03]],'cs-baseplate')}</g>`;
    }
  }
  for (const x of [0,3.3,6.6,10]) beams += prism(x-.1,-.14,3.48,.2,6.28,.25,'cs-beam');
  for (const y of [0,6]) beams += prism(-.12,y-.11,3.47,10.24,.22,.3,'cs-beam');
  // Back wall and left return; the right bay remains open to reveal the structure.
  envelope += polygon([[0,0,.06],[6.6,0,.06],[6.6,0,3.46],[0,0,3.46]],'cs-wall-back');
  envelope += polygon([[0,0,.06],[0,6,.06],[0,6,3.46],[0,0,3.46]],'cs-wall-return');
  for (let x=.55; x<6.6; x+=.55) envelope += line([x,0,.08],[x,0,3.43],'cs-panel-seam');
  for (let y=.6; y<6; y+=.6) envelope += line([0,y,.08],[0,y,3.43],'cs-panel-seam');
  // Glazed front, with a recessed entrance and three restrained blue reflections.
  for (let x=.16; x<6.3; x+=1.08) {
    const z = x > 4.4 ? .08 : .56;
    details += polygon([[x,6,z],[x+.96,6,z],[x+.96,6,3.34],[x,6,3.34]],'cs-glass');
    details += line([x,6,z],[x,6,3.34],'cs-window-line');
    if (x < 4.4) details += line([x+.12,6,2.1],[x+.68,6,2.88],'cs-reflection');
  }
  details += line([.15,6,.5],[6.35,6,.5],'cs-window-line');
  details += line([4.57,6,1.45],[4.57,6,1.9],'cs-door-handle');
  details += line([6.68,6,.12],[9.94,6,3.38],'cs-brace');
  details += line([9.94,0,.12],[9.94,5.9,3.38],'cs-brace');
  // A half-complete roof preserves a useful view into the structural frame.
  roof += prism(-.23,-.24,3.78,6.93,6.48,.10,'cs-roof');
  for (let x=.3; x<6.6; x+=.6) roof += line([x,-.18,3.89],[x,6.18,3.89],'cs-roof-seam');
  for (const y of [1.5,3,4.5]) roof += prism(6.7,y,3.73,3.45,.09,.1,'cs-purlin');
  // Subtle site edge and a short approach tie the building to a real ground plane.
  const approach = polygon([[3.9,6.35,-.18],[5.9,6.35,-.18],[5.9,8,-.18],[3.9,8,-.18]],'cs-approach');
  const root = document.createElement('div');
  root.className = 'construction-scene';
  root.innerHTML = `<div class="cs-ambient" aria-hidden="true"></div><svg class="cs-drawing" viewBox="195 145 1030 590" role="img" aria-label="${description}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cs-glass-gradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e6eef8"/><stop offset="1" stop-color="#b9cce7"/></linearGradient><filter id="cs-shadow" x="-35%" y="-50%" width="180%" height="230%"><feGaussianBlur stdDeviation="12"/></filter></defs><g class="cs-ground">${ground}</g><ellipse class="cs-shadow" cx="725" cy="538" rx="280" ry="67" filter="url(#cs-shadow)"/><g class="cs-stage cs-foundation">${approach}${floor}</g><g class="cs-stage cs-envelope-back">${envelope}</g><g class="cs-column-group">${columns}</g><g class="cs-stage cs-beams">${beams}</g><g class="cs-stage cs-glazing">${details}</g><g class="cs-stage cs-roof-group">${roof}</g><g class="cs-finish-lines">${line([-.3,6.38,.02],[10.3,6.38,.02],'cs-accent-edge')}${line([10.38,-.3,.02],[10.38,6.38,.02],'cs-accent-edge')}</g></svg><div class="cs-stage-key" aria-hidden="true"><span></span><span></span><span></span><span></span></div>`;
  const media = slide.querySelector('.ex-media,.ex-placeholder');
  if (media) media.replaceWith(root); else slide.prepend(root);
  slide.classList.add('has-construction-scene');
  const sync = () => hero.classList.toggle('is-construction-active', slide.classList.contains('is-active'));
  sync();
  new MutationObserver(sync).observe(slide, { attributes: true, attributeFilter: ['class'] });
})();
