// ========== Configuration Firebase ==========
// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

// Configuration Firebase
// Note: Ces clés sont publiques et sécurisées par les règles Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDK5U5uxD6fRzaEp8naQcSCVcCrT6fe4EQ",
  authDomain: "compresseurs-ba.firebaseapp.com",
  projectId: "compresseurs-ba",
  storageBucket: "compresseurs-ba.firebasestorage.app",
  messagingSenderId: "132158598676",
  appId: "1:132158598676:web:6a8a845015ac63ce134101"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Fonction pour enregistrer un message de contact dans Firestore
export async function saveContactMessage(formData) {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      message: formData.message,
      timestamp: serverTimestamp(),
      status: 'nouveau'
    });
    
    console.log('Message enregistré avec ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    return { success: false, error: error.message };
  }
}

// Exporter l'app et les services Firebase pour utilisation dans d'autres modules
export { app, db, analytics };

