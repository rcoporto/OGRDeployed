//this might not be the firebase.js code being referred to, there's another in a separate folder
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpxeTCRY6pcRMkK-b1XaBnzcdqjmDPq5M",
  authDomain: "oculargeneticregistry.firebaseapp.com",
  projectId: "oculargeneticregistry",
  storageBucket: "oculargeneticregistry.appspot.com",
  messagingSenderId: "325487107334",
  appId: "1:325487107334:web:f26f29e22577efe3e65287",
  measurementId: "G-8S5CFJFNB3",
};

let app;
let db;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app); // Single db instance
}

export { app, db }; // Export the Firestore instance only if defined
