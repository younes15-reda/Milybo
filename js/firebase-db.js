// ============================================================
// MILYBO DZ – Firebase Firestore Integration (v9 ES Module via CDN)
// Expose un objet window.db pour communiquer avec Firestore
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc,
  doc, 
  addDoc, 
  setDoc,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Initialisation Firebase
const app = initializeApp(window.firebaseConfig);
const firestore = getFirestore(app);

// Exposer l'objet db globalement
window.db = {
  // Récupérer tous les produits
  getProducts: async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "produits"));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      
      // Auto-seeding si Firestore est vide (confort développeur)
      if (products.length === 0 && typeof PRODUCTS !== 'undefined') {
        console.log("Firestore 'produits' est vide. Seeding des données initiales...");
        for (const p of PRODUCTS) {
          const { id, ...dataWithoutId } = p;
          await setDoc(doc(firestore, "produits", String(p.id)), dataWithoutId);
        }
        return PRODUCTS;
      }
      
      // Convertir l'id en nombre si c'est un entier numérique
      return products.map(p => ({
        ...p,
        id: isNaN(p.id) ? p.id : parseInt(p.id)
      }));
    } catch (e) {
      console.error("Erreur récupération produits Firestore, fallback local:", e);
      return typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
    }
  },

  // Récupérer un produit par ID
  getProductById: async (id) => {
    try {
      const docRef = doc(firestore, "produits", String(id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: isNaN(docSnap.id) ? docSnap.id : parseInt(docSnap.id), ...docSnap.data() };
      }
      // Fallback
      if (typeof PRODUCTS !== 'undefined') {
        return PRODUCTS.find(p => String(p.id) === String(id)) || null;
      }
      return null;
    } catch (e) {
      console.error("Erreur récupération produit:", e);
      if (typeof PRODUCTS !== 'undefined') {
        return PRODUCTS.find(p => String(p.id) === String(id)) || null;
      }
      return null;
    }
  },

  // Récupérer les catégories/types
  getTypes: async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "types"));
      const types = [];
      querySnapshot.forEach((doc) => {
        types.push({ id: doc.id, ...doc.data() });
      });

      // Auto-seeding pour les types de vêtements
      if (types.length === 0) {
        console.log("Firestore 'types' est vide. Seeding...");
        const defaultTypes = [
          { key: "barboteuse", label: "Barboteuse", labelAr: "بربوتيز" },
          { key: "pyjama", label: "Pyjama", labelAr: "بيجامة" },
          { key: "body", label: "Body", labelAr: "بودي" },
          { key: "ensemble", label: "Ensemble", labelAr: "طقم" },
          { key: "coffret", label: "Coffret Cadeau", labelAr: "طقم مولود كامل" }
        ];
        for (const t of defaultTypes) {
          await setDoc(doc(firestore, "types", t.key), t);
        }
        return defaultTypes;
      }
      return types;
    } catch (e) {
      console.error("Erreur récupération types:", e);
      return [
        { key: "barboteuse", label: "Barboteuse", labelAr: "بربوتيز" },
        { key: "pyjama", label: "Pyjama", labelAr: "بيجامة" },
        { key: "body", label: "Body", labelAr: "بودي" },
        { key: "ensemble", label: "Ensemble", labelAr: "طقم" },
        { key: "coffret", label: "Coffret Cadeau", labelAr: "طقم" }
      ];
    }
  },

  // Enregistrer une commande
  createOrder: async (orderData) => {
    try {
      const docRef = await addDoc(collection(firestore, "commandes"), {
        ...orderData,
        createdAt: serverTimestamp(),
        status: "pending"
      });
      console.log("Commande enregistrée Firestore ID:", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Erreur lors de l'enregistrement de la commande:", e);
      throw e;
    }
  }
};

// Dispatch un event custom pour signaler que Firebase est prêt
window.dispatchEvent(new CustomEvent("firebase-ready"));
