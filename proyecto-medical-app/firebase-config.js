// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDvPHeCePVrsgzDFLTZTdKJ_3sbpEQLp1M",
  authDomain: "tec-mov-medical-1ff57.firebaseapp.com",
  projectId: "tec-mov-medical-1ff57",
  storageBucket: "tec-mov-medical-1ff57.appspot.com",
  messagingSenderId: "159614098304",
  appId: "1:159614098304:web:d3d21a324a418ec159ff65"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const user = auth.currentUser;

 
