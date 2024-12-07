import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app); // Optional, if analytics is needed
const db = getFirestore(app); // Single db instance

export { db }; // Export the single Firestore instance
export default app;
