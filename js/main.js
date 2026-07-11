// ============================================================
// MILYBO DZ – Main Navigation & Shared UI
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initAnimations();
    highlightCurrentPage();
});

// ── Sticky header shadow on scroll ───────────────────────────
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    // Mobile burger menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    burger?.addEventListener('click', () => {
        nav?.classList.toggle('open');
        const spans = burger.querySelectorAll('span');
        if (nav?.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    // Header search
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');
    searchBtn?.addEventListener('click', () => handleSearch(searchInput?.value));
    searchInput?.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleSearch(searchInput.value);
    });
}

function handleSearch(query) {
    if (!query?.trim()) return;
    if (window.location.pathname.includes('boutique')) {
        searchProducts(query);
    } else {
        window.location.href = `boutique.html?q=${encodeURIComponent(query)}`;
    }
}

// ── Highlight active nav link ─────────────────────────────────
function highlightCurrentPage() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ── Intersection Observer for fade-in-up animations ──────────
function initAnimations() {
    const cards = document.querySelectorAll('.fade-in-up, .product-card, .category-card, .feature-card');
    if (!cards.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 55);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '60px 0px 0px 0px' });

    cards.forEach((card, idx) => {
        card.style.transition = 'opacity .45s ease, transform .45s ease';
        const rect = card.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, idx * 40);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(18px)';
            observer.observe(card);
        }
    });
}

// ── Toast Notification ────────────────────────────────────────
function showToast(msg, type = 'default') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('hide'); setTimeout(() => toast.remove(), 300); }, 3500);
}

// ── Contact Form Logic ────────────────────────────────────────
function initContactForm() {
    document.getElementById('contact-form')?.addEventListener('submit', e => {
        e.preventDefault();
        showToast('✅ Message envoyé ! Nous vous répondrons sous 24h.', 'success');
        e.target.reset();
    });
}

// ── Category click (index.html → boutique with filter) ───────
function goToCategory(age) {
    window.location.href = `boutique.html?ageGroup=${age}`;
}

// ── Async Boutique Loader (Firebase + fallback) ───────────────
let dbBoutiqueLoaded = false;
async function loadBoutique() {
    if (dbBoutiqueLoaded) return;
    dbBoutiqueLoaded = true;
    if (window.db) {
        try {
            const firestoreProducts = await window.db.getProducts();
            if (firestoreProducts && firestoreProducts.length) {
                PRODUCTS = firestoreProducts;
            }
        } catch (e) {
            console.warn('Firebase fallback to local PRODUCTS:', e);
        }
    }
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) searchInput.value = q;
    }
    initShop();
    if (q) searchProducts(q);
}

window.addEventListener('load', () => {
    const path = window.location.pathname;
    if (path.includes('boutique')) {
        if (window.db) {
            loadBoutique();
        } else {
            window.addEventListener('firebase-ready', loadBoutique);
            setTimeout(loadBoutique, 2000); // fallback si Firebase lent
        }
    }
    if (path.includes('contact')) {
        initContactForm();
    }
});
