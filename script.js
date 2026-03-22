/* ============================================================
   FIT AFRICA — Marketing Website Scripts
   fitafrica.tech
   ============================================================ */

// ---- Navigation: scroll-triggered solid background -----------
const nav = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ---- Mobile menu toggle --------------------------------------
navBurger.addEventListener('click', () => {
  const open = navBurger.classList.toggle('open');
  navMobile.classList.toggle('open', open);
});

// Close mobile menu when any link is clicked
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navBurger.classList.remove('open');
    navMobile.classList.remove('open');
  });
});

// ---- Scroll reveal via IntersectionObserver ------------------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Animated stat counters ----------------------------------
const statElements = document.querySelectorAll('.trust-stat__num[data-count]');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = target >= 100 ? 'K+' : target === 4 ? '' : '';
        animateCounter(el, 0, target, 1400, suffix);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

statElements.forEach(el => counterObserver.observe(el));

function animateCounter(el, start, end, duration, suffix) {
  const startTime = performance.now();
  const range = end - start;

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + range * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ---- Smooth scroll for anchor links --------------------------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = window.scrollY + target.getBoundingClientRect().top - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ---- Active nav link on scroll -------------------------------
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'rgba(255,255,255,1)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

// ---- Subtle parallax on hero background ----------------------
const heroEl = document.querySelector('.hero');
const heroBg = document.querySelector('.hero__bg-pattern');

if (heroEl && heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

// ---- Benefits tab (if future use) ----------------------------
// Placeholder for interactive benefit filtering
document.querySelectorAll('.benefits-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.benefits-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ---- Initial nav state (transparent on hero) -----------------
if (window.scrollY > 40) nav.classList.add('scrolled');

// ---- Coach Portal interactive tabs ---------------------------
const coachTitleMap = {
  clients:  'Clients — Coach Amara Fitness',
  workouts: 'Workout Builder — Coach Amara Fitness',
  forms:    'Forms & Waivers — Coach Amara Fitness',
  bookings: 'Schedule — Coach Amara Fitness',
  progress: 'Progress Tracking — Coach Amara Fitness',
  revenue:  'Revenue — Coach Amara Fitness',
  videos:   'Video Library — Coach Amara Fitness',
  messages: 'Messages — Coach Amara Fitness',
};

document.querySelectorAll('.portal-feature[data-portal-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    const screen = tab.dataset.portalTab;
    document.querySelectorAll('.portal-feature[data-portal-tab]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.portal-screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('pscreen-' + screen);
    if (target) target.classList.add('active');
    document.querySelectorAll('.portal-nav').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector('.portal-nav[data-portal-nav="' + screen + '"]');
    if (navItem) navItem.classList.add('active');
    const label = document.getElementById('portalTitlebarLabel');
    if (label && coachTitleMap[screen]) label.textContent = coachTitleMap[screen];
  });
});

// ---- Client Portal interactive tabs --------------------------
const clientNavMap = { workout: 0, progress: 1, bookings: 2, messages: 3 };

function switchClientScreen(screen) {
  document.querySelectorAll('.portal-feature[data-client-tab]').forEach(t => t.classList.remove('active'));
  const tab = document.querySelector('.portal-feature[data-client-tab="' + screen + '"]');
  if (tab) tab.classList.add('active');
  document.querySelectorAll('.client-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('cscreen-' + screen);
  if (target) target.classList.add('active');
  const navIcons = document.querySelectorAll('.phone-nav-icon[data-client-nav]');
  navIcons.forEach(icon => icon.classList.remove('active'));
  const navIdx = clientNavMap[screen];
  if (navIdx !== undefined && navIcons[navIdx]) navIcons[navIdx].classList.add('active');
}

document.querySelectorAll('.portal-feature[data-client-tab]').forEach(tab => {
  tab.addEventListener('click', () => switchClientScreen(tab.dataset.clientTab));
});

document.querySelectorAll('.phone-nav-icon[data-client-nav]').forEach(icon => {
  icon.addEventListener('click', () => switchClientScreen(icon.dataset.clientNav));
});

// ============================================================
// AFRICAN THEME SWITCHER
// ============================================================

const THEMES = ['terracotta', 'kente-gold', 'savanna', 'lagos'];

function setTheme(theme) {
  // Apply to <html>
  document.documentElement.setAttribute('data-theme', theme);

  // Sync floating panel buttons
  document.querySelectorAll('.theme-btn[data-theme-val]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-val') === theme);
  });

  // Sync brand section cards
  document.querySelectorAll('.theme-card[data-set-theme]').forEach(card => {
    card.classList.toggle('active', card.getAttribute('data-set-theme') === theme);
  });

  // Persist
  try { localStorage.setItem('fitafrica-theme', theme); } catch(e) {}
}

// Toggle the floating panel
const themeToggle = document.getElementById('themeToggle');
const themePanel  = document.getElementById('themePanel');

if (themeToggle && themePanel) {
  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = themePanel.classList.toggle('open');
    themeToggle.classList.toggle('open', open);
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#themeSwitcher')) {
      themePanel.classList.remove('open');
      themeToggle.classList.remove('open');
    }
  });

  // Wire floating panel buttons
  document.querySelectorAll('.theme-btn[data-theme-val]').forEach(btn => {
    btn.addEventListener('click', () => {
      setTheme(btn.getAttribute('data-theme-val'));
    });
  });
}

// Wire brand section theme cards
document.querySelectorAll('.theme-card[data-set-theme]').forEach(card => {
  card.addEventListener('click', () => setTheme(card.getAttribute('data-set-theme')));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') setTheme(card.getAttribute('data-set-theme')); });
});

// Load persisted theme
try {
  const saved = localStorage.getItem('fitafrica-theme');
  if (saved && THEMES.includes(saved)) setTheme(saved);
} catch(e) {}
