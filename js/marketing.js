// ============================================================
// MILYBO DZ – Marketing & SEO (marché algérien)
// Inclure ce script dans <head> de toutes les pages
// ============================================================

// ── 1. Facebook / Instagram Pixel ────────────────────────────
// Remplacez VOTRE_PIXEL_ID par votre vrai ID Meta Pixel
(function() {
  const PIXEL_ID = 'VOTRE_PIXEL_ID'; // ex: '1234567890123456'
  if (!PIXEL_ID || PIXEL_ID === 'VOTRE_PIXEL_ID') return; // Skip si pas configuré
  !function(f,b,e,v,n,t,s){
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');
  // Track add to cart
  window._fbqTrackAddToCart = function(productName, price) {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'AddToCart', { content_name: productName, value: price, currency: 'DZD' });
    }
  };
  // Track purchase
  window._fbqTrackPurchase = function(total) {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Purchase', { value: total, currency: 'DZD' });
    }
  };
})();

// ── 2. WhatsApp Floating Button ───────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  const WA_NUMBER = '213559449995'; // Remplacez par votre numéro
  const WA_MSG = encodeURIComponent('مرحبا ميليبو دي زي 👋 أريد الاستفسار عن منتج / Bonjour Milybo DZ, j\'ai une question.');

  const btn = document.createElement('a');
  btn.href = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
  btn.target = '_blank';
  btn.id = 'wa-float-btn';
  btn.className = 'wa-float-container';
  btn.setAttribute('aria-label', 'Contacter sur WhatsApp');
  btn.innerHTML = `
    <div id="wa-tooltip" class="wa-tooltip">
      Besoin d'aide ? 💬<br/>
      <span class="wa-tooltip-ar">نحن هنا للمساعدة</span>
    </div>
    <div class="wa-icon-circle">
      <svg viewBox="0 0 448 512" width="30" height="30" fill="currentColor">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
    </div>`;
  document.body.appendChild(btn);
});

// ── 4. Newsletter signup handler ──────────────────────────────
function submitNewsletter(formEl) {
  const email = formEl.querySelector('#nl-email')?.value?.trim();
  const wilaya = formEl.querySelector('#nl-wilaya')?.value;
  if (!email || !email.includes('@')) {
    if (typeof showToast === 'function') showToast('⚠️ Entrez un email valide.', 'error');
    return false;
  }
  // Store locally (in real site, send to backend/Mailchimp)
  const subscribers = JSON.parse(localStorage.getItem('milybo_newsletter') || '[]');
  if (subscribers.find(s => s.email === email)) {
    if (typeof showToast === 'function') showToast('ℹ️ Vous êtes déjà inscrit(e) !', 'default');
    return false;
  }
  subscribers.push({ email, wilaya, date: new Date().toISOString() });
  localStorage.setItem('milybo_newsletter', JSON.stringify(subscribers));
  if (typeof showToast === 'function') showToast('🎉 Inscrit(e) ! Vous recevrez nos offres exclusives.', 'success');
  formEl.reset();
  const btn = formEl.querySelector('button[type=submit]');
  if (btn) { btn.textContent = '✅ Inscrit(e) !'; btn.disabled = true; }
  return false;
}

// ── 5. Structured Data (JSON-LD) pour Google ─────────────────
(function injectStructuredData() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  let data = null;

  if (page === 'index.html' || page === '') {
    data = {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Milybo DZ",
      "description": "Boutique algérienne de vêtements pour bébé 0-36 mois. Livraison partout en Algérie.",
      "url": "https://milybodz.dz",
      "image": "https://milybodz.dz/images/milybo.jpg",
      "telephone": "+213559449995",
      "email": "contact@milybodz.dz",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Alger",
        "addressCountry": "DZ"
      },
      "openingHours": "Sa-Th 08:00-20:00",
      "priceRange": "1200 DA - 10000 DA",
      "currenciesAccepted": "DZD",
      "paymentAccepted": "Cash, Bank Transfer"
    };
  }

  if (data) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }
})();

// ── 6. Seasonal promotions reminder ──────────────────────────
(function checkSeasonalPromo() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day   = now.getDate();

  // Définir les saisons promotionnelles algériennes
  const promos = [
    { name: 'Aïd El Fitr 🌙',      active: month === 3 || month === 4, msg: '🌙 Aïd El Fitr approche ! Préparez les tenues de fête pour votre bébé.', color: '#8B5CF6' },
    { name: 'Aïd El Adha 🐑',       active: month === 5 || month === 6, msg: '🐑 Aïd El Adha ! Collections spéciales fête disponibles.', color: '#059669' },
    { name: 'Rentrée scolaire 📚',   active: month === 8 || month === 9, msg: '📚 Rentrée ! Nouveaux vêtements pour la saison automne-hiver.', color: '#D97706' },
    { name: 'Collection Hiver ❄️',   active: month === 11 || month === 12, msg: '❄️ Hiver arrive ! Découvrez notre collection chaude et douce.', color: '#3B82F6' },
    { name: 'Printemps–Été ☀️',     active: month === 3 || month === 4 || month === 5, msg: '☀️ Nouvelle collection Printemps ! Couleurs pastels et coton léger.', color: '#EC4899' },
  ];

  const active = promos.filter(p => p.active);
  if (!active.length) return;

  // N'afficher qu'une fois par session
  if (sessionStorage.getItem('milybo_seasonal')) return;
  sessionStorage.setItem('milybo_seasonal', '1');

  setTimeout(() => {
    const promo = active[0];
    if (typeof showToast === 'function') {
      showToast(promo.msg, 'success');
    }
  }, 8000);
})();
