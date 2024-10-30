"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from './InquireNow.module.css';

// Firebase imports
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

function InquireNow() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    tag: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Reference to the 'tickets' collection
      const ticketsRef = collection(db, 'tickets');

      // Add a new document with formData
      await addDoc(ticketsRef, formData);

      alert('Ticket submitted successfully!');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting ticket: ', error);
      alert('There was an error submitting the ticket.');
    }
  };

  const handleReload = () => {
    setSubmitted(false);
    setFormData({ email: '', tag: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <title>Inquire Now</title>
      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.title}>Submit a Ticket</h1>

        {/* Conditional rendering for subtitle */}
        {!submitted && (
          <p className={styles.subtitle}>
            Please provide your email and message below, and we will get back to you shortly.
          </p> 
        )}
<br />
        {!submitted ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="tag">Tag *</label>
              <select
                id="tag"
                name="tag"
                className={styles.select}
                value={formData.tag}
                onChange={handleChange}
                required
              >
                <option value="">Select Tag</option>
                <option value="Donation">Donation</option>
                <option value="Inquiry">Inquiry</option>
                <option value="Support">Support</option>
                <option value="Request">Request</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        ) : (
          <div className={styles.confirmation}>
            <h2>Ticket Submitted!</h2> <br />
            <p>Thank you for reaching out. We’ll get back to you shortly.</p> <br />
            <button onClick={handleReload} className={styles.submitButton}>
              Submit another ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InquireNow;
