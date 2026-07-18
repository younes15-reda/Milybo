// ============================================================
// MILYBO DZ – Catalogue Produits v2 (prix en DA)
// ============================================================

let PRODUCTS = [];

// ── Helpers ──────────────────────────────────────────────────

function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function renderStars(rating) {
  const full  = Math.floor(rating || 4.5);
  const half  = (rating || 4.5) % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function renderProductCard(product) {
  const oldPriceHTML = product.oldPrice
    ? `<span class="old">${product.oldPrice.toLocaleString('fr-DZ')} DA</span>`
    : '';
  const badgeHTML = product.badge
    ? `<div class="product-badge ${product.badge}">${product.badgeLabel}</div>`
    : '';

  const photo = product.photos?.[0] || '';
  let mediaHTML = '';
  if (photo.startsWith('http') || photo.startsWith('data:') || photo.includes('/') || photo.includes('.')) {
    mediaHTML = `<img src="${photo}" loading="lazy" width="300" height="300" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;display:block;" class="img-lazy" onload="this.classList.add('is-loaded')"/>`;
  } else {
    mediaHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;width:100%;color:var(--text-dark);position:relative;">
        <span style="font-size:2.8rem;z-index:2;margin-bottom:8px;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.1));">${photo || '🧸'}</span>
        <svg viewBox="0 0 100 100" width="60%" height="60%" style="position:absolute;opacity:0.08;color:currentColor;fill:currentColor;">
          <path d="M 50 15 C 45 15 42 12 40 12 C 38 12 35 15 30 15 C 24 15 20 22 20 30 C 20 45 25 50 30 55 C 32 57 34 65 34 75 C 34 85 40 90 50 90 C 60 90 66 85 66 75 C 66 65 68 57 70 55 C 75 50 80 45 80 30 C 80 22 76 15 70 15 C 65 15 62 12 60 12 C 58 12 55 15 50 15 Z"></path>
        </svg>
      </div>`;
  }

  return `
    <div class="product-card fade-in-up" data-id="${product.id}"
         data-age="${product.age || ''}" data-agegroup="${product.ageGroup || ''}"
         data-category="${product.category || ''}" data-price="${product.price}"
         data-saison="${product.saison || ''}" data-occasion="${product.occasion || ''}">
      ${badgeHTML}
      <a href="produit.html?id=${product.id}" style="text-decoration:none;display:block;">
        <div class="product-img-wrap" style="background:${product.color || '#EBF5FF'}25;position:relative;aspect-ratio:3/4;overflow:hidden;border-radius:16px;">
          ${mediaHTML}
        </div>
      </a>
      <button class="product-wislist-btn" onclick="toggleWishlist(this,${product.id})" style="position:absolute;top:10px;right:10px;">🤍</button>
      <div class="product-info">
        <a href="produit.html?id=${product.id}" style="text-decoration:none;">
          <div class="product-name">${product.name}</div>
          ${product.nameAr ? `<div class="product-name-ar">${product.nameAr}</div>` : ''}
        </a>
        <div class="product-footer" style="margin-top:10px;">
          <div class="product-price">
            ${oldPriceHTML}
            <span class="current">${product.price.toLocaleString('fr-DZ')} <span class="currency">DA</span></span>
          </div>
        </div>
        <button class="add-to-cart" onclick="location.href='produit.html?id=${product.id}'" style="width:100%; margin-top: 10px; background:var(--rose); color:white;">📱 Commander</button>
      </div>
    </div>
  `;
}

