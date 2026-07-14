// ============================================================
// MILYBO DZ – Shop Filters v3
// Filtres: ageGroup · category (dynamique Firestore)
// ============================================================

let currentFilters = { ageGroup: [], category: [] };
let currentSort = 'default';

function initShop() {
  // PRODUCTS is set by main.js after Firestore load - render whatever we have
  renderShopGrid(PRODUCTS);
  updateResultsCount(PRODUCTS.length);
  document.getElementById('sort-select')?.addEventListener('change', e => {
    currentSort = e.target.value;
    applyFilters();
  });
  // Handle URL params (age, category)
  const params = new URLSearchParams(window.location.search);
  const age = params.get('age') || params.get('ageGroup');
  const cat = params.get('category');
  if (age) { setFilterFromParam('ageGroup', age); }
  if (cat) { setFilterFromParam('category', cat); }
}

// ── Charger les catégories depuis Firestore ──────────────────
async function loadCategoriesFromFirestore() {
  const container = document.getElementById('category-filter-body');
  if (!container) return;

  try {
    let types = [];
    if (window.db) {
      types = await window.db.getTypes();
    }

    if (!types || types.length === 0) {
      container.innerHTML = '<p style="color:var(--text-soft);font-size:.8rem;">Aucune catégorie disponible.</p>';
      return;
    }

    // Trier alphabétiquement par nom
    types.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    container.innerHTML = types.map(t => {
      const val = (t.slug || t.id || t.name || '').toLowerCase();
      const label = t.name || t.id || val;
      const emoji = t.emoji || '';
      return `<label class="filter-option">
        <input type="checkbox" class="filter-cb" data-type="category" data-val="${val}"
          onchange="toggleFilter('category','${val}')" />
        ${emoji} ${label}
      </label>`;
    }).join('');

  } catch (e) {
    console.error('Erreur chargement catégories:', e);
    container.innerHTML = '<p style="color:var(--text-soft);font-size:.8rem;">Erreur chargement catégories.</p>';
  }
}

// Écouter firebase-ready pour charger les catégories
window.addEventListener('firebase-ready', loadCategoriesFromFirestore);
// Aussi réessayer quand les produits sont chargés (double filet)
window.addEventListener('products-loaded-from-firestore', loadCategoriesFromFirestore);

function setFilterFromParam(type, value) {
  if (!currentFilters[type].includes(value)) {
    currentFilters[type].push(value);
    const cb = document.querySelector(`input[data-type="${type}"][data-val="${value}"]`);
    if (cb) cb.checked = true;
    applyFilters();
    updateActiveFilters();
  }
}

function toggleFilter(type, value) {
  const arr = currentFilters[type];
  const idx = arr.indexOf(value);
  if (idx === -1) arr.push(value); else arr.splice(idx, 1);
  applyFilters();
  updateActiveFilters();
}

function applyFilters() {
  let results = PRODUCTS.filter(p => {
    const ageOk = currentFilters.ageGroup.length === 0 || currentFilters.ageGroup.includes(p.ageGroup);
    const catOk = currentFilters.category.length === 0 || currentFilters.category.includes(p.category);
    return ageOk && catOk;
  });

  if (currentSort === 'price-asc')  results.sort((a,b) => a.price - b.price);
  if (currentSort === 'price-desc') results.sort((a,b) => b.price - a.price);
  if (currentSort === 'rating')     results.sort((a,b) => b.rating - a.rating);
  if (currentSort === 'new')        results = results.filter(p => p.badge === 'new').concat(results.filter(p => p.badge !== 'new'));
  if (currentSort === 'promo')      results = results.filter(p => p.oldPrice).concat(results.filter(p => !p.oldPrice));
  if (currentSort === 'stock-asc')  results.sort((a,b) => a.stock - b.stock);

  renderShopGrid(results);
  updateResultsCount(results.length);
}

function renderShopGrid(products) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 20px;">
        <div style="font-size:3.5rem;margin-bottom:16px;">😔</div>
        <h3 style="color:var(--text-dark);margin-bottom:8px;font-size:1.2rem;">Aucun produit trouvé</h3>
        <p style="color:var(--text-soft);margin-bottom:20px;">ما كاش منتوج – Essayez d'autres filtres.</p>
        <button onclick="resetFilters()" class="btn btn-primary">🔄 Réinitialiser</button>
      </div>`;
    return;
  }
  grid.innerHTML = products.map(p => renderProductCard(p)).join('');
}

function updateResultsCount(count) {
  const el = document.getElementById('results-count');
  if (el) el.innerHTML = `<strong>${count}</strong> produit${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`;
}

const FILTER_LABELS = {
  ageGroup: { 'nouveau-ne': 'Nouveau-né', 'nourrisson': 'Nourrisson', 'tout-petit': 'Tout-petit' },
  category: {}
};

function updateActiveFilters() {
  const container = document.getElementById('active-filters');
  if (!container) return;
  const chips = [];
  ['ageGroup','category'].forEach(type => {
    currentFilters[type].forEach(v => {
      const label = FILTER_LABELS[type][v] || v;
      chips.push(`<div class="filter-chip">${label} <button onclick="removeFilter('${type}','${v}')">✕</button></div>`);
    });
  });
  container.innerHTML = chips.join('');
}

function removeFilter(type, value) {
  currentFilters[type] = currentFilters[type].filter(v => v !== value);
  const cb = document.querySelector(`input[data-type="${type}"][data-val="${value}"]`);
  if (cb) cb.checked = false;
  applyFilters();
  updateActiveFilters();
}

function resetFilters() {
  currentFilters = { ageGroup: [], category: [] };
  document.querySelectorAll('.filter-cb').forEach(cb => cb.checked = false);
  applyFilters();
  updateActiveFilters();
}

function searchProducts(query) {
  if (!query.trim()) { renderShopGrid(PRODUCTS); updateResultsCount(PRODUCTS.length); return; }
  const q = query.toLowerCase().trim();
  const results = PRODUCTS.filter(p =>
    (p.name || '').toLowerCase().includes(q) ||
    (p.nameAr || '').includes(q) ||
    (p.categoryLabel || '').toLowerCase().includes(q) ||
    (p.matiereLabel || '').toLowerCase().includes(q)
  );
  renderShopGrid(results);
  updateResultsCount(results.length);
}
