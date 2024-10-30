"use client"
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

import { useRouter } from 'next/navigation';

const Navbar = () => {
  const NAV_LINKS = [
    { href: '/', key: 'home', label: 'Home' },
    { href: '/basic-info', key: 'basic_info', label: 'Basic Information' },
    { href: '/families', key: 'families', label: 'Families' },
    { href: '/registry', key: 'registry', label: 'Registry' },
    { href: '/research', key: 'research', label: 'Research' },
    { href: '/inquire-now', key: 'inquire_now', label: 'Inquire Now' },
    { href: '/new-user', key: 'register_now', label: 'Register Now' },
    { href: '/login', key: 'login', label: 'Login' },
];
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

    </nav>
  )
}

export default Navbar
