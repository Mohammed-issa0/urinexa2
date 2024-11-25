// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnW4GHbK12VIhRNvbLq3Im7pzfo3iIWvs",
  authDomain: "urinexa.firebaseapp.com",
  projectId: "urinexa",
  storageBucket: "urinexa.firebasestorage.app",
  messagingSenderId: "822954656898",
  appId: "1:822954656898:web:b810151be626c58423209b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
