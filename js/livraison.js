// ============================================================
// MILYBO DZ – Livraison & Paiement (marché algérien)
// ============================================================

// ── Zones de livraison par wilaya ─────────────────────────────
const WILAYAS = [
  { code:'01', name:'Adrar',               zone:'sud'  },
  { code:'02', name:'Chlef',               zone:'nord' },
  { code:'03', name:'Laghouat',            zone:'sud'  },
  { code:'04', name:'Oum El Bouaghi',      zone:'nord' },
  { code:'05', name:'Batna',               zone:'nord' },
  { code:'06', name:'Béjaïa',             zone:'nord' },
  { code:'07', name:'Biskra',              zone:'sud'  },
  { code:'08', name:'Béchar',             zone:'sud'  },
  { code:'09', name:'Blida',               zone:'alger'},
  { code:'10', name:'Bouira',              zone:'nord' },
  { code:'11', name:'Tamanrasset',         zone:'sud'  },
  { code:'12', name:'Tébessa',            zone:'nord' },
  { code:'13', name:'Tlemcen',             zone:'nord' },
  { code:'14', name:'Tiaret',              zone:'nord' },
  { code:'15', name:'Tizi Ouzou',          zone:'nord' },
  { code:'16', name:'Alger',               zone:'alger'},
  { code:'17', name:'Djelfa',              zone:'sud'  },
  { code:'18', name:'Jijel',               zone:'nord' },
  { code:'19', name:'Sétif',             zone:'nord' },
  { code:'20', name:'Saïda',             zone:'nord' },
  { code:'21', name:'Skikda',              zone:'nord' },
  { code:'22', name:'Sidi Bel Abbès',     zone:'nord' },
  { code:'23', name:'Annaba',              zone:'nord' },
  { code:'24', name:'Guelma',              zone:'nord' },
  { code:'25', name:'Constantine',         zone:'nord' },
  { code:'26', name:'Médéa',             zone:'alger'},
  { code:'27', name:'Mostaganem',          zone:'nord' },
  { code:'28', name:"M'Sila",             zone:'sud'  },
  { code:'29', name:'Mascara',             zone:'nord' },
  { code:'30', name:'Ouargla',             zone:'sud'  },
  { code:'31', name:'Oran',                zone:'nord' },
  { code:'32', name:'El Bayadh',           zone:'sud'  },
  { code:'33', name:'Illizi',              zone:'sud'  },
  { code:'34', name:'Bordj Bou Arréridj', zone:'nord' },
  { code:'35', name:'Boumerdès',          zone:'alger'},
  { code:'36', name:'El Tarf',             zone:'nord' },
  { code:'37', name:'Tindouf',             zone:'sud'  },
  { code:'38', name:'Tissemsilt',          zone:'nord' },
  { code:'39', name:'El Oued',             zone:'sud'  },
  { code:'40', name:'Khenchela',           zone:'nord' },
  { code:'41', name:'Souk Ahras',          zone:'nord' },
  { code:'42', name:'Tipaza',              zone:'alger'},
  { code:'43', name:'Mila',                zone:'nord' },
  { code:'44', name:'Aïn Defla',         zone:'nord' },
  { code:'45', name:'Naâma',             zone:'sud'  },
  { code:'46', name:'Aïn Témouchent',    zone:'nord' },
  { code:'47', name:'Ghardaïa',          zone:'sud'  },
  { code:'48', name:'Relizane',            zone:'nord' },
  { code:'49', name:'Timimoun',            zone:'sud'  },
  { code:'50', name:'Bordj Badji Mokhtar',zone:'sud'  },
  { code:'51', name:'Ouled Djellal',       zone:'sud'  },
  { code:'52', name:'Béni Abbès',        zone:'sud'  },
  { code:'53', name:'In Salah',            zone:'sud'  },
  { code:'54', name:'In Guezzam',          zone:'sud'  },
  { code:'55', name:'Touggourt',           zone:'sud'  },
  { code:'56', name:'Djanet',              zone:'sud'  },
  { code:'57', name:"El M'Ghair",         zone:'sud'  },
  { code:'58', name:'El Meniaa',           zone:'sud'  }
];

