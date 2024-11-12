// /utils/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCF45qyuK3rn3ZLOvrGTSxVp6P20PbtFYc",
  authDomain: "website-d2a43.firebaseapp.com",
  databaseURL: "https://website-d2a43-default-rtdb.firebaseio.com",
  projectId: "website-d2a43",
  storageBucket: "website-d2a43.firebasestorage.app",
  messagingSenderId: "153002772623",
  appId: "1:153002772623:web:31329fcc6bf529b75c88fa",
  measurementId: "G-4J478M9QTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, createUserWithEmailAndPassword };
