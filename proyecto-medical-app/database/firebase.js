// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA2mnd4SFBPNqDygjnMWlVfrVpKmMpRlI",
  authDomain: "tec-mov-medical.firebaseapp.com",
  projectId: "tec-mov-medical",
  storageBucket: "tec-mov-medical.appspot.com",
  messagingSenderId: "480161376541",
  appId: "1:480161376541:web:4b7e46bb6d0d797a4899f4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export { app, storage, db };