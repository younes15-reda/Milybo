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
  btn.setAttribute('aria-label', 'Contacter sur WhatsApp');
  btn.innerHTML = `
    <div style="position:fixed;bottom:90px;right:24px;z-index:8000;display:flex;align-items:center;gap:10px;cursor:pointer;">
      <div id="wa-tooltip" style="background:white;border:1.5px solid #E5E7EB;border-radius:12px;padding:10px 16px;font-size:.82rem;font-weight:600;color:#374151;box-shadow:0 4px 20px rgba(0,0,0,.12);white-space:nowrap;opacity:0;transform:translateX(10px);transition:all .3s;pointer-events:none;">
        Besoin d'aide ? 💬<br/>
        <span style="font-family:'Noto Sans Arabic',sans-serif;font-size:.75rem;color:#9CA3AF;">نحن هنا للمساعدة</span>
      </div>
      <div style="width:58px;height:58px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.6rem;box-shadow:0 4px 20px rgba(37,211,102,.4);animation:wa-pulse 2.5s infinite;">💬</div>
    </div>`;
  document.body.appendChild(btn);

  // Pulse animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes wa-pulse {
      0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4);}
      50%{box-shadow:0 4px 32px rgba(37,211,102,.7);}
    }
    #wa-float-btn:hover #wa-tooltip{opacity:1;transform:translateX(0);}
  `;
  document.head.appendChild(style);
});

// ── 3. Welcome Popup avec code promo ─────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // N'afficher qu'une fois toutes les 48h
  const lastShown = localStorage.getItem('milybo_popup_ts');
  const now = Date.now();
  if (lastShown && (now - parseInt(lastShown)) < 48 * 3600 * 1000) return;
  // Délai 4s avant affichage
  setTimeout(showWelcomePopup, 4000);
});

function showWelcomePopup() {
  if (document.getElementById('welcome-popup')) return;

  const popup = document.createElement('div');
  popup.id = 'welcome-popup';
  popup.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;`;
  popup.innerHTML = `
    <div style="background:white;border-radius:20px;padding:0;max-width:440px;width:100%;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.2);animation:popup-in .4s ease;">
      <div style="background:linear-gradient(135deg,var(--rose) 0%,#E91E8C 100%);padding:32px 28px;text-align:center;color:white;position:relative;">
        <button onclick="closePopup()" style="position:absolute;top:12px;right:14px;background:rgba(255,255,255,.2);border:none;width:28px;height:28px;border-radius:50%;color:white;font-size:1rem;cursor:pointer;font-weight:700;">✕</button>
        <div style="font-size:3rem;margin-bottom:10px;">🎀</div>
        <h2 style="font-size:1.4rem;font-weight:900;margin-bottom:6px;">Bienvenue chez Milybo DZ !</h2>
        <div style="font-family:'Noto Sans Arabic',sans-serif;font-size:.9rem;opacity:.9;">مرحباً بك في متجر ميليبو دي زي</div>
      </div>
      <div style="padding:28px;text-align:center;">
        <p style="color:#374151;font-size:.9rem;margin-bottom:16px;">🎉 En cadeau de bienvenue, bénéficiez de <strong style="color:var(--rose);">−10%</strong> sur votre première commande !</p>
        <div style="font-family:'Noto Sans Arabic',sans-serif;font-size:.82rem;color:#6B7280;margin-bottom:20px;">هدية ترحيبية : خصم 10% على أول طلب لك</div>
        <div style="background:linear-gradient(135deg,#FFF0F5,#F0F9FF);border:2px dashed var(--rose-light);border-radius:12px;padding:16px;margin-bottom:20px;">
          <div style="font-size:.75rem;color:#6B7280;margin-bottom:4px;">Votre code promo · كود الخصم</div>
          <div id="promo-code-display" style="font-size:1.5rem;font-weight:900;color:var(--rose);letter-spacing:3px;">BIENVENUE10</div>
          <button onclick="copyPromo()" style="margin-top:8px;font-size:.74rem;color:var(--sky);background:none;border:none;cursor:pointer;font-weight:600;">📋 Copier le code</button>
        </div>
        <button onclick="closePopupShop()" style="width:100%;background:var(--rose);color:white;border:none;border-radius:50px;padding:14px;font-size:.9rem;font-weight:700;cursor:pointer;font-family:inherit;">
          🛍️ Profiter de l'offre maintenant
        </button>
        <div style="margin-top:10px;font-size:.72rem;color:#9CA3AF;">*Code valable 7 jours · Offre d'une seule utilisation</div>
      </div>
    </div>`;

  const style = document.createElement('style');
  style.textContent = `@keyframes popup-in{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}`;
  document.head.appendChild(style);
  document.body.appendChild(popup);
  localStorage.setItem('milybo_popup_ts', Date.now().toString());

  // Close on backdrop click
  popup.addEventListener('click', e => { if (e.target === popup) closePopup(); });
}

function closePopup() {
  const p = document.getElementById('welcome-popup');
  if (p) { p.style.opacity = '0'; p.style.transition = 'opacity .3s'; setTimeout(() => p.remove(), 300); }
}
function closePopupShop() { closePopup(); window.location.href = 'boutique.html'; }
function copyPromo() {
  navigator.clipboard?.writeText('BIENVENUE10').then(() => {
    if (typeof showToast === 'function') showToast('📋 Code copié : BIENVENUE10 !', 'success');
    else alert('Code copié : BIENVENUE10');
  });
}

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
