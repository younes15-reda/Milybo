// ============================================================
// MILYBO DZ – Catalogue Produits v2 (prix en DA)
// Catégories : nouveau-né (0-3m) · nourrisson (3-12m) · tout-petit (12-36m)
// Saisons    : ete · hiver · mi-saison
// Occasions  : quotidien · fete · sortie
// ============================================================

let PRODUCTS = [
  {
    id: 1,
    name: "Barboteuse Étoiles Roses",
    nameAr: "بربوتيز نجوم وردية",
    category: "barboteuse",
    categoryLabel: "Barboteuse",
    ageGroup: "nouveau-ne",
    ageGroupLabel: "Nouveau-né (0–3 mois)",
    age: "0-6",
    ageLabel: "0–3 mois",
    saison: "ete",
    saisonLabel: "Été",
    occasion: "quotidien",
    occasionLabel: "Quotidien",
    sizes: ["NB","3M"],
    matiere: "coton",
    matiereLabel: "Coton 100%",
    price: 1800,
    oldPrice: 2400,
    stock: 12,
    badge: "promo",
    badgeLabel: "-25%",
    color: "#F9A8D4",
    emoji: "🌸",
    photos: ["🌸","🛍️","✨"],
    rating: 4.8,
    reviewCount: 24,
    reviews: [
      { name: "Amira", note: 5, comment: "Très doux, ma fille l'adore !", date: "2025-03-10" },
      { name: "سارة", note: 5, comment: "جودة ممتازة وسريع التوصيل", date: "2025-03-05" },
      { name: "Lynda", note: 4, comment: "Belle qualité, couleur conforme.", date: "2025-02-28" }
    ]
  },
  {
    id: 2,
    name: "Pyjama Nuages Bleus",
    nameAr: "بيجامة غيوم زرقاء",
    category: "pyjama",
    categoryLabel: "Pyjama",
    ageGroup: "nouveau-ne",
    ageGroupLabel: "Nouveau-né (0–3 mois)",
    age: "0-6",
    ageLabel: "0–3 mois",
    saison: "mi-saison",
    saisonLabel: "Mi-saison",
    occasion: "quotidien",
    occasionLabel: "Quotidien",
    sizes: ["NB","3M"],
    matiere: "coton",
    matiereLabel: "Coton doux",
    price: 2200,
    oldPrice: null,
    stock: 8,
    badge: null,
    color: "#A5D8FF",
    emoji: "☁️",
    photos: ["☁️","🌙","💫"],
    rating: 4.6,
    reviewCount: 18,
    reviews: [
      { name: "Nadia", note: 5, comment: "Parfait pour les nuits fraîches.", date: "2025-03-12" },
      { name: "كريمة", note: 4, comment: "ناعم جداً على بشرة البيبي", date: "2025-03-01" }
    ]
  },
  {
    id: 3,
    name: "Body Coton Bio Blanc",
    nameAr: "بودي قطن عضوي أبيض",
    category: "body",
    categoryLabel: "Body",
    ageGroup: "nouveau-ne",
    ageGroupLabel: "Nouveau-né (0–3 mois)",
    age: "0-6",
    ageLabel: "0–3 mois",
    saison: "ete",
    saisonLabel: "Été",
    occasion: "quotidien",
    occasionLabel: "Quotidien",
    sizes: ["NB","3M"],
    matiere: "coton",
    matiereLabel: "Coton Bio",
    price: 1200,
    oldPrice: null,
    stock: 20,
    badge: null,
    color: "#F1F5F9",
    emoji: "🤍",
    photos: ["🤍","👶","🌿"],
    rating: 4.9,
    reviewCount: 41,
    reviews: [
      { name: "Fatima", note: 5, comment: "Excellent pour les peaux sensibles.", date: "2025-03-15" },
      { name: "إيمان", note: 5, comment: "أفضل بودي جربته لبيبيتي", date: "2025-03-08" }
    ]
  },
  {
    id: 4,
    name: "Coffret Naissance Complet",
    nameAr: "طقم مولود كامل",
    category: "coffret",
    categoryLabel: "Coffret Cadeau",
    ageGroup: "nouveau-ne",
    ageGroupLabel: "Nouveau-né (0–3 mois)",
    age: "0-6",
    ageLabel: "0–3 mois",
    saison: "mi-saison",
    saisonLabel: "Mi-saison",
    occasion: "fete",
    occasionLabel: "Fête / Cadeau",
    sizes: ["NB","3M"],
    matiere: "coton",
    matiereLabel: "Coton + Velours",
    price: 8500,
    oldPrice: 10000,
    stock: 5,
    badge: "promo",
    badgeLabel: "-15%",
    color: "#FCE7F3",
    emoji: "🎁",
    photos: ["🎁","🎀","👶"],
    rating: 5.0,
    reviewCount: 32,
    reviews: [
      { name: "Meriem", note: 5, comment: "Magnifique cadeau de naissance !", date: "2025-03-20" },
      { name: "هاجر", note: 5, comment: "هدية رائعة وتغليف جميل جداً", date: "2025-03-14" }
    ]
  },
  {
    id: 5,
    name: "Ensemble 2 Pièces Ourson",
    nameAr: "طقم قطعتين دبدوب",
    category: "ensemble",
    categoryLabel: "Ensemble",
    ageGroup: "nourrisson",
    ageGroupLabel: "Nourrisson (3–12 mois)",
    age: "6-12",
    ageLabel: "3–12 mois",
    saison: "mi-saison",
    saisonLabel: "Mi-saison",
    occasion: "sortie",
    occasionLabel: "Sortie",
    sizes: ["3M","6M","9M","12M"],
    matiere: "coton",
    matiereLabel: "Coton molletonné",
    price: 2900,
    oldPrice: null,
    stock: 15,
    badge: "new",
    badgeLabel: "Nouveau",
    color: "#93C5FD",
    emoji: "🐻",
    photos: ["🐻","👕","👖"],
    rating: 4.7,
    reviewCount: 29,
    reviews: [
      { name: "Souad", note: 5, comment: "Très mignon, il l'a adoré !", date: "2025-03-18" },
      { name: "نسرين", note: 4, comment: "جيد لكن الحجم أكبر قليلاً", date: "2025-03-10" }
    ]
  },
  {
    id: 6,
    name: "Salopette Jean Bébé",
    nameAr: "سالوبيت جينز للبيبي",
    category: "salopette",
    categoryLabel: "Salopette",
    ageGroup: "nourrisson",
    ageGroupLabel: "Nourrisson (3–12 mois)",
    age: "6-12",
    ageLabel: "6–12 mois",
    saison: "mi-saison",
    saisonLabel: "Mi-saison",
    occasion: "sortie",
    occasionLabel: "Sortie",
    sizes: ["6M","9M","12M"],
    matiere: "jean",
    matiereLabel: "Denim doux",
    price: 3100,
    oldPrice: 3800,
    stock: 9,
    badge: "promo",
    badgeLabel: "-18%",
    color: "#DBEAFE",
    emoji: "👖",
    photos: ["👖","👶","✨"],
    rating: 4.5,
    reviewCount: 16,
    reviews: [
      { name: "Assia", note: 5, comment: "Adorable et bien coupé.", date: "2025-03-05" },
      { name: "وردة", note: 4, comment: "جميل وسعره مناسب", date: "2025-02-25" }
    ]
  },
  {
    id: 7,
    name: "Chapeau Soleil Brodé",
    nameAr: "قبعة شمس مطرزة",
    category: "accessoire",
    categoryLabel: "Accessoire",
    ageGroup: "nourrisson",
    ageGroupLabel: "Nourrisson (3–12 mois)",
    age: "6-12",
    ageLabel: "6–12 mois",
    saison: "ete",
    saisonLabel: "Été",
    occasion: "sortie",
    occasionLabel: "Sortie",
    sizes: ["Unique"],
    matiere: "coton",
    matiereLabel: "Coton tissé",
    price: 950,
    oldPrice: null,
    stock: 25,
    badge: null,
    color: "#FED7AA",
    emoji: "👒",
    photos: ["👒","☀️","🌸"],
    rating: 4.4,
    reviewCount: 11,
    reviews: [
      { name: "Rania", note: 5, comment: "Parfait pour l'été !", date: "2025-03-02" }
    ]
  },
  {
    id: 8,
    name: "Body Manches Longues Rayé",
    nameAr: "بودي أكمام طويلة مخطط",
    category: "body",
    categoryLabel: "Body",
    ageGroup: "nourrisson",
    ageGroupLabel: "Nourrisson (3–12 mois)",
    age: "6-12",
    ageLabel: "3–9 mois",
    saison: "mi-saison",
    saisonLabel: "Mi-saison",
    occasion: "quotidien",
    occasionLabel: "Quotidien",
    sizes: ["3M","6M","9M"],
    matiere: "coton",
    matiereLabel: "Coton jersey",
    price: 1400,
    oldPrice: null,
    stock: 18,
    badge: null,
    color: "#E0F2FE",
    emoji: "👕",
    photos: ["👕","🌈","✨"],
    rating: 4.3,
    reviewCount: 9,
    reviews: [
      { name: "Leila", note: 4, comment: "Bonne qualité, couleurs vives.", date: "2025-03-01" }
    ]
  },
  {
    id: 9,
    name: "Combinaison Hiver Polaire",
    nameAr: "كومبينيزون شتوي بولير",
    category: "combinaison",
    categoryLabel: "Combinaison",
    ageGroup: "nourrisson",
    ageGroupLabel: "Nourrisson (3–12 mois)",
    age: "6-12",
    ageLabel: "6–12 mois",
    saison: "hiver",
    saisonLabel: "Hiver",
    occasion: "sortie",
    occasionLabel: "Sortie",
    sizes: ["6M","9M","12M"],
    matiere: "polaire",
    matiereLabel: "Polaire doublée",
    price: 4200,
    oldPrice: 5000,
    stock: 7,
    badge: "promo",
    badgeLabel: "-16%",
    color: "#DDD6FE",
    emoji: "🧣",
    photos: ["🧣","❄️","🧥"],
    rating: 4.8,
    reviewCount: 22,
    reviews: [
      { name: "Djamila", note: 5, comment: "Très chaud, parfait pour l'hiver.", date: "2025-01-15" },
      { name: "أمال", note: 5, comment: "دافئ جداً وجودة عالية", date: "2025-01-10" }
    ]
  },
  {
    id: 10,
    name: "Pyjama Lapin Velours",
    nameAr: "بيجامة أرنب مخملية",
    category: "pyjama",
    categoryLabel: "Pyjama",
    ageGroup: "nourrisson",
    ageGroupLabel: "Nourrisson (3–12 mois)",
    age: "6-12",
    ageLabel: "6–12 mois",
    saison: "hiver",
    saisonLabel: "Hiver",
    occasion: "quotidien",
    occasionLabel: "Quotidien",
    sizes: ["6M","9M","12M"],
    matiere: "velours",
    matiereLabel: "Velours doux",
    price: 2700,
    oldPrice: null,
    stock: 14,
    badge: "new",
    badgeLabel: "Nouveau",
    color: "#E0E7FF",
    emoji: "🐰",
    photos: ["🐰","🌙","💜"],
    rating: 4.9,
    reviewCount: 35,
    reviews: [
      { name: "Hanane", note: 5, comment: "Mon bébé dort tellement mieux !", date: "2025-02-20" },
      { name: "زهرة", note: 5, comment: "ناعم ومريح لبيبيتي", date: "2025-02-15" }
    ]
  },
  {
    id: 11,
    name: "Robe Fleurie Dentelle",
    nameAr: "فستان زهري بالدانتيل",
    category: "robe",
    categoryLabel: "Robe",
    ageGroup: "tout-petit",
    ageGroupLabel: "Tout-petit (12–36 mois)",
    age: "12-24",
    ageLabel: "12–24 mois",
    saison: "ete",
    saisonLabel: "Été",
    occasion: "fete",
    occasionLabel: "Fête",
    sizes: ["12M","18M","24M"],
    matiere: "coton",
    matiereLabel: "Coton + Dentelle",
    price: 3400,
    oldPrice: null,
    stock: 10,
    badge: "new",
    badgeLabel: "Nouveau",
    color: "#FBCFE8",
    emoji: "🌺",
    photos: ["🌺","👗","🎀"],
    rating: 4.9,
    reviewCount: 28,
    reviews: [
      { name: "Yasmine", note: 5, comment: "Ma fille était la plus belle !", date: "2025-03-19" },
      { name: "نعيمة", note: 5, comment: "فستان رائع للحفلات", date: "2025-03-12" }
    ]
  },
  {
    id: 12,
    name: "Manteau Chaud Hiver",
    nameAr: "معطف شتوي دافئ",
    category: "manteau",
    categoryLabel: "Manteau",
    ageGroup: "tout-petit",
    ageGroupLabel: "Tout-petit (12–36 mois)",
    age: "12-24",
    ageLabel: "12–24 mois",
    saison: "hiver",
    saisonLabel: "Hiver",
    occasion: "sortie",
    occasionLabel: "Sortie",
    sizes: ["12M","18M","24M"],
    matiere: "laine",
    matiereLabel: "Laine bouillie",
    price: 5800,
    oldPrice: 6500,
    stock: 6,
    badge: "promo",
    badgeLabel: "-11%",
    color: "#FDE68A",
    emoji: "🧥",
    photos: ["🧥","❄️","🌟"],
    rating: 4.7,
    reviewCount: 19,
    reviews: [
      { name: "Sihem", note: 5, comment: "Chaud et élégant !", date: "2025-01-20" },
      { name: "فاطمة", note: 4, comment: "جيد لكن الحجم كبير شوية", date: "2025-01-18" }
    ]
  },
  {
    id: 13,
    name: "Ensemble Brodé Amazigh",
    nameAr: "طقم مطرز أمازيغي",
    category: "ensemble",
    categoryLabel: "Ensemble",
    ageGroup: "tout-petit",
    ageGroupLabel: "Tout-petit (12–36 mois)",
    age: "24-36",
    ageLabel: "24–36 mois",
    saison: "mi-saison",
    saisonLabel: "Mi-saison",
    occasion: "fete",
    occasionLabel: "Fête",
    sizes: ["24M","30M","36M"],
    matiere: "coton",
    matiereLabel: "Coton brodé",
    price: 4500,
    oldPrice: null,
    stock: 8,
    badge: "new",
    badgeLabel: "Exclusif",
    color: "#DDD6FE",
    emoji: "🌿",
    photos: ["🌿","🎨","✨"],
    rating: 4.8,
    reviewCount: 15,
    reviews: [
      { name: "Ourida", note: 5, comment: "Magnifique broderie !", date: "2025-03-10" },
      { name: "خديجة", note: 5, comment: "تطريز رائع وجودة عالية", date: "2025-03-05" }
    ]
  },
  {
    id: 14,
    name: "Robe Karakou Traditionnelle",
    nameAr: "فستان كراكو تقليدي",
    category: "robe",
    categoryLabel: "Robe",
    ageGroup: "tout-petit",
    ageGroupLabel: "Tout-petit (12–36 mois)",
    age: "24-36",
    ageLabel: "24–36 mois",
    saison: "mi-saison",
    saisonLabel: "Mi-saison",
    occasion: "fete",
    occasionLabel: "Fête",
    sizes: ["24M","30M","36M"],
    matiere: "velours",
    matiereLabel: "Velours brodé fil d'or",
    price: 6200,
    oldPrice: null,
    stock: 4,
    badge: "new",
    badgeLabel: "Exclusif",
    color: "#FECDD3",
    emoji: "💎",
    photos: ["💎","👑","✨"],
    rating: 5.0,
    reviewCount: 20,
    reviews: [
      { name: "Zineb", note: 5, comment: "Somptueux ! Ma fille était comme une princesse.", date: "2025-03-22" },
      { name: "أسماء", note: 5, comment: "لباس تقليدي رائع لحفل الختان", date: "2025-03-15" }
    ]
  },
  {
    id: 15,
    name: "Pyjama Hiver Étoiles",
    nameAr: "بيجامة شتوية نجمية",
    category: "pyjama",
    categoryLabel: "Pyjama",
    ageGroup: "tout-petit",
    ageGroupLabel: "Tout-petit (12–36 mois)",
    age: "12-24",
    ageLabel: "12–24 mois",
    saison: "hiver",
    saisonLabel: "Hiver",
    occasion: "quotidien",
    occasionLabel: "Quotidien",
    sizes: ["12M","18M","24M"],
    matiere: "velours",
    matiereLabel: "Velours chaud",
    price: 2900,
    oldPrice: 3500,
    stock: 11,
    badge: "promo",
    badgeLabel: "-17%",
    color: "#C7D2FE",
    emoji: "⭐",
    photos: ["⭐","🌙","💙"],
    rating: 4.6,
    reviewCount: 13,
    reviews: [
      { name: "Samia", note: 5, comment: "Doux et chaud, parfait !", date: "2025-02-10" }
    ]
  },
  {
    id: 16,
    name: "Salopette Velours Rose",
    nameAr: "سالوبيت مخمل وردي",
    category: "salopette",
    categoryLabel: "Salopette",
    ageGroup: "tout-petit",
    ageGroupLabel: "Tout-petit (12–36 mois)",
    age: "12-24",
    ageLabel: "12–24 mois",
    saison: "hiver",
    saisonLabel: "Hiver",
    occasion: "sortie",
    occasionLabel: "Sortie",
    sizes: ["12M","18M","24M"],
    matiere: "velours",
    matiereLabel: "Velours côtelé",
    price: 3600,
    oldPrice: null,
    stock: 9,
    badge: null,
    color: "#FBCFE8",
    emoji: "🌷",
    photos: ["🌷","👗","🎀"],
    rating: 4.7,
    reviewCount: 17,
    reviews: [
      { name: "Celia", note: 5, comment: "Adorable et très bien coupé.", date: "2025-02-28" },
      { name: "ليلى", note: 4, comment: "جميل جداً وسريع التوصيل", date: "2025-02-20" }
    ]
  }
];

