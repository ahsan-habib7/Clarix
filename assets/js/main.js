/* ============================================================
   Clarix  — main.js
   Handles: theme toggle + persistence, color switcher, mobile menu,
   sticky header, back-to-top, smooth scroll, accordion, tabs,
   carousel, search, newsletter, toast notifications.
   ============================================================ */
'use strict';

/* ---------- Utility: Toast notifications ---------- */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
window.showToast = showToast;

/* ---------- Theme toggle + persistence ---------- */
(function initTheme() {
  const toggle   = document.getElementById('themeToggle');
  const moonIcon = toggle?.querySelector('.icon-moon');
  const sunIcon  = toggle?.querySelector('.icon-sun');
  const saved     = localStorage.getItem('Clarix -theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme     = saved || (prefersDark ? 'dark' : 'light');

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    if (moonIcon) moonIcon.style.display = t === 'dark' ? 'none' : 'block';
    if (sunIcon)  sunIcon.style.display  = t === 'dark' ? 'block' : 'none';
  }

  applyTheme(theme);

  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('Clarix -theme', next);
  });
})();

/* ---------- Color theme switcher ---------- */
(function initColorSwitcher() {
  const wrap    = document.getElementById('colorSwitcher');
  if (!wrap) return;

  const trigger = document.getElementById('colorSwitcherTrigger');
  const panel   = document.getElementById('colorSwitcherPanel');
  const swatches = wrap.querySelectorAll('[data-color]');
  const saved   = localStorage.getItem('Clarix -color') || 'indigo';

  document.documentElement.setAttribute('data-theme-color', saved);
  wrap.querySelector(`[data-color="${saved}"]`)?.classList.add('active');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) panel.classList.remove('open');
  });

  swatches.forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.dataset.color;
      document.documentElement.setAttribute('data-theme-color', c);
      localStorage.setItem('Clarix -color', c);
      swatches.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();

/* ---------- Mobile menu ---------- */
(function initMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (!menuToggle || !nav) return;
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
    })
  );
})();

/* ---------- Sticky header shadow ---------- */
(function initSticky() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- Back to top ---------- */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ---------- Accordion (FAQ) ---------- */
(function initAccordion() {
  const items = document.querySelectorAll('.accordion__item');
  items.forEach(item => {
    const header = item.querySelector('.accordion__header');
    const body   = item.querySelector('.accordion__body');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion__body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
})();

/* ---------- Tabs ---------- */
(function initTabs() {
  const tabs = document.getElementById('tabs');
  if (!tabs) return;
  const btns   = tabs.querySelectorAll('.tab-btn');
  const panels = tabs.querySelectorAll('.tab-panel');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.tab;
      btns.forEach(b   => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      tabs.querySelector(`.tab-panel[data-panel="${idx}"]`).classList.add('active');
    });
  });
})();

/* ---------- Testimonial carousel ---------- */
(function initCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  const slides   = track.children;
  const dotsWrap = document.getElementById('carouselDots');
  const prev     = document.getElementById('prevBtn');
  const next     = document.getElementById('nextBtn');
  let index = 0;
  let timer;

  Array.from(slides).forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.children;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    Array.from(dots).forEach((d, di) => d.classList.toggle('active', di === index));
  }

  next?.addEventListener('click', () => { goTo(index + 1); resetTimer(); });
  prev?.addEventListener('click', () => { goTo(index - 1); resetTimer(); });

  function startTimer() { timer = setInterval(() => goTo(index + 1), 5000); }
  function resetTimer() { clearInterval(timer); startTimer(); }
  startTimer();

  track.parentElement.addEventListener('mouseenter', () => clearInterval(timer));
  track.parentElement.addEventListener('mouseleave', startTimer);
})();

/* ---------- Search (features + pages filtering) ---------- */
(function initSearch() {
  const toggle  = document.getElementById('searchToggle');
  const bar     = document.getElementById('searchBar');
  const input   = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!toggle || !bar) return;

  const data = [
    { title: 'Real-time Analytics',   link: '#features' },
    { title: 'Enterprise Security',   link: '#features' },
    { title: 'AI Insights',           link: '#features' },
    { title: 'Blazing Fast Queries',  link: '#features' },
    { title: '200+ Integrations',     link: '#features' },
    { title: 'Mobile Ready',          link: '#features' },
    { title: 'Pricing Plans',         link: '#pricing'  },
    { title: 'Free Trial',            link: '#pricing'  },
    { title: 'Testimonials',          link: '#testimonials' },
    { title: 'FAQ',                   link: '#faq'      },
    { title: 'Contact Us',            link: 'contact.html' },
    { title: 'About Clarix ',          link: 'about.html'   },
  ];

  toggle.addEventListener('click', () => {
    bar.classList.toggle('open');
    if (bar.classList.contains('open')) input.focus();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') bar.classList.remove('open');
  });

  input?.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if (!q) return;
    const matches = data.filter(d => d.title.toLowerCase().includes(q));
    if (matches.length === 0) {
      results.innerHTML = '<li>No results found</li>';
      return;
    }
    matches.forEach(m => {
      const li = document.createElement('li');
      li.textContent = m.title;
      li.addEventListener('click', () => {
        window.location.href = m.link;
        bar.classList.remove('open');
      });
      results.appendChild(li);
    });
  });
})();

/* ---------- Newsletter subscription ---------- */
(function initNewsletter() {
  const form  = document.getElementById('newsletterForm');
  if (!form) return;
  const email = document.getElementById('newsletterEmail');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!emailRe.test(email.value.trim())) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    const subs = JSON.parse(localStorage.getItem('Clarix -subs') || '[]');
    subs.push(email.value.trim());
    localStorage.setItem('Clarix -subs', JSON.stringify(subs));
    showToast('🎉 Subscribed! Check your inbox.', 'success');
    email.value = '';
  });
})();
