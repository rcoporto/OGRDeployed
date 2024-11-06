// // // src/context/authContext.js

// // "use client";

// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { db } from '../firebase/firebase'; // Import your Firestore instance
// // import { collection, query, where, getDocs } from 'firebase/firestore';

// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const storedUser = JSON.parse(localStorage.getItem('user'));
// //     if (storedUser) setUser(storedUser);
// //     setLoading(false);
// //   }, []);

// //   const login = async (email, password) => {
// //     setLoading(true);
// //     const usersRef = collection(db, 'registeredUsers');
// //     const q = query(usersRef, where('email', '==', email), where('password', '==', password));
// //     const querySnapshot = await getDocs(q);

// //     if (!querySnapshot.empty) {
// //       const userData = querySnapshot.docs[0].data();
// //       setUser(userData);
// //       localStorage.setItem('user', JSON.stringify(userData));
// //       setLoading(false);
// //       return true;
// //     } else {
// //       setLoading(false);
// //       throw new Error("Invalid email or password");
// //     }
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     localStorage.removeItem('user');
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, loading, login, logout }}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   return useContext(AuthContext);
// // }

// "use client";

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { db } from '../firebase/firebase'; // Import Firestore instance as db
// import { collection, query, where, getDocs } from 'firebase/firestore';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) setUser(storedUser);
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     setLoading(true);
//     const usersRef = collection(db, 'registeredUsers');
//     const q = query(usersRef, where('email', '==', email), where('password', '==', password));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       const userData = querySnapshot.docs[0].data();
//       setUser(userData);
//       localStorage.setItem('user', JSON.stringify(userData));
//       setLoading(false);
//       return true;
//     } else {
//       setLoading(false);
//       throw new Error("Invalid email or password");
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebase'; // Import Firestore instance as db
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const usersRef = collection(db, 'registeredUsers');
    const q = query(usersRef, where('email', '==', email), where('password', '==', password));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
      return true;
    } else {
      setLoading(false);
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
