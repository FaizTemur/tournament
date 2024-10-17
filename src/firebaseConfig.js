// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDif75OFzl6p0hxCfEbZHMC3rz0Qu13tMM", 
    authDomain: "project-t-d04ea.firebaseapp.com", 
    projectId: "project-t-d04ea", 
    storageBucket: "project-t-d04ea.appspot.com", 
    messagingSenderId: "1098005549894", 
    appId: "1:1098005549894:android:085dec377336ed53990b47" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
