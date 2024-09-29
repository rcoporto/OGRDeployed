"use client"

import React, { useState } from 'react';
import styles from './NewUser.module.css';
import Navbar from '../components/Navbar';

function NewUser() {
  const [submitted, setSubmitted] = useState(false);
  const [userType, setUserType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleReload = () => {
    setSubmitted(false);
  };

  return (
    <div>
            <Navbar />

    <div className={styles.container}>

      <div className={styles.headerSection}>
        <h1 className={styles.title}>Register Now</h1>
        <p className={styles.subtitle}>Fill out the form to request access to the registry.</p>
      </div>
      {!submitted ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="userType">I am a *</label>
            <select
              id="userType"
              className={styles.input}
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="">Select one</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="researcher">Researcher</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>I am requesting for *</label>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="registry" name="registry" className={styles.checkbox} />
              <label htmlFor="registry">Registry Access</label>
              <input type="checkbox" id="research" name="research" className={styles.checkbox} />
              <label htmlFor="research">Research Access</label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Name *</label>
            <input type="text" id="name" className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact">Contact Number</label>
            <input type="text" id="contact" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="identity">Proof of Identity *</label>
            <input type="file" id="identity" className={styles.input} required />
            {userType && (
              <small className={styles.description}>
                Upload any document that certifies you as a {userType}.
              </small>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      ) : (
        <div className={styles.confirmation}>
          <h2>Successfully Submitted!</h2>
          <p>Please wait for confirmation. You will receive an email with further details.</p>
          <button onClick={handleReload} className={styles.submitButton}>
            Register another user
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default NewUser;