// "use client";

// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import styles from './InquireNow.module.css';

// // Firebase imports
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '../../../firebase/firebase';

// function InquireNow() {
//   const [submitted, setSubmitted] = useState(false);
//   const [formData, setFormData] = useState({

//     tag: '',
//     name: '',
//     email: '',
//     contact: '',
//     subject: '',
//     dateCreated: '',
//     status: 'Open',
//     message: '',
    
//   });

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     // Reference to the 'tickets' collection
//   //     const ticketsRef = collection(db, 'tickets');

//   //     // Add a new document with formData
//   //     await addDoc(ticketsRef, formData);

//   //     alert('Ticket submitted successfully!');
//   //     setSubmitted(true);
//   //   } catch (error) {
//   //     console.error('Error submitting ticket: ', error);
//   //     alert('There was an error submitting the ticket.');
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Set the current date as the dateCreated field
//       const currentDate = new Date().toISOString();
//       const newFormData = { ...formData, dateCreated: currentDate };
  
//       // Reference to the 'tickets' collection
//       const ticketsRef = collection(db, 'tickets');
  
//       // Add a new document with formData
//       await addDoc(ticketsRef, newFormData);
  
//       alert('Ticket submitted successfully!');
//       setSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting ticket: ', error);
//       alert('There was an error submitting the ticket.');
//     }
//   };
  

//   const handleReload = () => {
//     setSubmitted(false);
//     setFormData({ email: '', tag: '', message: '' });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <title>Inquire Now</title>
//       <Navbar />

//       <div className={styles.container}>
//         <h1 className={styles.title}>Submit a Ticket</h1>

//         {/* Conditional rendering for subtitle */}
//         {!submitted && (
//           <p className={styles.subtitle}>
//             Please provide your email and message below, and we will get back to you shortly.
//           </p> 
//         )}
// <br />
//         {!submitted ? (
//           <form className={styles.form} onSubmit={handleSubmit}>
//             <div className={styles.formGroup}>
//               <label className={styles.label} htmlFor="message">Name *</label>
//               <textarea
//                 id="name"
//                 name="name"
//                 className={styles.textarea}
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
          

//             <div className={styles.formGroup}>
//               <label className={styles.label} htmlFor="email">Email *</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className={styles.input}
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label} htmlFor="message">Contact Number</label>
//               <textarea
//                 id="contact"
//                 name="contact"
//                 className={styles.textarea}
//                 value={formData.contact}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label} htmlFor="tag">Tag *</label>
//               <select
//                 id="tag"
//                 name="tag"
//                 className={styles.select}
//                 value={formData.tag}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Tag</option>
//                 <option value="Donation">Donation</option>
//                 <option value="Inquiry">Inquiry</option>
//                 <option value="Support">Support</option>
//                 <option value="Request">Request</option>
//                 <option value="Others">Others</option>
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label} htmlFor="message">Subject *</label>
//               <textarea
//                 id="subject"
//                 name="subject"
//                 className={styles.textarea}
//                 value={formData.subject}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label} htmlFor="message">Message *</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 className={styles.textarea}
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <button type="submit" className={styles.submitButton}>Submit</button>
//           </form>
//         ) : (
//           <div className={styles.confirmation}>
//             <h2>Ticket Submitted!</h2> <br />
//             <p>Thank you for reaching out. We’ll get back to you shortly.</p> <br />
//             <button onClick={handleReload} className={styles.submitButton}>
//               Submit another ticket
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default InquireNow;


"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from './InquireNow.module.css';
import Image from 'next/image';

// Firebase imports
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

