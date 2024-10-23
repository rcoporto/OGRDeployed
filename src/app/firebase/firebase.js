// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { db } from './firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpxeTCRY6pcRMkK-b1XaBnzcdqjmDPq5M",
  authDomain: "oculargeneticregistry.firebaseapp.com",
  projectId: "oculargeneticregistry",
  storageBucket: "oculargeneticregistry.appspot.com",
  messagingSenderId: "325487107334",
  appId: "1:325487107334:web:f26f29e22577efe3e65287",
  measurementId: "G-8S5CFJFNB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};

export default app;