import React from 'react';
import Link from 'next/link'; 
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li><Link href="/admin/catch-basin">Tickets</Link></li>
        <li><Link href="/admin/manage-applications">Applications</Link></li>
        <li><Link href="/admin/manage-users">Manage Users</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