// ── Tarifs de livraison ───────────────────────────────────────
const DELIVERY_ZONES = {
  alger: { label:'Zone Alger',        price:200, delay:'24–48h',      icon:'🏙️' },
  nord:  { label:'Zone Nord',         price:350, delay:'2–3 jours',   icon:'🌊' },
  sud:   { label:'Zone Sud',          price:500, delay:'3–5 jours',   icon:'🏜️' }
};

const FREE_DELIVERY_THRESHOLD = 5000; // DA

// ── Transporteurs ─────────────────────────────────────────────
const CARRIERS = [
  { id:'yalidine',  name:'Yalidine',  logo:'🟡', tracking:'https://yalidine.app/track', delay:'24–72h',    covered:['alger','nord','sud'] },
  { id:'maystro',   name:'Maystro',   logo:'🔵', tracking:'https://maystro-delivery.com', delay:'48h',    covered:['alger','nord'] },
  { id:'procolis',  name:'Procolis',  logo:'🟠', tracking:'https://procolis.com',       delay:'2–4 jours', covered:['alger','nord','sud'] },
  { id:'ecotrack',  name:'Ecotrack',  logo:'🟢', tracking:'https://ecotrack.dz',        delay:'24–72h',    covered:['alger','nord','sud'] }
];

// ── Méthodes de paiement ──────────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: 'cash',
    name: 'Paiement à la livraison',
    nameAr: 'الدفع عند الاستلام',
    icon: '💵',
    desc: 'Payez en espèces au livreur · الدفع نقداً عند التوصيل',
    available: true,
    badge: 'Recommandé'
  },
  {
    id: 'ccp',
    name: 'Virement CCP / Baridimob',
    nameAr: 'تحويل بريدي / بريدي موب',
    icon: '🏦',
    desc: 'Virement sur compte CCP · أو عبر تطبيق بريدي موب',
    available: true,
    badge: null
  },
  {
    id: 'baridipay',
    name: 'BaridiPay (en ligne)',
    nameAr: 'بريدي باي',
    icon: '💳',
    desc: 'Paiement sécurisé en ligne · دفع إلكتروني آمن',
    available: false, // Disponible prochainement
    badge: 'Bientôt'
  }
];

// ── Helpers ───────────────────────────────────────────────────

function getWilayaByCode(code) {
  return WILAYAS.find(w => w.code === code);
}

function getDeliveryPrice(wilayaCode, cartTotal) {
  const w = getWilayaByCode(wilayaCode);
  if (!w) return 500;
  if (cartTotal >= FREE_DELIVERY_THRESHOLD) return 0;
  return DELIVERY_ZONES[w.zone].price;
}

function getZoneInfo(wilayaCode) {
  const w = getWilayaByCode(wilayaCode);
  return w ? DELIVERY_ZONES[w.zone] : DELIVERY_ZONES.nord;
}

function getCarriersForZone(zone) {
  return CARRIERS.filter(c => c.covered.includes(zone));
}

function generateTrackingNumber() {
  const prefix = 'MLBO';
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  const date = new Date().toISOString().slice(2,10).replace(/-/g,'');
  return `${prefix}-${date}-${rand}`;
}

function populateWilayaSelect(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = '<option value="">Sélectionnez votre wilaya… / اختاري ولايتك</option>';
  WILAYAS.forEach(w => {
    const zone = DELIVERY_ZONES[w.zone];
    const opt = document.createElement('option');
    opt.value = w.code;
    opt.textContent = `${w.code} – ${w.name} (${zone.icon} ${zone.price === 0 ? 'Gratuit' : zone.price + ' DA'})`;
    sel.appendChild(opt);
  });
}

