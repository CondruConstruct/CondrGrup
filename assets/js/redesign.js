(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealItems = document.querySelectorAll('.cg-reveal');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      reveal.unobserve(entry.target);
    }), { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    document.documentElement.classList.add('motion-ready');
    revealItems.forEach(item => reveal.observe(item));
    reduced.addEventListener('change', () => {
      if (reduced.matches) {
        document.documentElement.classList.remove('motion-ready');
        reveal.disconnect();
      }
    });
  }

  document.querySelectorAll('.cg-flip-button').forEach(button => {
    button.addEventListener('click', () => {
      const flipped = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(flipped));
      button.setAttribute('aria-label', `${flipped ? button.dataset.backLabel : button.dataset.flipLabel}: ${button.dataset.projectName}`);
      button.classList.toggle('is-flipped', flipped);
      button.querySelector('.cg-flip-front').setAttribute('aria-hidden', String(flipped));
      button.querySelector('.cg-flip-back').setAttribute('aria-hidden', String(!flipped));
    });
  });

  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.mobile-menu');
  const toggle = document.querySelector('.menu-toggle');
  // Keep keyboard navigation inside the mobile menu while it is open.
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (document.body.classList.contains('menu-open')) { toggle.click(); toggle.focus(); }
      document.querySelector('.language.open button')?.click();
      document.querySelector('.quick-contact.open .quick-toggle')?.click();
    }
    if (event.key !== 'Tab' || !document.body.classList.contains('menu-open')) return;
    const targets = [toggle, ...menu.querySelectorAll('a[href]')].filter(el => el.getClientRects().length);
    const first = targets[0], last = targets[targets.length - 1];
    if (event.shiftKey && (document.activeElement === first || !targets.includes(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  const progress = document.createElement('div');
  progress.className = 'cg-scroll-progress'; progress.setAttribute('aria-hidden', 'true');
  header?.append(progress);
  let queued = false;
  const updateProgress = () => {
    queued = false;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? Math.min(1, window.scrollY / range) : 0})`;
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  updateProgress();

  const canvas = document.querySelector('[data-project-map]');
  if (!canvas) return;
  const dataElement = document.getElementById('cg-project-data');
  if (!dataElement) return;
  const data = JSON.parse(dataElement.textContent);
  const section = canvas.closest('.cg-map-section');
  const buttons = [...section.querySelectorAll('[data-project-select]')];
  const status = canvas.querySelector('.cg-map-status');
  let map, markers = {}, initialized = false;
  const escape = text => String(text).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
  const select = (id, fly = true) => {
    buttons.forEach(button => {
      const active = button.dataset.projectSelect === id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    section.querySelectorAll('[data-project-detail]').forEach(detail => { detail.hidden = detail.dataset.projectDetail !== id; });
    Object.entries(markers).forEach(([key, marker]) => marker.getElement()?.classList.toggle('selected', key === id));
    const project = data.projects.find(project => project.id === id);
    if (map && project) {
      if (fly) map.setView(project.coordinates, 14, { animate: !reduced.matches });
      markers[id].openPopup();
    }
  };
  const showAll = () => {
    if (map) { map.stop(); map.closePopup(); map.fitBounds(data.projects.map(p => p.coordinates), { padding: [38,38], animate: false }); }
    buttons.forEach(button => { button.classList.remove('active'); button.setAttribute('aria-pressed','false'); });
    section.querySelectorAll('[data-project-detail]').forEach(detail => { detail.hidden = true; });
    Object.values(markers).forEach(marker => marker.getElement()?.classList.remove('selected'));
  };
  const initialize = () => {
    if (initialized) return;
    initialized = true;
    if (!window.L) { status.textContent = data.labels.error; return; }
    map = L.map(canvas, { scrollWheelZoom: false, zoomControl: true, attributionControl: true, dragging: !L.Browser.mobile, tap: false });
    status.remove();
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 10, maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'
    }).addTo(map);
    let loaded = false, failed = 0;
    tiles.on('tileload', () => { loaded = true; canvas.querySelector('.cg-tile-error')?.remove(); });
    tiles.on('tileerror', () => {
      failed += 1;
      if (loaded || failed < 3 || canvas.querySelector('.cg-tile-error')) return;
      const notice = document.createElement('p'); notice.className = 'cg-tile-error'; notice.setAttribute('role','status'); notice.textContent = data.labels.error; canvas.append(notice);
    });
    data.projects.forEach(project => {
      const marker = L.marker(project.coordinates, {
        icon: L.divIcon({ className: 'cg-map-pin', html: `<span>${project.number}</span>`, iconSize: [40,48], iconAnchor: [20,44], popupAnchor: [0,-38] }),
        title: project.title, alt: project.title, keyboard: true, riseOnHover: true
      }).addTo(map);
      marker.bindPopup(`<div class="cg-popup"><strong>${escape(project.title)}</strong><p>${escape(project.address)}</p><p>${escape(project.scope)}</p><a href="${escape(project.href)}">${escape(data.labels.details)} ↗</a><a href="https://www.google.com/maps/search/?api=1&query=${project.coordinates.join(',')}" target="_blank" rel="noopener">${escape(data.labels.directions)} ↗</a></div>`, { maxWidth: 270, autoPanPadding: [25,25] });
      marker.on('click', () => select(project.id, false));
      markers[project.id] = marker;
    });
    showAll();
    if ('ResizeObserver' in window) new ResizeObserver(() => map.invalidateSize()).observe(canvas);
    const id = window.location.hash.replace('#harta-', '');
    if (data.projects.some(p => p.id === id)) select(id);
  };
  buttons.forEach(button => button.addEventListener('click', () => { initialize(); select(button.dataset.projectSelect); }));
  section.querySelector('.cg-map-reset').addEventListener('click', () => { initialize(); showAll(); });
  const applyHash = () => {
    if (!location.hash.startsWith('#harta-')) return;
    const id = location.hash.slice(7);
    if (!data.projects.some(p => p.id === id)) return;
    section.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' });
    initialize(); select(id);
  };
  window.addEventListener('hashchange', applyHash);
  if (location.hash.startsWith('#harta-')) applyHash();
  else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { if(entries.some(e => e.isIntersecting)) { initialize(); observer.disconnect(); } }, { rootMargin: '300px' });
    observer.observe(canvas);
  } else initialize();
})();
