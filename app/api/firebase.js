// /pages/api/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";

// Initialize Firebase with your config
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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export { auth, firestore };
export const createBook = async (data) => addDoc(collection(firestore, "books"), data);
export const fetchBooks = async () => getDocs(collection(firestore, "books"));
export const createUserRecord = async (uid, data) => setDoc(doc(firestore, "users", uid), data);