function renderPaymentMethods(containerId, selectedId = 'cash') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = PAYMENT_METHODS.map(m => `
    <label class="payment-option-card ${!m.available ? 'disabled' : ''} ${m.id === selectedId ? 'selected' : ''}"
           style="display:flex;align-items:flex-start;gap:14px;padding:16px 18px;border-radius:var(--radius-md);
                  border:2px solid ${m.id === selectedId ? 'var(--rose)' : 'var(--cream-dark)'};
                  background:${m.id === selectedId ? 'var(--rose-pale)' : 'white'};
                  cursor:${m.available ? 'pointer' : 'not-allowed'};
                  opacity:${m.available ? '1' : '.55'};margin-bottom:10px;transition:all .25s;">
      <input type="radio" name="payment-method" value="${m.id}"
             ${m.id === selectedId ? 'checked' : ''}
             ${!m.available ? 'disabled' : ''}
             onchange="selectPayment('${m.id}')"
             style="margin-top:4px;accent-color:var(--rose);" />
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
          <span style="font-size:1.3rem;">${m.icon}</span>
          <strong style="font-size:.9rem;color:var(--text-dark);">${m.name}</strong>
          ${m.badge ? `<span style="background:${m.id==='cash'?'var(--mint)':'var(--sky-light)'};color:${m.id==='cash'?'white':'var(--sky)'};font-size:.66rem;font-weight:800;padding:2px 8px;border-radius:20px;">${m.badge}</span>` : ''}
        </div>
        <div style="font-family:var(--font-arabic);font-size:.76rem;color:var(--text-soft);direction:rtl;margin-bottom:2px;">${m.nameAr}</div>
        <div style="font-size:.78rem;color:var(--text-mid);">${m.desc}</div>
      </div>
    </label>
  `).join('');
}

function renderCarriers(containerId, zone) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const available = getCarriersForZone(zone);
  container.innerHTML = available.map((c, i) => `
    <label style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:var(--radius-md);
                  border:2px solid ${i===0?'var(--rose)':'var(--cream-dark)'};
                  background:${i===0?'var(--rose-pale)':'white'};
                  cursor:pointer;margin-bottom:8px;transition:all .25s;"
           onchange="document.querySelectorAll('[name=carrier]').forEach(r=>{r.closest('label').style.borderColor='var(--cream-dark)';r.closest('label').style.background='white';});this.style.borderColor='var(--rose)';this.style.background='var(--rose-pale)';">
      <input type="radio" name="carrier" value="${c.id}" ${i===0?'checked':''} style="accent-color:var(--rose);" />
      <span style="font-size:1.2rem;">${c.logo}</span>
      <div style="flex:1;">
        <strong style="font-size:.88rem;color:var(--text-dark);">${c.name}</strong>
        <div style="font-size:.76rem;color:var(--text-soft);">⏱️ ${c.delay}</div>
      </div>
    </label>
  `).join('');
}

// ── Order tracking simulation ─────────────────────────────────
function getOrderStatus(trackingNum) {
  const orders = JSON.parse(localStorage.getItem('milybo_orders') || '[]');
  return orders.find(o => o.tracking === trackingNum) || null;
}

const ORDER_STEPS = [
  { id:'confirmed', label:'Commande confirmée',   labelAr:'تأكيد الطلب',      icon:'✅' },
  { id:'preparing', label:'En cours de préparation', labelAr:'تحضير الطلب',  icon:'📦' },
  { id:'shipped',   label:'Expédiée',               labelAr:'تم الشحن',        icon:'🚚' },
  { id:'delivered', label:'Livrée',                 labelAr:'تم التوصيل',      icon:'🎉' }
];

function renderTrackingTimeline(order) {
  const currentIdx = ORDER_STEPS.findIndex(s => s.id === order.status);
  return ORDER_STEPS.map((step, i) => {
    const done    = i <= currentIdx;
    const current = i === currentIdx;
    return `
      <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:${i<ORDER_STEPS.length-1?'0':'0'};">
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="width:36px;height:36px;border-radius:50%;
               background:${done?'var(--rose)':'var(--cream)'};
               color:${done?'white':'var(--text-soft)'};
               display:flex;align-items:center;justify-content:center;
               font-size:${current?'1rem':'.9rem'};
               border:2px solid ${done?'var(--rose)':'var(--cream-dark)'};
               ${current?'box-shadow:0 0 0 4px var(--rose-pale);':''}
               flex-shrink:0;">${done?step.icon:'○'}</div>
          ${i<ORDER_STEPS.length-1?`<div style="width:2px;height:32px;background:${i<currentIdx?'var(--rose)':'var(--cream-dark)'};;margin:4px 0;"></div>`:''}
        </div>
        <div style="padding-top:6px;">
          <div style="font-size:.88rem;font-weight:${current?'800':'600'};color:${done?'var(--text-dark)':'var(--text-soft)'};">${step.label}</div>
          <div style="font-family:var(--font-arabic);font-size:.74rem;color:var(--text-soft);">${step.labelAr}</div>
        </div>
      </div>`;
  }).join('');
}
