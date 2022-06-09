import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvPHeCePVrsgzDFLTZTdKJ_3sbpEQLp1M",
  authDomain: "tec-mov-medical-1ff57.firebaseapp.com",
  projectId: "tec-mov-medical-1ff57",
  storageBucket: "tec-mov-medical-1ff57.appspot.com",
  messagingSenderId: "159614098304",
  appId: "1:159614098304:web:d3d21a324a418ec159ff65"
};

initializeApp(firebaseConfig);
export const db = getFirestore();