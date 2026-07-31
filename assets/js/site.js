(() => {
  'use strict';

  const root = document.documentElement.dataset.root || '';
  const locale = ['ro', 'ru', 'en'].includes(document.documentElement.lang)
    ? document.documentElement.lang
    : 'ro';
  const currentPage = document.body.dataset.page || 'home';
  const FEATURES = Object.freeze({
    buildStory: false
  });

  const copy = {
    ro: {
      skip: 'Sari la conținut',
      home: 'Acasă',
      services: 'Servicii',
      projects: 'Proiecte',
      about: 'Despre noi',
      reviews: 'Recenzii',
      contact: 'Contact',
      navLabel: 'Navigare principală',
      mobileNavLabel: 'Navigare mobilă',
      openMenu: 'Deschide meniul',
      closeMenu: 'Închide meniul',
      quote: 'Solicită ofertă',
      work: 'Lucrările noastre',
      workTitle: 'De la fundație<br>până la predare.',
      workCopy: 'Execuție pentru proiecte rezidențiale, comerciale și industriale.',
      allServices: 'Toate serviciile',
      serviceLinks: [
        ['Beton și platforme', 'servicii/beton-platforme.html'],
        ['Drumuri și amenajări', 'servicii/drumuri-amenajari.html'],
        ['Fundații și structuri', 'servicii/fundatii-structuri.html'],
        ['Case la cheie', 'servicii/case-la-cheie.html'],
        ['Renovări', 'servicii/renovari.html'],
        ['Demolări', 'servicii/demolari.html']
      ],
      footerPromise: 'Construim sigur.<br>Construim pentru timp.',
      navigation: 'NAVIGARE',
      b2bLinks: 'Colaborări B2B',
      company: 'COMPANIE',
      address: 'Alexandru cel Bun 17A<br>Vatra, Republica Moldova',
      privacy: 'Confidențialitate',
      requestQuote: 'Solicită o ofertă',
      rights: 'TOATE DREPTURILE REZERVATE',
      top: 'SUS',
      quickLabel: 'Contact rapid',
      quickQuestion: 'Ai nevoie de o ofertă?',
      viber: 'Scrie pe Viber',
      call: 'Sună acum',
      emailUs: 'Scrie pe e-mail',
      social: 'REȚELE SOCIALE',
      socialSoon: 'link în curând',
      sending: 'Se trimite...',
      sent: 'Mulțumim. Mesajul a fost expediat.',
      toast: 'Mesajul a fost trimis către Condr Grup.',
      sendError: 'Nu am putut trimite automat. Scrie-ne la',
      formSubject: 'Mesaj nou de pe CondrGrup',
      buildLabel: 'Construcție animată',
      buildTeam: 'ECHIPA CONDR · ÎN LUCRU',
      buildCollapse: 'Restrânge animația',
      buildCta: 'Clădirea e gata. Sună',
      buildMessages: ['Trasăm fundația...', 'Ridicăm structura...', 'Montăm nivelurile...', 'Închidem clădirea...', 'Finisăm detaliile...', 'Construcția este gata.'],
      buildComplete: 'Construcția este gata. A ta poate începe azi.'
    },
    en: {
      skip: 'Skip to content',
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      about: 'About us',
      reviews: 'Reviews',
      contact: 'Contact',
      navLabel: 'Main navigation',
      mobileNavLabel: 'Mobile navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      quote: 'Request a quote',
      work: 'Our work',
      workTitle: 'From foundation<br>to handover.',
      workCopy: 'Construction services for residential, commercial and industrial projects.',
      allServices: 'All services',
      serviceLinks: [
        ['Concrete and platforms', 'servicii/beton-platforme.html'],
        ['Roads and landscaping', 'servicii/drumuri-amenajari.html'],
        ['Foundations and structures', 'servicii/fundatii-structuri.html'],
        ['Turnkey houses', 'servicii/case-la-cheie.html'],
        ['Renovations', 'servicii/renovari.html'],
        ['Demolition', 'servicii/demolari.html']
      ],
      footerPromise: 'We build safely.<br>We build to last.',
      navigation: 'NAVIGATION',
      b2bLinks: 'B2B partnerships',
      company: 'COMPANY',
      address: '17A Alexandru cel Bun Street<br>Vatra, Republic of Moldova',
      privacy: 'Privacy',
      requestQuote: 'Request a quote',
      rights: 'ALL RIGHTS RESERVED',
      top: 'TOP',
      quickLabel: 'Quick contact',
      quickQuestion: 'Need a quote?',
      viber: 'Message us on Viber',
      call: 'Call now',
      emailUs: 'Send an email',
      social: 'SOCIAL MEDIA',
      socialSoon: 'link coming soon',
      sending: 'Sending...',
      sent: 'Thank you. Your message has been sent.',
      toast: 'Your message was sent to Condr Grup.',
      sendError: 'Automatic sending failed. Email us at',
      formSubject: 'New message from CondrGrup',
      buildLabel: 'Animated construction',
      buildTeam: 'CONDR TEAM · AT WORK',
      buildCollapse: 'Collapse animation',
      buildCta: 'The building is ready. Call',
      buildMessages: ['Setting out the foundation...', 'Raising the structure...', 'Building the levels...', 'Closing the building...', 'Finishing the details...', 'Construction is complete.'],
      buildComplete: 'Construction is complete. Yours can start today.'
    },
    ru: {
      skip: 'Перейти к содержанию',
      home: 'Главная',
      services: 'Услуги',
      projects: 'Проекты',
      about: 'О нас',
      reviews: 'Отзывы',
      contact: 'Контакты',
      navLabel: 'Главная навигация',
      mobileNavLabel: 'Мобильная навигация',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      quote: 'Запросить смету',
      work: 'Наши работы',
      workTitle: 'От фундамента<br>до сдачи.',
      workCopy: 'Строительные работы для жилых, коммерческих и промышленных проектов.',
      allServices: 'Все услуги',
      serviceLinks: [
        ['Бетон и площадки', 'servicii/beton-platforme.html'],
        ['Дороги и благоустройство', 'servicii/drumuri-amenajari.html'],
        ['Фундаменты и конструкции', 'servicii/fundatii-structuri.html'],
        ['Дома под ключ', 'servicii/case-la-cheie.html'],
        ['Ремонт', 'servicii/renovari.html'],
        ['Демонтаж', 'servicii/demolari.html']
      ],
      footerPromise: 'Строим надёжно.<br>Строим на годы.',
      navigation: 'НАВИГАЦИЯ',
      b2bLinks: 'Сотрудничество B2B',
      company: 'КОМПАНИЯ',
      address: 'ул. Александру чел Бун, 17A<br>Ватра, Республика Молдова',
      privacy: 'Конфиденциальность',
      requestQuote: 'Запросить смету',
      rights: 'ВСЕ ПРАВА ЗАЩИЩЕНЫ',
      top: 'НАВЕРХ',
      quickLabel: 'Быстрая связь',
      quickQuestion: 'Нужна смета?',
      viber: 'Написать в Viber',
      call: 'Позвонить',
      emailUs: 'Написать на e-mail',
      social: 'СОЦИАЛЬНЫЕ СЕТИ',
      socialSoon: 'ссылка скоро',
      sending: 'Отправка...',
      sent: 'Спасибо. Ваше сообщение отправлено.',
      toast: 'Сообщение отправлено в Condr Grup.',
      sendError: 'Не удалось отправить автоматически. Напишите нам:',
      formSubject: 'Новое сообщение с сайта CondrGrup',
      buildLabel: 'Анимация строительства',
      buildTeam: 'КОМАНДА CONDR · В РАБОТЕ',
      buildCollapse: 'Свернуть анимацию',
      buildCta: 'Здание готово. Позвонить',
      buildMessages: ['Размечаем фундамент...', 'Возводим конструкцию...', 'Монтируем уровни...', 'Закрываем здание...', 'Завершаем детали...', 'Строительство завершено.'],
      buildComplete: 'Строительство завершено. Ваше может начаться сегодня.'
    }
  };

  const t = copy[locale];
  const assetPath = (value = '') => `${root}${value}`;
  const localePrefix = locale === 'ro' ? '' : `${locale}/`;
  const pagePath = (value = '') => `${root}${localePrefix}${value}`;
  const logo = `<img src="${assetPath('assets/icons/logo.svg')}" alt="Condr Grup" width="760" height="160">`;

  function active(name) {
    return currentPage === name ? ' active' : '';
  }

  function logicalPage() {
    const siteRoot = new URL(root || './', window.location.href);
    let route = decodeURI(window.location.pathname).slice(siteRoot.pathname.length);
    route = route.replace(/^(?:en|ru)\//, '');
    return route || 'index.html';
  }

  function languageLinks() {
    const route = logicalPage();
    const hash = window.location.hash || '';
    const languages = [
      ['ro', 'RO', 'Română'],
      ['ru', 'RU', 'Русский'],
      ['en', 'EN', 'English']
    ];
    return languages.map(([code, short, name]) => {
      const prefix = code === 'ro' ? '' : `${code}/`;
      const current = code === locale ? ' aria-current="page"' : '';
      return `<a href="${root}${prefix}${route}${hash}" lang="${code}"${current}>${short} — ${name}</a>`;
    }).join('');
  }

  function mobileLanguageLinks() {
    const route = logicalPage();
    const hash = window.location.hash || '';
    return ['ro', 'ru', 'en'].map(code => {
      const prefix = code === 'ro' ? '' : `${code}/`;
      const label = code.toUpperCase();
      return code === locale
        ? `<strong>${label}</strong>`
        : `<a href="${root}${prefix}${route}${hash}" lang="${code}">${label}</a>`;
    }).join('');
  }

  function buildStoryMarkup() {
    if (!FEATURES.buildStory) return '';
    return `
      <aside class="build-story" aria-label="${t.buildLabel}" data-phase="1">
        <div class="build-head"><span>${t.buildTeam}</span><button type="button" aria-label="${t.buildCollapse}">—</button></div>
        <div class="build-stage" aria-hidden="true">
          <div class="crane"><i class="crane-mast"></i><i class="crane-arm"></i></div>
          <div class="worker"></div>
          <div class="mini-building"><i class="mini-floor"></i><i class="mini-floor"></i><i class="mini-floor"></i><i class="mini-floor"></i><i class="mini-floor"></i></div>
        </div>
        <div class="build-info">
          <p class="build-message">${t.buildMessages[0]}</p>
          <div class="build-progress"><span></span></div>
          <div class="build-meta"><span class="build-percent">0%</span><span>30 SEC.</span></div>
          <a class="build-cta button button-orange button-small" href="tel:+37369069195">${t.buildCta} <span>↗</span></a>
        </div>
      </aside>`;
  }

  function injectShell() {
    document.body.insertAdjacentHTML('afterbegin', `
      <a class="skip-link" href="#continut">${t.skip}</a>
      <div class="site-grain" aria-hidden="true"></div>
      <header class="site-header${document.body.dataset.header === 'solid' ? ' solid' : ''}">
        <div class="header-inner">
          <a class="site-logo" href="${pagePath('index.html')}" aria-label="Condr Grup — ${t.home}">${logo}</a>
          <nav class="main-nav" aria-label="${t.navLabel}">
            <a class="nav-link${active('home')}" href="${pagePath('index.html')}">${t.home}</a>
            <div class="nav-group">
              <a class="nav-link${active('services')}" href="${pagePath('servicii/index.html')}">${t.services} <span class="chevron">⌄</span></a>
              <div class="mega-panel">
                <div class="mega-inner">
                  <div class="mega-intro">
                    <p class="eyebrow">${t.work}</p>
                    <h3>${t.workTitle}</h3>
                    <p>${t.workCopy}</p>
                    <a class="text-link" href="${pagePath('servicii/index.html')}">${t.allServices} <span>↗</span></a>
                  </div>
                  <div class="mega-links">
                    ${t.serviceLinks.map(([label, href]) => `<a href="${pagePath(href)}"><span>${label}</span><span>↗</span></a>`).join('')}
                  </div>
                </div>
              </div>
            </div>
            <a class="nav-link${active('projects')}" href="${pagePath('proiecte/index.html')}">${t.projects}</a>
            <a class="nav-link${active('b2b')}" href="${pagePath('b2b/index.html')}">B2B</a>
            <a class="nav-link${active('about')}" href="${pagePath('despre/index.html')}">${t.about}</a>
            <a class="nav-link${active('reviews')}" href="${pagePath('recenzii/index.html')}">${t.reviews}</a>
            <a class="nav-link${active('contact')}" href="${pagePath('contact/index.html')}">${t.contact}</a>
          </nav>
          <div class="language">
            <button type="button" aria-expanded="false">${locale.toUpperCase()} ⌄</button>
            <div class="language-menu">${languageLinks()}</div>
          </div>
          <a class="header-quote" href="${pagePath('contact/index.html#oferta')}">${t.quote} <span>↗</span></a>
          <button class="menu-toggle" type="button" aria-label="${t.openMenu}" aria-expanded="false"><i></i><i></i><i></i></button>
        </div>
      </header>
      <nav class="mobile-menu" aria-label="${t.mobileNavLabel}">
        <a href="${pagePath('index.html')}">${t.home} <span>↗</span></a>
        <a href="${pagePath('servicii/index.html')}">${t.services} <span>↗</span></a>
        <div class="mobile-service-links">${t.serviceLinks.map(([label, href]) => `<a href="${pagePath(href)}">${label}</a>`).join('')}</div>
        <a href="${pagePath('proiecte/index.html')}">${t.projects} <span>↗</span></a>
        <a href="${pagePath('b2b/index.html')}">B2B <span>↗</span></a>
        <a href="${pagePath('despre/index.html')}">${t.about} <span>↗</span></a>
        <a href="${pagePath('recenzii/index.html')}">${t.reviews} <span>↗</span></a>
        <a href="${pagePath('contact/index.html')}">${t.contact} <span>↗</span></a>
        <div class="mobile-languages">${mobileLanguageLinks()}</div>
      </nav>
    `);

    document.body.insertAdjacentHTML('beforeend', `
      <footer class="site-footer">
        <div class="footer-grid">
          <div class="footer-brand">${logo}<p>${t.footerPromise}</p></div>
          <div class="footer-column"><p class="footer-label">${t.navigation}</p><a href="${pagePath('servicii/index.html')}">${t.services}</a><a href="${pagePath('proiecte/index.html')}">${t.projects}</a><a href="${pagePath('b2b/index.html')}">${t.b2bLinks}</a><a href="${pagePath('despre/index.html')}">${t.about}</a></div>
          <div class="footer-column"><p class="footer-label">${t.contact.toUpperCase()}</p><a href="tel:+37369069195">+373 69 069 195</a><a href="mailto:condru01@gmail.com">condru01@gmail.com</a><p>${t.address}</p></div>
          <div class="footer-column footer-company"><p class="footer-label">${t.company}</p><p>Condr Grup S.R.L.<br>IDNO 1026023118602</p><a href="${pagePath('confidentialitate.html')}">${t.privacy}</a><a href="${pagePath('contact/index.html#oferta')}">${t.requestQuote}</a></div>
          <div class="footer-column footer-social"><p class="footer-label">${t.social}</p><span class="social-placeholder">Facebook <small>${t.socialSoon}</small></span><span class="social-placeholder">Instagram <small>${t.socialSoon}</small></span><span class="social-placeholder">TikTok <small>${t.socialSoon}</small></span></div>
        </div>
        <div class="footer-bottom"><span>© 2026 CONDR GRUP S.R.L. · ${t.rights}</span><a href="#top">${t.top} ↑</a></div>
      </footer>
      ${buildStoryMarkup()}
      <div class="quick-contact">
        <button class="quick-toggle" type="button" aria-label="${t.quickLabel}" aria-expanded="false">+</button>
        <div class="quick-panel"><p>${t.quickQuestion}</p><a class="viber" href="viber://chat?number=%2B37369069195">${t.viber} <span>↗</span></a><a class="phone" href="tel:+37369069195">${t.call} <span>↗</span></a><a class="email" href="mailto:condru01@gmail.com">${t.emailUs} <span>↗</span></a></div>
      </div>
      <div class="toast" role="status" aria-live="polite"></div>
    `);
  }

  function bindNavigation() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.menu-toggle');
    const language = document.querySelector('.language');
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? t.closeMenu : t.openMenu);
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', t.openMenu);
    }));

    language?.querySelector('button').addEventListener('click', () => {
      const open = language.classList.toggle('open');
      language.querySelector('button').setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', event => {
      if (language && !language.contains(event.target)) {
        language.classList.remove('open');
        language.querySelector('button').setAttribute('aria-expanded', 'false');
      }
    });
  }

  function bindReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(item => item.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .1, rootMargin: '0px 0px -30px' });
    items.forEach(item => observer.observe(item));
  }

  function bindCarousels() {
    document.querySelectorAll('.carousel').forEach(carousel => {
      const track = carousel.querySelector('.carousel-track');
      const cards = [...track.children];
      const previous = carousel.parentElement.querySelector('[data-carousel-prev]');
      const next = carousel.parentElement.querySelector('[data-carousel-next]');
      let index = 0;
      let pointerStart = null;

      const visible = () => Math.max(1, Math.floor(carousel.clientWidth / (cards[0]?.getBoundingClientRect().width || 1)));
      const update = () => {
        const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        index = Math.max(0, Math.min(index, Math.max(0, cards.length - visible())));
        track.style.transform = `translateX(${-index * (cardWidth + gap)}px)`;
      };
      previous?.addEventListener('click', () => { index -= 1; update(); });
      next?.addEventListener('click', () => { index += 1; update(); });
      carousel.addEventListener('pointerdown', event => {
        pointerStart = event.clientX;
        carousel.setPointerCapture?.(event.pointerId);
      });
      carousel.addEventListener('pointerup', event => {
        if (pointerStart === null) return;
        const delta = event.clientX - pointerStart;
        if (Math.abs(delta) > 45) index += delta < 0 ? 1 : -1;
        pointerStart = null;
        update();
      });
      window.addEventListener('resize', update);
      update();
    });
  }

  function bindFilters() {
    const buttons = document.querySelectorAll('[data-project-filter]');
    const cards = document.querySelectorAll('[data-project-category]');
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.projectFilter;
      cards.forEach(card => card.classList.toggle('is-hidden', filter !== 'toate' && card.dataset.projectCategory !== filter));
    }));
  }

  function showToast(message) {
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 4200);
  }

  function bindForms() {
    document.querySelectorAll('[data-email-form]').forEach(form => {
      let started = false;
      form.addEventListener('focusin', () => {
        if (started) return;
        started = true;
        trackConversion('form_start', { form: form.dataset.conversionForm || 'contact' });
      });
      form.addEventListener('submit', async event => {
        event.preventDefault();
        const status = form.querySelector('.form-status');
        const submit = form.querySelector('[type="submit"]');
        const data = Object.fromEntries(new FormData(form).entries());
        if (data._honey) return;
        delete data._honey;
        data._subject = form.dataset.subject || t.formSubject;
        data._template = 'table';
        data._captcha = 'false';
        status.textContent = t.sending;
        status.className = 'form-status';
        submit.disabled = true;
        try {
          trackConversion('form_submit', { form: form.dataset.conversionForm || 'contact' });
          const response = await fetch('https://formsubmit.co/ajax/condru01@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data)
          });
          if (!response.ok) throw new Error('Form unavailable');
          status.textContent = t.sent;
          status.classList.add('success');
          form.reset();
          showToast(t.toast);
          trackConversion('form_success', { form: form.dataset.conversionForm || 'contact' });
        } catch (error) {
          status.innerHTML = `${t.sendError} <a href="mailto:condru01@gmail.com">condru01@gmail.com</a>.`;
          status.classList.add('error');
          trackConversion('form_error', { form: form.dataset.conversionForm || 'contact' });
        } finally {
          submit.disabled = false;
        }
      });
    });
  }

  function trackConversion(action, details = {}) {
    const event = {
      event: 'condr_conversion',
      action,
      language: locale,
      page: logicalPage(),
      ...details
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
    window.dispatchEvent(new CustomEvent('condr:conversion', { detail: event }));
  }

  function bindConversionLinks() {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) trackConversion('phone_click');
      if (href.startsWith('viber:')) trackConversion('viber_click');
      if (href.startsWith('mailto:')) trackConversion('email_click');
    });
  }

  function bindQuickContact() {
    const widget = document.querySelector('.quick-contact');
    if (!widget) return;
    const button = widget.querySelector('.quick-toggle');
    button.addEventListener('click', () => {
      const open = widget.classList.toggle('open');
      button.textContent = open ? '×' : '+';
      button.setAttribute('aria-expanded', String(open));
    });
  }

  function startBuildStory() {
    const widget = document.querySelector('.build-story');
    if (!widget) return;
    const message = widget.querySelector('.build-message');
    const percent = widget.querySelector('.build-percent');
    const collapse = widget.querySelector('.build-head button');
    const key = 'condr-build-start-v1';
    const collapseKey = 'condr-build-collapsed-v1';
    const duration = 30000;
    let started = Number(sessionStorage.getItem(key));
    if (!started || started > Date.now()) {
      started = Date.now();
      sessionStorage.setItem(key, String(started));
    }
    if (sessionStorage.getItem(collapseKey) === '1') widget.classList.add('collapsed');

    collapse.addEventListener('click', () => {
      const collapsed = widget.classList.toggle('collapsed');
      collapse.textContent = collapsed ? '+' : '—';
      sessionStorage.setItem(collapseKey, collapsed ? '1' : '0');
    });

    const render = () => {
      const elapsed = Math.min(duration, Date.now() - started);
      const progress = Math.max(0, elapsed / duration);
      const phase = Math.min(5, Math.floor(progress * 5) + 1);
      const value = Math.round(progress * 100);
      widget.dataset.phase = String(phase);
      widget.style.setProperty('--build-progress', `${value}%`);
      percent.textContent = `${value}%`;
      message.textContent = t.buildMessages[Math.min(t.buildMessages.length - 1, Math.floor(progress * 5))];
      if (progress >= 1) {
        widget.classList.add('complete');
        message.textContent = t.buildComplete;
        return;
      }
      window.setTimeout(render, 250);
    };
    render();
  }

  injectShell();
  bindNavigation();
  bindReveal();
  bindCarousels();
  bindFilters();
  bindForms();
  bindConversionLinks();
  bindQuickContact();
  startBuildStory();

  window.CondrGrup = {
    root,
    locale,
    locales: ['ro', 'ru', 'en'],
    features: FEATURES,
    showToast,
    trackConversion
  };
})();
