// ============================================================
// MILYBO DZ – Livraison ZR Express (Tarifs par Wilaya)
// ============================================================

// Tarifs ZR Express À DOMICILE par wilaya (58 wilayas)
// Source: Grille tarifaire ZR Express personnalisée
const ZR_WILAYAS = [
  { code:'01', name:'Adrar',               domicile:1400, stopdesk:970,  retour:200 },
  { code:'02', name:'Chlef',               domicile:800,  stopdesk:520,  retour:200 },
  { code:'03', name:'Laghouat',            domicile:950,  stopdesk:670,  retour:200 },
  { code:'04', name:'Oum El Bouaghi',      domicile:800,  stopdesk:520,  retour:200 },
  { code:'05', name:'Batna',               domicile:800,  stopdesk:520,  retour:200 },
  { code:'06', name:'Béjaïa',             domicile:800,  stopdesk:520,  retour:200 },
  { code:'07', name:'Biskra',              domicile:950,  stopdesk:670,  retour:200 },
  { code:'08', name:'Béchar',             domicile:1100, stopdesk:720,  retour:200 },
  { code:'09', name:'Blida',               domicile:750,  stopdesk:520,  retour:200 },
  { code:'10', name:'Bouira',              domicile:800,  stopdesk:520,  retour:200 },
  { code:'11', name:'Tamanrasset',         domicile:1600, stopdesk:1120, retour:250 },
  { code:'12', name:'Tébessa',            domicile:900,  stopdesk:520,  retour:200 },
  { code:'13', name:'Tlemcen',             domicile:500,  stopdesk:300,  retour:200 }, // Wilaya de départ modifiée à 500/300
  { code:'14', name:'Tiaret',              domicile:750,  stopdesk:520,  retour:200 },
  { code:'15', name:'Tizi Ouzou',          domicile:800,  stopdesk:520,  retour:200 },
  { code:'16', name:'Alger',               domicile:650,  stopdesk:470,  retour:200 },
  { code:'17', name:'Djelfa',              domicile:950,  stopdesk:670,  retour:200 },
  { code:'18', name:'Jijel',               domicile:800,  stopdesk:520,  retour:200 },
  { code:'19', name:'Sétif',             domicile:800,  stopdesk:520,  retour:200 },
  { code:'20', name:'Saïda',             domicile:750,  stopdesk:570,  retour:200 },
  { code:'21', name:'Skikda',              domicile:800,  stopdesk:520,  retour:200 },
  { code:'22', name:'Sidi Bel Abbès',     domicile:700,  stopdesk:520,  retour:200 },
  { code:'23', name:'Annaba',              domicile:850,  stopdesk:520,  retour:200 },
  { code:'24', name:'Guelma',              domicile:850,  stopdesk:520,  retour:200 },
  { code:'25', name:'Constantine',         domicile:800,  stopdesk:520,  retour:200 },
  { code:'26', name:'Médéa',             domicile:750,  stopdesk:520,  retour:200 },
  { code:'27', name:'Mostaganem',          domicile:700,  stopdesk:520,  retour:200 },
  { code:'28', name:"M'Sila",             domicile:900,  stopdesk:670,  retour:200 },
  { code:'29', name:'Mascara',             domicile:700,  stopdesk:520,  retour:200 },
  { code:'30', name:'Ouargla',             domicile:1000, stopdesk:720,  retour:200 },
  { code:'31', name:'Oran',                domicile:700,  stopdesk:520,  retour:200 },
  { code:'32', name:'El Bayadh',           domicile:1000, stopdesk:670,  retour:200 },
  { code:'33', name:'Illizi',              domicile:1600, stopdesk:1120, retour:250 },
  { code:'34', name:'Bordj Bou Arréridj', domicile:800,  stopdesk:520,  retour:200 },
  { code:'35', name:'Boumerdès',          domicile:800,  stopdesk:520,  retour:200 },
  { code:'36', name:'El Tarf',             domicile:850,  stopdesk:520,  retour:200 },
  { code:'37', name:'Tindouf',             domicile:1600, stopdesk:1120, retour:250 },
  { code:'38', name:'Tissemsilt',          domicile:750,  stopdesk:520,  retour:200 },
  { code:'39', name:'El Oued',             domicile:1000, stopdesk:720,  retour:200 },
  { code:'40', name:'Khenchela',           domicile:800,  stopdesk:450,  retour:200 }, // Khenchela stopdesk 450 DA
  { code:'41', name:'Souk Ahras',          domicile:800,  stopdesk:520,  retour:200 },
  { code:'42', name:'Tipaza',              domicile:800,  stopdesk:520,  retour:200 },
  { code:'43', name:'Mila',                domicile:800,  stopdesk:520,  retour:200 },
  { code:'44', name:'Ain Defla',           domicile:750,  stopdesk:520,  retour:200 },
  { code:'45', name:'Naama',               domicile:1000, stopdesk:670,  retour:200 },
  { code:'46', name:'Ain Temouchent',      domicile:650,  stopdesk:520,  retour:200 },
  { code:'47', name:'Ghardaia',            domicile:1000, stopdesk:670,  retour:200 },
  { code:'48', name:'Relizane',            domicile:750,  stopdesk:520,  retour:200 },
  { code:'49', name:'Timimoun',            domicile:1400, stopdesk:970,  retour:200 },
  { code:'50', name:'Bordj Badji Mokhtar',domicile:1600, stopdesk:1120, retour:250 },
  { code:'51', name:'Ouled Djellal',       domicile:950,  stopdesk:670,  retour:200 },
  { code:'52', name:'Beni Abbes',          domicile:1200, stopdesk:970,  retour:200 },
  { code:'53', name:'In Salah',            domicile:1600, stopdesk:1120, retour:250 },
  { code:'54', name:'In Guezzam',          domicile:1600, stopdesk:0,    retour:250 },
  { code:'55', name:'Touggourt',           domicile:1000, stopdesk:720,  retour:200 },
  { code:'56', name:'Djanet',              domicile:1600, stopdesk:1120, retour:250 },
  { code:'57', name:"El Meghaier",         domicile:1000, stopdesk:0,    retour:200 },
  { code:'58', name:'El Menia',            domicile:1000, stopdesk:720,  retour:200 }
];

// ── Helpers ──────────────────────────────────────────────────

function getZRWilayaByCode(code) {
  return ZR_WILAYAS.find(w => w.code === code);
}

function getZRDeliveryPrice(wilayaCode) {
  const w = getZRWilayaByCode(wilayaCode);
  return w ? w.domicile : 800;
}

function getZRStopDeskPrice(wilayaCode) {
  const w = getZRWilayaByCode(wilayaCode);
  return w ? w.stopdesk : 500;
}

function generateTrackingNumber() {
  const prefix = 'MLBO';
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  const date = new Date().toISOString().slice(2,10).replace(/-/g,'');
  return `${prefix}-${date}-${rand}`;
}

// Peupler un <select> avec les 58 wilayas + prix ZR
function populateZRWilayaSelect(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = '<option value="">Sélectionnez votre wilaya… / اختاري ولايتك</option>';
  ZR_WILAYAS.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.code;
    // Afficher les deux tarifs clairement
    const stopLabel = w.stopdesk > 0 ? `Point Relais: ${w.stopdesk} DA` : 'Point Relais: non disponible';
    opt.textContent = `${w.code} – ${w.name} | 🏠 ${w.domicile} DA  📦 ${w.stopdesk > 0 ? w.stopdesk + ' DA' : 'N/A'}`;
    sel.appendChild(opt);
  });
}
