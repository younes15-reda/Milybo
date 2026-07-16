// Configuration Firebase de l'application Milybo DZ
const firebaseConfig = {
  apiKey: "AIzaSyAjq_MZZBniosiWUNcqi4XdRum5mUS7I84",
  authDomain: "milybo-969df.firebaseapp.com",
  projectId: "milybo-969df",
  storageBucket: "milybo-969df.firebasestorage.app",
  messagingSenderId: "35710826746",
  appId: "1:35710826746:web:dbcd7d7bfd45cceabdb143",
  measurementId: "G-TYJB6HB0PV"
};

// Export pour utilisation globale
window.firebaseConfig = firebaseConfig;
window.adminPassword = "admin2024bebechic";

// ── URL de base du site ───────────────────────────────────────
window.siteBaseUrl = "https://younes15-reda.github.io/Milybo";

// ── Notifications WhatsApp automatiques (CallMeBot API) ───────
// ÉTAPE D'ACTIVATION :
// 1. Envoyez "I allow callmebot to send me messages" au +34 644 59 26 19 sur WhatsApp
// 2. Vous recevrez une apikey (ex: 123456)
// 3. Remplacez '' ci-dessous par votre apikey
window.callmebotApiKey = ''; // <-- Mettez votre apikey ici (ex: '123456')
window.callmebotPhone  = '213559449995'; // Votre numéro WhatsApp

// ── Notifications Email automatiques (EmailJS) ────────────────
// ÉTAPE D'ACTIVATION :
// 1. Créez un compte gratuit sur https://www.emailjs.com/
// 2. Connectez votre Gmail et créez un template d'email
// 3. Remplissez les 3 champs ci-dessous
window.emailjsServiceId  = ''; // <-- Ex: 'service_abc123'
window.emailjsTemplateId = ''; // <-- Ex: 'template_xyz789'
window.emailjsPublicKey  = ''; // <-- Ex: 'user_ABCDEFGHIJK'


