// ============================================================
// MILYBO DZ – Firebase Firestore Integration (v9 ES Module via CDN)
// Expose un objet window.db pour communiquer avec Firestore
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
  getFirestore, 
  enableIndexedDbPersistence,
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
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updatePassword
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Initialisation Firebase
const app = initializeApp(window.firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

// Activer le cache persistant natif de Firestore
enableIndexedDbPersistence(firestore).catch((err) => {
    if (err.code == 'failed-precondition') {
        console.warn("La persistance Firestore a échoué (multiples onglets ouverts)");
    } else if (err.code == 'unimplemented') {
        console.warn("Le navigateur ne supporte pas la persistance Firestore");
    }
});

// Exposer l'objet db globalement
window.db = {
  // ── Authentication ──
  loginAdmin: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (e) {
      console.error("Erreur lors de la connexion admin:", e);
      throw e;
    }
  },

  logoutAdmin: async () => {
    try {
      await signOut(auth);
      return true;
    } catch (e) {
      console.error("Erreur lors de la déconnexion:", e);
      throw e;
    }
  },

  changePassword: async (newPassword) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        return true;
      }
      throw new Error("Aucun administrateur connecté !");
    } catch (e) {
      console.error("Erreur de mise à jour du mot de passe:", e);
      throw e;
    }
  },


  onAuthChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  },

  // Récupérer tous les produits
  getProducts: async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "produits"));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      
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

      return types;
    } catch (e) {
      console.error("Erreur récupération types:", e);
      return [];
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
  },

  // Supprimer une commande
  deleteOrder: async (orderId) => {
    try {
      const docRef = doc(firestore, "commandes", orderId);
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      console.error("Erreur lors de la suppression de la commande:", e);
      throw e;
    }
  }
};

// Dispatch un event custom pour signaler que Firebase est prêt
window.dispatchEvent(new CustomEvent("firebase-ready"));


