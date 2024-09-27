import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Ocular Genetic Registry</div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/basic-info" className={styles.link}>
            Basic Information
          </Link>
        </li>
        <li>
          <Link href="/families" className={styles.link}>
            Families
          </Link>
        </li>
        <li>
          <Link href="/registry" className={styles.link}>
            Registry
          </Link>
        </li>
        <li>
          <Link href="/research" className={styles.link}>
            Research
          </Link>
        </li>
        <li>
          <Link href="/about-us" className={styles.link}>
            About Us
          </Link>
        </li>
        <li>
          <Link href="/new-user" className={styles.link}>
            Register Now
          </Link>
        </li>
        <li>
          <Link href="/login" className={styles.link}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