function InquireNow() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    tag: '',
    name: '',
    email: '',
    contact: '',
    subject: '',
    dateCreated: '',
    status: 'Open',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set the current date as the dateCreated field
      const currentDate = new Date().toISOString();
      const newFormData = { ...formData, dateCreated: currentDate };
  
      // Reference to the 'tickets' collection
      const ticketsRef = collection(db, 'tickets');
  
      // Add a new document with formData
      await addDoc(ticketsRef, newFormData);
  
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
      <div className={styles.page}>
         <title>Inquire Now</title>
          <Navbar />

          <Image
              src="/wavelines4.png" 
              alt="Wave Lines" 
              height={400} 
              width={1800}
              className='opacity-20 top-0 absolute z-0'
          />

          <div class="my-12 mx-20 text-center z-10">
            <h1 class="mb-6 text-3xl font-extrabold leading-none tracking-tight text-bluegreen-80 md:text-4xl lg:text-5xl">Submit a <span class="underline underline-offset-3 decoration-8 decoration-bluegreen-1">Ticket</span></h1>
            

            {/* Conditional rendering for subtitle */}
            {!submitted && (
              <p class="mb-10 text-lg font-normal font-lora text-gray-60 lg:text-xl">Please provide your email and message below, and we will get back to you shortly.</p>
              // <p className={styles.subtitle}>
              //   Please provide your email and message below, and we will get back to you shortly.
              // </p> 
            )}
    
            <div class="w-screen max-w-md p-4 bg-white border justify-self-center border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
              {!submitted ? (
                <form class="space-y-6" action="#" onSubmit={handleSubmit}>
                  <div class="relative">
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required/>
                    <label htmlFor="name" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Name <span class="text-pink-50">*</span></label>
                  </div>

                  <div class="relative">
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required/>
                    <label htmlFor="email" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Email <span class="text-pink-50">*</span></label>
                  </div>

                  <div class="relative">
                    <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required/>
                    <label htmlFor="contact" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Contact Number <span class="text-pink-50">*</span></label>
                  </div>

                  <div class="relative">
                    <select
                        id="tag"
                        name="tag"
                        class="block px-2.5 pb-2.5 pt-4 w-full text-sm font-lora text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
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
                    <label htmlFor="tag" class="absolute text-sm text-gray-60 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Tag <span class="text-pink-50">*</span></label>
                  </div>

                  <div class="relative">
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required/>
                    <label htmlFor="subject" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Subject <span class="text-pink-50">*</span></label>
                  </div>

                  <div class="relative">
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} wrap="hard" rows={4} class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-bluegreen-90 bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer" placeholder=" " required/>
                    <label htmlFor="message" class="absolute text-sm text-gray-60 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-bluegreen-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                    Message <span class="text-pink-50">*</span></label>
                  </div>

                  <button type="submit" class="text-white bg-pink-20 hover:bg-pink-50 focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">Submit</button>

                  {/* <button type="submit" className={styles.submitButton}>Submit</button> */}

                  {/* <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={styles.input}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div> */}
                
                  {/* <div className={styles.formGroup}>
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
                  </div> */}

                  {/* <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="contact">Contact Number</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      className={styles.input}
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </div> */}


                  {/* <div className={styles.formGroup}>
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
                  </div> */}


                  {/* <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className={styles.input}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div> */}


                  {/* <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      className={styles.textarea}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div> */}
                </form>

              ) : (
                // <div className={styles.confirmation}>
                <div>
                  <div class="bg-cover bg-no-repeat bg-[url('../../public/oph_banner.jpg')] bg-blend-screen rounded-3xl p-12 md:p-24 mb-16">
                    
                </div>
                <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10"></hr>
                  <h4 class="text-xl text-pink-50 mb-5">Ticket Submitted!</h4>
                  <p class="mb-16 text-sm font-normal font-lora text-gray-60 lg:text-base">Thank you for reaching out. We’ll get back to you shortly.</p>
                  {/* <button onClick={handleReload} className={styles.submitButton}> */}
                  <button onClick={handleReload} class="text-white bg-bluegreen-90 hover:bg-bluegreen-80 focus:ring-4 focus:ring-bluegreen-75 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
                    Submit another ticket
                  </button>
                </div>
              )}
            </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#55A1B4" fill-opacity="1" d="M0,96L48,128C96,160,192,224,288,250.7C384,277,480,267,576,229.3C672,192,768,128,864,112C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path></svg>

        {/* <footer className={styles.footer}>
        <p className='font-lora'>© {new Date().getFullYear()} National Ocular Genetic Registry</p>
        </footer> */}
      </div>

    </div>
  );
}

export default InquireNow;
