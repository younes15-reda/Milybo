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
  updateDoc,
  deleteDoc,
  query,
  orderBy,
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

  // Ajouter ou modifier un produit
  saveProduct: async (id, productData) => {
    try {
      const docRef = doc(firestore, "produits", String(id));
      await setDoc(docRef, productData, { merge: true });
      return true;
    } catch (e) {
      console.error("Erreur lors de la sauvegarde du produit:", e);
      throw e;
    }
  },

  // Supprimer un produit
  deleteProduct: async (id) => {
    try {
      const docRef = doc(firestore, "produits", String(id));
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      console.error("Erreur lors de la suppression du produit:", e);
      throw e;
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
          { key: "coffret", label: "Coffret Cadeau", labelAr: "طقم" }
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

  // Ajouter ou modifier un type
  saveType: async (id, typeData) => {
    try {
      const docRef = doc(firestore, "types", String(id));
      await setDoc(docRef, typeData, { merge: true });
      return true;
    } catch (e) {
      console.error("Erreur lors de la sauvegarde du type:", e);
      throw e;
    }
  },

  // Supprimer un type
  deleteType: async (id) => {
    try {
      const docRef = doc(firestore, "types", String(id));
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      console.error("Erreur lors de la suppression du type:", e);
      throw e;
    }
  },

  // Enregistrer une commande
  createOrder: async (orderData) => {
    try {
      const docRef = await addDoc(collection(firestore, "commandes"), {
        ...orderData,
        createdAt: serverTimestamp(),
        status: "en_attente" // statut par défaut conforme aux consignes
      });
      console.log("Commande enregistrée Firestore ID:", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Erreur lors de l'enregistrement de la commande:", e);
      throw e;
    }
  },

  // Récupérer toutes les commandes triées par date (récentes en premier)
  getOrders: async () => {
    try {
      const q = query(collection(firestore, "commandes"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return orders;
    } catch (e) {
      console.error("Erreur de récupération des commandes, tentative sans tri:", e);
      // Fallback si l'index sur createdAt n'est pas encore créé
      try {
        const querySnapshot = await getDocs(collection(firestore, "commandes"));
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({ id: doc.id, ...doc.data() });
        });
        return orders.sort((a, b) => {
          const tA = a.createdAt?.seconds || 0;
          const tB = b.createdAt?.seconds || 0;
          return tB - tA;
        });
      } catch (e2) {
        console.error("Erreur de fallback commandes:", e2);
        return [];
      }
    }
  },

  // Mettre à jour le statut d'une commande
  updateOrderStatus: async (orderId, newStatus) => {
    try {
      const docRef = doc(firestore, "commandes", orderId);
      await updateDoc(docRef, { status: newStatus });
      return true;
    } catch (e) {
      console.error("Erreur mise à jour statut commande:", e);
      throw e;
    }
  }
};

// Dispatch un event custom pour signaler que Firebase est prêt
window.dispatchEvent(new CustomEvent("firebase-ready"));

