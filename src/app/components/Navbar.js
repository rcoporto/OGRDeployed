// "use client"
// import React from 'react';
// import Link from 'next/link';
// import styles from './Navbar.module.css';

// import { useRouter } from 'next/navigation';

// const Navbar = () => {
//   const NAV_LINKS = [
//     { href: '/', key: 'home', label: 'Home' },
//     { href: '/basic-info', key: 'basic_info', label: 'Basic Information' },
//     { href: '/families', key: 'families', label: 'Families' },
//     { href: '/registry', key: 'registry', label: 'Registry' },
//     { href: '/research', key: 'research', label: 'Research' },
//     { href: '/inquire-now', key: 'inquire_now', label: 'Inquire Now' },
//     { href: '/new-user', key: 'register_now', label: 'Register Now' },
//     { href: '/login', key: 'login', label: 'Login' },
// ];
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>Ocular Genetic Registry</div>
//       <ul className={styles.navLinks}>
//         {NAV_LINKS.map((link) => (
//                           <Link href={link.href} key={link.key} className={styles.link}>
//                               {link.label}
//                           </Link>
//                   ))}
//       </ul>

//     </nav>
//   )
// }

// export default Navbar

// 

"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext'; // Ensure this is imported correctly
import { db } from '../../../firebase/firebase'; // Import Firestore instance as db
import { collection, query, where, getDocs } from 'firebase/firestore';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const { user, logout } = useAuth(); // Destructure logout directly
  const router = useRouter();

  // useEffect(() => {
  //   const fetchUserName = async () => {
  //     if (user && user.uid) { // Ensure user and uid are available
  //       const usersRef = collection(db, 'registeredUsers');
  //       const q = query(usersRef, where('uid', '==', user.uid));
  //       try {
  //         const querySnapshot = await getDocs(q);

  //         if (!querySnapshot.empty) {
  //           const userData = querySnapshot.docs[0].data();
  //           setUserName(userData.name);  // Assuming 'name' is the field in registeredUsers
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data: ", error);
  //       }
  //     }
  //   };
  //   fetchUserName();
  // }, [user]);

  useEffect(() => {
    const fetchUserName = async () => {
      // alert(JSON.stringify(user, null, 2));
      if (user)
        setUserName(user.name);
      // if (user && user.uid) { // Ensure user and uid are available
        
      //   try {
      //     const usersRef = collection(db, 'registeredUsers');
      //     const q = query(usersRef, where('uid', '==', user.uid));
      //     const querySnapshot = await getDocs(q);

      //     if (!querySnapshot.empty) {
      //       const userData = querySnapshot.docs[0].data();
      //       setUserName(userData.name); // Set the user's name from registeredUsers
      //       alert("name is "+userData.name);
      //     } else {
      //       console.error("User not found in registeredUsers.");
      //     }
      //   } catch (error) {
      //     console.error("Error fetching user data: ", error);
      //   }
      // }
    };
    fetchUserName();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();  // Remove auth parameter here
      router.push('/login');
    } catch (error) {
      console.error("Error during sign-out: ", error);
    }
  };

  const NAV_LINKS = [
    { href: '/', key: 'home', label: 'Home' },
    { href: '/basic-info', key: 'basic_info', label: 'Basic Information' },
    { href: '/families', key: 'families', label: 'Families' },
    { href: '/registry', key: 'registry', label: 'Registry' },
    { href: '/research', key: 'research', label: 'Research' },
    { href: '/inquire-now', key: 'inquire_now', label: 'Inquire Now' },
    { href: '/new-user', key: 'register_now', label: 'Register Now' },
    !user ? { href: '/login', key: 'login', label: 'Login' } : null
  ].filter(Boolean);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Ocular Genetic Registry</div>
      <ul className={styles.navLinks}>
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </ul>
      {user && (
        <div className={styles.userSection}>
          <span className={styles.userName}>Welcome, {userName || 'User'}</span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
