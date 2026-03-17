import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, serverTimestamp as firestoreServerTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHRjvpZYPVKuejoh98ELAYqQBAHhhTt48",
  authDomain: "acharya-ascent.firebaseapp.com",
  projectId: "acharya-ascent",
  storageBucket: "acharya-ascent.firebasestorage.app",
  messagingSenderId: "188887779429",
  appId: "1:188887779429:web:ca0a528ec2b7369d105e8c",
  measurementId: "G-DQVP92CXB6"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export const serverTimestamp = firestoreServerTimestamp;
export { db };
