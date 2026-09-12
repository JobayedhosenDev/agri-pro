/**
 * AGRI-PRO EUROPEAN MACHINERY — CORE JAVASCRIPT
 * Modular, Vanilla JS (Easily integrated into WordPress enqueued scripts)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initSearchModal();
  initScrollReveal();
  initCounterAnimation();
  initActiveNavLink();
  initBackgroundVideos();
});

/* Background Videos Smooth Player (Hero & Bottom CTA) */
function initBackgroundVideos() {
  const videos = document.querySelectorAll('.hero-video-bg, .cta-video-bg, video[autoplay]');
  videos.forEach(video => {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        video.classList.add('is-playing');
      }).catch(() => {
        // Autoplay policy or low power mode - video remains gracefully styled
      });
    }

    video.addEventListener('playing', () => {
      video.classList.add('is-playing');
    });

    video.addEventListener('error', () => {
      // Keep poster fallback
      video.style.opacity = '0';
    }, true);
  });
}

/* Smooth Scroll Reveal Animations */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right, .reveal-zoom');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* Sticky Header on Scroll */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* Mobile Drawer Navigation */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const closeBtn = document.querySelector('.mobile-close-btn');

  if (!hamburger || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* Search Modal Overlay */
function initSearchModal() {
  const triggers = document.querySelectorAll('.search-trigger-btn');
  const modal = document.querySelector('.search-modal');
  const closeBtn = document.querySelector('.search-close-btn');
  const searchInput = document.querySelector('.search-input-box input');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  triggers.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* Animated Counters on Scroll */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetValue = parseInt(counter.getAttribute('data-target') || '0', 10);
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1600;
        const start = performance.now();

        const updateCount = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          // Ease-out curve
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * targetValue);
          counter.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = `${prefix}${targetValue.toLocaleString()}${suffix}`;
          }
        };

        requestAnimationFrame(updateCount);
        obs.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

/* Active Nav Link based on Current Page */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