// ── Helpers ──────────────────────────────────────────────────

function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
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
  const sizesHTML = (product.sizes || []).slice(0, 4).map(s =>
    `<span class="size-tag">${s}</span>`
  ).join('');
  const stockClass = product.stock <= 5 ? 'color:var(--rose);' : 'color:var(--mint);';
  const stockLabel = product.stock <= 5
    ? `⚠️ Plus que ${product.stock} en stock`
    : `✅ En stock (${product.stock})`;

  // Optimisation C & A : Beautiful SVG visual template fallback for clothes if no image URL is provided.
  const photo = product.photos?.[0] || '';
  let mediaHTML = '';
  if (photo.startsWith('http') || photo.startsWith('data:') || photo.includes('/') || photo.includes('.')) {
    // Real image with loading lazy & explicit size ratios (Optimisation A)
    mediaHTML = `<img src="${photo}" loading="lazy" width="300" height="300" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;display:block;" class="img-lazy" onload="this.classList.add('is-loaded')"/>`;
  } else {
    // Beautiful baby body shape SVG placeholder
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
         data-age="${product.age}" data-agegroup="${product.ageGroup}"
         data-category="${product.category}" data-price="${product.price}"
         data-saison="${product.saison}" data-occasion="${product.occasion}">
      ${badgeHTML}
      <a href="produit.html?id=${product.id}" style="text-decoration:none;display:block;">
        <div class="product-img-wrap" style="background:${product.color || '#EBF5FF'}25;position:relative;aspect-ratio:3/4;overflow:hidden;border-radius:16px;">
          ${mediaHTML}
        </div>
      </a>
      <button class="product-wislist-btn" onclick="toggleWishlist(this,${product.id})" style="position:absolute;top:10px;right:10px;">🤍</button>
      <div class="product-info">
        <div class="product-category">${product.categoryLabel || 'Collection'} · ${product.saisonLabel || 'Toutes saisons'}</div>
        <a href="produit.html?id=${product.id}" style="text-decoration:none;">
          <div class="product-name">${product.name}</div>
          <div class="product-name-ar">${product.nameAr || ''}</div>
        </a>
        <div style="font-size:.75rem;margin-bottom:6px;">
          <span style="color:#F59E0B;">★</span>
          <strong>${product.rating || 4.5}</strong>
          <span style="color:var(--text-soft);">(${product.reviewCount || 0} avis)</span>
        </div>
        <div class="product-sizes">${sizesHTML}</div>
        <div style="font-size:.7rem;${stockClass}margin-bottom:10px;">${stockLabel}</div>
        <div class="product-footer">
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
