import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/admin/catch-basin" className={styles.link}>
            Tickets
          </Link>
        </li>
        <li>
          <Link href="/admin/manage-applications" className={styles.link}>
            Applications
          </Link>
        </li>
        <li>
          <Link href="/admin/manage-users" className={styles.link}>
            Manage Users
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
