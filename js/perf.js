/* ============================================================
   MILYBO DZ – Performance & UX enhancements (perf.js)
   - Firebase loader
   - Lazy loading images (IntersectionObserver)
   - Skeleton cards
   - Smooth scroll animations
   - Header scroll shadow
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. FIREBASE LOADER ─────────────────────────────────── */
  const loader = document.getElementById('firebase-loader');

  function hideLoader() {
    if (loader) {
      loader.classList.add('hidden');
      // Remove from DOM after animation
      setTimeout(() => loader.remove(), 500);
    }
  }

  // Hide after products are actually loaded from Firestore
  window.addEventListener('products-loaded-from-firestore', hideLoader);
  // Fallback: hide after 4 seconds even if Firebase fails / is too slow
  setTimeout(hideLoader, 4000);

  /* ── 2. LAZY LOADING (IntersectionObserver) ─────────────── */
  function initLazyImages() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: load all images immediately
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.classList.add('is-loaded');
      });
      return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('img-lazy');
            img.onload = () => img.classList.add('is-loaded');
            img.onerror = () => {
              img.classList.add('is-loaded');
              if (img.dataset.fallback) img.src = img.dataset.fallback;
            };
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px 0px', // précharge 100px avant visibilité
      threshold: 0
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  /* ── 3. SCROLL ANIMATIONS ──────────────────────────────── */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-in');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
      '.product-card, .category-card, .feature-item, .garantie-card, .hero-deco-card'
    ).forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 0.06}s`;
      el.classList.add('anim-ready');
      animObserver.observe(el);
    });
  }

  /* ── 4. HEADER SHADOW ON SCROLL ───────────────────────── */
  function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 5. NATIVE LAZY LOADING FALLBACK ───────────────────── */
  function addNativeLazy() {
    document.querySelectorAll('img:not([loading])').forEach(img => {
      // Don't lazy load above-the-fold images
      const rect = img.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  /* ── 6. MOBILE: Swipe-to-navigate gallery ──────────────── */
  function initGallerySwipe() {
    const main = document.querySelector('.gallery-main');
    if (!main) return;
    let startX = 0;
    main.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    main.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) {
        // Trigger prev/next
        const btn = dx > 0
          ? document.querySelector('.gallery-prev')
          : document.querySelector('.gallery-next');
        if (btn) btn.click();
      }
    }, { passive: true });
  }

  /* ── 7. TOAST SYSTEM ───────────────────────────────────── */
  window.showToast = function (message, type = 'default', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('out');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  /* ── 8. INIT ────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLazyImages();
      initScrollAnimations();
      initHeaderScroll();
      addNativeLazy();
      initGallerySwipe();
    });
  } else {
    initLazyImages();
    initScrollAnimations();
    initHeaderScroll();
    addNativeLazy();
    initGallerySwipe();
  }

})();
