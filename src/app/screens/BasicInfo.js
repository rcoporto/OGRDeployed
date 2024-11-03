import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image';
import styles from './BasicInfo.module.css';
import BasicInfoSection from '../components/BasicInfoSection';

function BasicInfo() {
  return (
    <div className={styles.page}>
        <title>Basic Information</title>
        <Navbar/>
        {/* <h1 className={styles.title}>Basic Information</h1> */}
        <h1 class="mt-8 mx-10 text-4xl font-extrabold leading-none tracking-tight text-bluegreen-70 md:text-3xl lg:text-4xl z-10">Basic Information</h1>
        <h3 class="mx-10 text-2xl font-medium text-gray-20 mb-10 z-10">Learn about genetics and associated diseases through these resources.</h3>
        
        <BasicInfoSection/>
        {/* <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Ocular Genetic Registry</p>
        </footer> */}
    </div>
  )
}

export default BasicInfo