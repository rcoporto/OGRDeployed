import React from 'react';
import styles from './Login.module.css';
import Navbar from '../components/Navbar';

function Login() {
  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <title>Login</title>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form}>
        <input type="text" placeholder="Username" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
    </>
  );
}

export default Login;
