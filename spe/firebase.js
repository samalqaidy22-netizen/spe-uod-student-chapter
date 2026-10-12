import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7fYowsAE5Fl36GIwScV6H4vpdKSHkeI0",
  authDomain: "spe-uod-chapter.firebaseapp.com",
  projectId: "spe-uod-chapter",
  storageBucket: "spe-uod-chapter.firebasestorage.app",
  messagingSenderId: "223405974085",
  appId: "1:223405974085:web:3aa578f04939a97033792c"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);