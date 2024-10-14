import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image';
import styles from './BasicInfo.module.css';

function BasicInfo() {
  return (
    <div className={styles.page}>
        <title>Basic Information</title>
        <Navbar/>
        <h1 className={styles.title}>Basic Information</h1>
        <div className={styles.waveImage}>
          <Image
            src="/wavelines.png" 
            alt="Wave Lines" 
            height={500} 
            width={1800}
          />
        </div>

        BasicInfo

        {/* <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Ocular Genetic Registry</p>
        </footer> */}
    </div>
  )
}

export default BasicInfo