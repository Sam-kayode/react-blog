import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "react-blog-ab5b3.firebaseapp.com",
  projectId: "react-blog-ab5b3",
  storageBucket: "react-blog-ab5b3.appspot.com",
  messagingSenderId: "866712216563",
  appId: "1:866712216563:web:dc6b65560b238ca0a8e886",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,db,storage}
