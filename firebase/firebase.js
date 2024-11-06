// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// import { getFirestore,addDoc, collection, getDocs} from 'firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCpxeTCRY6pcRMkK-b1XaBnzcdqjmDPq5M",
//   authDomain: "oculargeneticregistry.firebaseapp.com",
//   projectId: "oculargeneticregistry",
//   storageBucket: "oculargeneticregistry.appspot.com",
//   messagingSenderId: "325487107334",
//   appId: "1:325487107334:web:f26f29e22577efe3e65287",
//   measurementId: "G-8S5CFJFNB3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// export {db};

// export default app;

// src/app/firebase/firebase.js

// src/app/firebase/firebase.js

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



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCpxeTCRY6pcRMkK-b1XaBnzcdqjmDPq5M",
//   authDomain: "oculargeneticregistry.firebaseapp.com",
//   projectId: "oculargeneticregistry",
//   storageBucket: "oculargeneticregistry.appspot.com",
//   messagingSenderId: "325487107334",
//   appId: "1:325487107334:web:f26f29e22577efe3e65287",
//   measurementId: "G-8S5CFJFNB3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// const auth = getAuth(app); // Initialize Firebase Authentication

// export { db, auth, analytics };
// export default app;
