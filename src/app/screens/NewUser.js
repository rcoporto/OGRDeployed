// "use client"

// import React, { useState } from 'react';
// import styles from './NewUser.module.css';
// import Navbar from '../components/Navbar';

// //for firebase
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '../../../firebase/firebase'; // Adjust this path as needed


// function NewUser() {
//   const [submitted, setSubmitted] = useState(false);
//   const [userType, setUserType] = useState('');

//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   setSubmitted(true);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       // Reference to the 'registries' collection
//       const registryRef = collection(db, 'newUser');
  
//       // Add a new document with formData
//       await addDoc(registryRef, formData);
  
//       alert('Form submitted successfully!');
//     } catch (error) {
//       console.error('Error adding document: ', error);
//       alert('There was an error submitting the form.');
//     }
//   };

//   const handleReload = () => {
//     setSubmitted(false);
//   };

//   return (
//     <div>
//             <Navbar />

//     <div className={styles.container}>

//       <div className={styles.headerSection}>
//         <h1 className={styles.title}>Register Now</h1>
//         <p className={styles.subtitle}>Fill out the form to request access to the registry.</p>
//       </div>
//       {!submitted ? (
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div className={styles.formGroup}>
//             <label htmlFor="userType">I am a *</label>
//             <select
//               id="userType"
//               className={styles.input}
//               value={userType}
//               onChange={(e) => setUserType(e.target.value)}
//               required
//             >
//               <option value="">Select one</option>
//               <option value="doctor">Doctor</option>
//               <option value="nurse">Nurse</option>
//               <option value="researcher">Researcher</option>
//             </select>
//           </div>

//           <div className={styles.formGroup}>
//             <label>I am requesting for *</label>
//             <div className={styles.checkboxGroup}>
//               <input type="checkbox" id="registry" name="registry" className={styles.checkbox} />
//               <label htmlFor="registry">Registry Access</label>
//               <input type="checkbox" id="research" name="research" className={styles.checkbox} />
//               <label htmlFor="research">Research Access</label>
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="name">Name *</label>
//             <input type="text" id="name" className={styles.input} required />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="email">Email *</label>
//             <input type="email" id="email" className={styles.input} required />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="contact">Contact Number</label>
//             <input type="text" id="contact" className={styles.input} />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="identity">Proof of Identity *</label>
//             <input type="file" id="identity" className={styles.input} required />
//             {userType && (
//               <small className={styles.description}>
//                 Upload any document that certifies you as a {userType}.
//               </small>
//             )}
//           </div>

//           <button type="submit" className={styles.submitButton}>Submit</button>
//         </form>
//       ) : (
//         <div className={styles.confirmation}>
//           <h2>Successfully Submitted!</h2>
//           <p>Please wait for confirmation. You will receive an email with further details.</p>
//           <button onClick={handleReload} className={styles.submitButton}>
//             Register another user
//           </button>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// }

// export default NewUser;

"use client";

import React, { useState } from 'react';
import styles from './NewUser.module.css';
import Navbar from '../components/Navbar';

// for firebase
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase'; // Adjust this path as needed

function NewUser() {
  const [submitted, setSubmitted] = useState(false);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    registry: false,
    research: false,
    identity:  '',
    status: 'Pending',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Reference to the 'newUser' collection
      const registryRef = collection(db, 'newUser');
  
      await addDoc(registryRef, {
        userType,
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        registry: formData.registry,
        research: formData.research,
        identity: formData.identity,
        status: formData.status, // Add status field here
      });
      
  
      alert('Form submitted successfully!');
      setSubmitted(true); // Mark as submitted
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error submitting the form.');
    }
  };

  const handleReload = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      contact: '',
      registry: false,
      research: false,
      identity: '',
      status: 'Pending', // Reset status
    });
    setUserType('');
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: name === 'identity' ? '' : value, // Handle file separately
  //     [name === 'registry' || name === 'research' ? name : '']: e.target.checked // For checkbox
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value, // Handle checkboxes and other input types appropriately
    }));
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
                <input 
                  type="checkbox" 
                  id="registry" 
                  name="registry" 
                  className={styles.checkbox} 
                  checked={formData.registry} 
                  onChange={handleChange} 
                />
                <label htmlFor="registry">Registry Access</label>
                <input 
                  type="checkbox" 
                  id="research" 
                  name="research" 
                  className={styles.checkbox} 
                  checked={formData.research} 
                  onChange={handleChange} 
                />
                <label htmlFor="research">Research Access</label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name">Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                className={styles.input} 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
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
              <label htmlFor="contact">Contact Number</label>
              <input 
                type="text" 
                id="contact" 
                name="contact"
                className={styles.input} 
                value={formData.contact} 
                onChange={handleChange} 
              />
            </div>

            {/* <div className={styles.formGroup}>
              <label htmlFor="identity">Proof of Identity *</label>
              <input 
                type="file" 
                id="identity" 
                name="identity"
                className={styles.input} 
                onChange={handleChange} 
                required 
              />
              {userType && (
                <small className={styles.description}>
                  Upload any document that certifies you as a {userType}.
                </small>
              )}
            </div> */}

<div className={styles.formGroup}>
              <label htmlFor="identity">Link for Proof of Identity *</label>
              <input 
                type="text" 
                id="identity" 
                name="identity"
                className={styles.input} 
                value={formData.identity} 
                onChange={handleChange} 
                required 
              />
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
