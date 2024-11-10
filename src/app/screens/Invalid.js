"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // Update the import path
import styles from './Invalid.module.css';

function Invalid() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.text}>Access Denied</h1>
      <p className={styles.message}>You do not have access to this page.</p>
      <button className={styles.button} onClick={handleGoBack}>
        Go Back to Homepage
      </button>
    </div>
  );
}

export default Invalid;
