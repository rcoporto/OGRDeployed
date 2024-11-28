// "use client"

// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import styles from './Families.module.css';


// function Families({ isAdmin }) {
//   const [events, setEvents] = useState([
//     { id: 1, title: 'Retinitis Pigmentosa Workshop', date: '2024-10-01', category: 'Retinitis Pigmentosa', details: 'A workshop for Retinitis Pigmentosa patients.' },
//     { id: 2, title: 'Stargardt Disease Seminar', date: '2024-10-05', category: 'Stargardt Disease', details: 'An educational seminar on Stargardt Disease.' },
//     { id: 3, title: 'Cone Rod Dystrophy Support Group', date: '2024-10-10', category: 'Cone Rod Dystrophy', details: 'Support group meeting for Cone Rod Dystrophy patients.' },
//     { id: 4, title: 'test', date: '2024-10-10', category: 'Cone Rod Dystrophy', details: 'Support group meeting for Cone Rod Dystrophy patients.' }
//   ]);

//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [showDetails, setShowDetails] = useState(null);
//   const [showForm, setShowForm] = useState({ type: null, event: null });

//   const handleAddEvent = () => {
//     setShowForm({ type: 'add', event: { title: '', date: '', category: '', details: '' } });
//   };

//   const handleEditEvent = (event) => {
//     setShowForm({ type: 'edit', event });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newEvent = {
//       id: showForm.type === 'add' ? events.length + 1 : showForm.event.id,
//       ...showForm.event,
//     };
//     let updatedEvents;
//     if (showForm.type === 'add') {
//       updatedEvents = [...events, newEvent];
//     } else {
//       updatedEvents = events.map(event => event.id === newEvent.id ? newEvent : event);
//     }

//     // Sort events by date after adding/editing
//     updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

//     setEvents(updatedEvents);
//     setShowForm({ type: null, event: null });
//   };

//   const deleteEvent = (id) => {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       const updatedEvents = events.filter(event => event.id !== id);
      
//       // Sort remaining events by date
//       updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

//       setEvents(updatedEvents);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
//   };

//   const filteredEvents = events
//     .filter(event => selectedCategory === '' || event.category === selectedCategory)
//     .sort((a, b) => new Date(a.date) - new Date(b.date)); // Ensure filtered events are sorted by date

//   return (
//     <>
//       <Navbar />
//       <div className={styles.familiesContainer}> 
//         <title>Families</title>

//         {/* How to donate section */}
//         <section className={styles.donateSection}>
//           <h2>How to Donate</h2>
//           <p>You can support us by donating to the following bank account:</p>
//           <p>Bank: Example Bank</p>
//           <p>Account Name: Families Support</p>
//           <p>Account Number: 1234 5678 9012</p>
//           <p>SWIFT Code: EXAMPBANK</p>
//           <img src="/path/to/qr-code.png" alt="QR Code for Donation" className={styles.qrCode} />
//         </section>

//         {/* Schedule of activities section */}
//         <section className={styles.scheduleSection}>
//           <h2>Schedule of Activities</h2>

//           {/* Filters for event categories */}
//           <div className={styles.filters}>
//             <label>Filter by category:</label>
//             <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
//               <option value="">All</option>
//               <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
//               <option value="Stargardt Disease">Stargardt Disease</option>
//               <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
//             </select>
//             {isAdmin && (
//               <button onClick={handleAddEvent} className={styles.addBtn}>Add Event</button>
//             )}
//           </div>

//           {/* Event table */}
//           <table className={styles.eventTable}>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Event Title</th>
//                 {isAdmin && <th>Actions</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEvents.map(event => (
//                 <tr key={event.id} onClick={() => setShowDetails(showDetails === event.id ? null : event.id)}>
//                   <td>{formatDate(event.date)}</td>
//                   <td>{event.title}</td>
//                   {isAdmin && (
//                     <td>
//                       <button onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }} className={styles.editBtn}>Edit</button>
//                       <button onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} className={styles.deleteBtn}>Delete</button>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Event details overlay */}
//           {showDetails && (
//             <div className={styles.overlay}>
//               <div className={styles.overlayContent}>
//                 <button className={styles.closeButton} onClick={() => setShowDetails(null)}>X</button>
//                 <h3>Event Details</h3>
//                 <p>{filteredEvents.find(event => event.id === showDetails).details}</p>
//               </div>
//             </div>
//           )}

//           {/* Event form overlay */}
//           {showForm.type && (
//             <div className={styles.overlay}>
//               <div className={styles.overlayContent}>
//                 <button className={styles.closeButton} onClick={() => setShowForm({ type: null, event: null })}>X</button>
//                 <h3>{showForm.type === 'add' ? 'Add Event' : 'Edit Event'}</h3>
//                 <form onSubmit={handleSubmit}>
//                   <label>Event Title:</label>
//                   <input
//                     type="text"
//                     value={showForm.event.title}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, title: e.target.value } })}
//                     required
//                   />

//                   <label>Date:</label>
//                   <input
//                     type="date"
//                     value={showForm.event.date}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, date: e.target.value } })}
//                     required
//                   />

//                   <label>Category:</label>
//                   <select
//                     value={showForm.event.category}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, category: e.target.value } })}
//                     required
//                   >
//                     <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
//                     <option value="Stargardt Disease">Stargardt Disease</option>
//                     <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
//                   </select>

//                   <label>Event Details:</label>
//                   <textarea
//                     value={showForm.event.details}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, details: e.target.value } })}
//                     required
//                   ></textarea>

//                   <button type="submit" className={styles.submitBtn}>
//                     {showForm.type === 'add' ? 'Submit' : 'Update'}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </section>
//       </div>
//     </>
//   );
// }

// export default Families;

// "use client";

// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import styles from './Families.module.css';
// import FamiliesSection from '../components/FamiliesSection';
// import { db } from '../../../firebase/firebase'; // Adjust this path as needed
// import { collection, getDocs } from 'firebase/firestore';
// import ActivitiesTable from '../components/ActivitiesTable';


// function Families({ isAdmin }) {
//   const [events, setEvents] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [showDetails, setShowDetails] = useState(null);
//   const [showForm, setShowForm] = useState({ type: null, event: null });

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const eventsCollection = collection(db, 'schedule');
//         const eventSnapshot = await getDocs(eventsCollection);
//         const eventList = eventSnapshot.docs.map(doc => ({
//           id: doc.id, // Firestore document ID
//           ...doc.data(), // Get document data
//         }));
//         setEvents(eventList);
//       } catch (error) {
//         console.error("Error fetching events: ", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleAddEvent = () => {
//     setShowForm({ type: 'add', event: { title: '', date: '', category: '', details: '' } });
//   };

//   const handleEditEvent = (event) => {
//     setShowForm({ type: 'edit', event });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newEvent = {
//       id: showForm.type === 'add' ? Date.now().toString() : showForm.event.id, // Use timestamp for new ID
//       ...showForm.event,
//     };

//     let updatedEvents;
//     if (showForm.type === 'add') {
//       // Save new event to Firestore
//       // You would add a function to add this to Firestore
//       await addDoc(collection(db, 'schedule'), newEvent);
//       updatedEvents = [...events, newEvent];
//     } else {
//       // Update existing event
//       await updateDoc(doc(db, 'schedule', newEvent.id), newEvent); // Assuming event.id is the document ID
//       updatedEvents = events.map(event => (event.id === newEvent.id ? newEvent : event));
//     }

//     // Sort events by date after adding/editing
//     updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
//     setEvents(updatedEvents);
//     setShowForm({ type: null, event: null });
//   };

//   const deleteEvent = async (id) => {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       // Delete from Firestore
//       await deleteDoc(doc(db, 'schedule', id)); // Assuming id corresponds to document ID
//       const updatedEvents = events.filter(event => event.id !== id);
//       // Sort remaining events by date
//       updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
//       setEvents(updatedEvents);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
//   };

//   const filteredEvents = events
//     .filter(event => selectedCategory === '' || event.category === selectedCategory)
//     .sort((a, b) => new Date(a.date) - new Date(b.date)); // Ensure filtered events are sorted by date

//   return (
//     <>
//       <div className={styles.page}> 
//         <title>Families</title>
//         <Navbar />

//         {/* How to donate section */}

//         <FamiliesSection />

//         <div class="mt-32 mb-14 mx-20 z-10 text-center">                       
                    
//           <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-bluegreen-75 md:text-5xl lg:text-6xl">Support <span class="text-bluegreen-90">Groups</span></h1>
//           <p class="text-lg font-normal font-lora text-gray-60 lg:text-xl">See schedule of upcoming activities of patients here.</p>

//         </div> 

//         {/* <section className={styles.donateSection}>
//           <h2>How to Donate</h2>
//           <p>You can support us by donating to the following bank account:</p>
//           <p>Bank: Example Bank</p>
//           <p>Account Name: Families Support</p>
//           <p>Account Number: 1234 5678 9012</p>
//           <p>SWIFT Code: EXAMPBANK</p>
//           <img src="/path/to/qr-code.png" alt="QR Code for Donation" className={styles.qrCode} />
//         </section> */}

//         {/* Schedule of activities section */}
//         <section className={styles.scheduleSection}>
//           {/* <h2>Schedule of Activities</h2> */}

//           {/* Filters for event categories */}
//           {/* <div className={styles.filters}> */}
//           <div>
//             <label class="ml-14 mr-6 text-gray-70 font-lora">Filter by category:</label>
//             <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} class="px-4 py-2 border rounded-lg border-bluegreen-60 text-bluegreen-70">
//               <option value="">All</option>
//               <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
//               <option value="Stargardt Disease">Stargardt Disease</option>
//               <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
//             </select>
//             {isAdmin && (
//               <button onClick={handleAddEvent} class="text-white bg-bluegreen-1 cursor-pointer focus:ring-4 focus:outline-none focus:ring-bluegreen-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ml-24">
//                 <svg class="w-5.5 h-5.5 text-bluegreen-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
//                 </svg>

//                 Add Event</button>
//             )}
//           </div>

//           <ActivitiesTable />

//           {/* Event table */}
//           <table className={styles.eventTable}>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Event Title</th>
//                 {isAdmin && <th>Actions</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEvents.map(event => (
//                 <tr key={event.id} onClick={() => setShowDetails(showDetails === event.id ? null : event.id)}>
//                   <td>{formatDate(event.date)}</td>
//                   <td>{event.title}</td>
//                   {isAdmin && (
//                     <td>
//                       <button onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }} className={styles.editBtn}>Edit</button>
//                       <button onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} className={styles.deleteBtn}>Delete</button>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Event details overlay */}
//           {showDetails && (
//             <div className={styles.overlay}>
//               <div className={styles.overlayContent}>
//                 <button className={styles.closeButton} onClick={() => setShowDetails(null)}>X</button>
//                 <h3>Event Details</h3>
//                 <p>{filteredEvents.find(event => event.id === showDetails).details}</p>
//               </div>
//             </div>
//           )}

//           {/* Event form overlay */}
//           {showForm.type && (
//             <div className={styles.overlay}>
//               <div className={styles.overlayContent}>
//                 <button className={styles.closeButton} onClick={() => setShowForm({ type: null, event: null })}>X</button>
//                 <h3>{showForm.type === 'add' ? 'Add Event' : 'Edit Event'}</h3>
//                 <form onSubmit={handleSubmit}>
//                   <label>Event Title:</label>
//                   <input
//                     type="text"
//                     value={showForm.event.title}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, title: e.target.value } })}
//                     required
//                   />

//                   <label>Date:</label>
//                   <input
//                     type="date"
//                     value={showForm.event.date}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, date: e.target.value } })}
//                     required
//                   />

//                   <label>Category:</label>
//                   <select
//                     value={showForm.event.category}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, category: e.target.value } })}
//                     required
//                   >
//                     <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
//                     <option value="Stargardt Disease">Stargardt Disease</option>
//                     <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
//                   </select>

//                   <label>Event Details:</label>
//                   <textarea
//                     value={showForm.event.details}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, details: e.target.value } })}
//                     required
//                   ></textarea>

//                   <button type="submit" className={styles.submitBtn}>
//                     {showForm.type === 'add' ? 'Submit' : 'Update'}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </section>

//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#55A1B4" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
//       </div>
//     </>
//   );
// }

// export default Families;

// "use client";

// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import styles from './Families.module.css';
// import FamiliesSection from '../components/FamiliesSection';
// import { db } from '../../../firebase/firebase'; // Adjust this path as needed
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// import ActivitiesTable from '../components/ActivitiesTable';

// function Families({ isAdmin }) {
//   const [events, setEvents] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [showDetails, setShowDetails] = useState(null);
//   const [showForm, setShowForm] = useState({ type: null, event: null });

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const eventsCollection = collection(db, 'schedule');
//         const eventSnapshot = await getDocs(eventsCollection);
//         const eventList = eventSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setEvents(eventList);
//       } catch (error) {
//         console.error("Error fetching events: ", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleAddEvent = () => {
//     setShowForm({ type: 'add', event: { title: '', date: '', category: '', details: '' } });
//   };

//   const handleEditEvent = (event) => {
//     setShowForm({ type: 'edit', event });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const eventToSave = {
//       ...showForm.event,
//       id: showForm.type === 'add' ? Date.now().toString() : showForm.event.id,
//     };

//     try {
//       if (showForm.type === 'add') {
//         await addDoc(collection(db, 'schedule'), eventToSave);
//         setEvents((prevEvents) => [...prevEvents, eventToSave]);
//       } else {
//         const eventDoc = doc(db, 'schedule', eventToSave.id);
//         await updateDoc(eventDoc, eventToSave);
//         setEvents((prevEvents) => prevEvents.map((event) => (event.id === eventToSave.id ? eventToSave : event)));
//       }
//       setShowForm({ type: null, event: null });
//     } catch (error) {
//       console.error("Error saving event: ", error);
//     }
//   };

//   const deleteEvent = async (id) => {
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       try {
//         // Delete from Firestore
//         const eventDoc = doc(db, 'schedule', id);
//         await deleteDoc(eventDoc);
  
//         // Update the local state to reflect deletion
//         alert(id);
//         setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
//         alert("deleted");
//       } catch (error) {
//         console.error("Error deleting event: ", error);
//       }
//     }
//   };
  

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
//   };

//   const filteredEvents = events
//     .filter(event => selectedCategory === '' || event.category === selectedCategory)
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   return (
//     <>
//       <div className={styles.page}> 
//         <title>Families</title>
//         <Navbar />

//         <FamiliesSection />

//         <div class="mt-32 mb-14 mx-20 z-10 text-center">                       
                    
//           <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-bluegreen-75 md:text-5xl lg:text-6xl">Support <span class="text-bluegreen-90">Groups</span></h1>
//           <p class="text-lg font-normal font-lora text-gray-60 lg:text-xl">See schedule of upcoming activities of patients here.</p>

//         </div> 

//         <section className={styles.scheduleSection}>
//           <div>
//             <label class="ml-14 mr-6 text-gray-70 font-lora">Filter by category:</label>
//             <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} class="px-4 py-2 border rounded-lg border-bluegreen-60 text-bluegreen-70">
//               <option value="">All</option>
//               <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
//               <option value="Stargardt Disease">Stargardt Disease</option>
//               <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
//             </select>
//             {/* {isAdmin && (
//               <button onClick={handleAddEvent} class="text-white bg-bluegreen-1 cursor-pointer focus:ring-4 focus:outline-none focus:ring-bluegreen-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ml-24">
//                 <svg class="w-5.5 h-5.5 text-bluegreen-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
//                 </svg>
//                 Add Event
//               </button>
//             )} */}
//           </div>

//           {/* <ActivitiesTable isAdmin={true} /> */}
          
//           <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
//           {/* <table className={styles.eventTable}> */}
//             <table class="w-full text-sm text-left rtl:text-right text-gray-500">
//               <thead class="text-base text-bluegreen-90 uppercase bg-gray-50 text-center">
//                 <tr>
//                   <th scope="col" class="px-6 py-3">Date</th>
//                   <th scope="col" class="px-6 py-3">Event Title</th>
//                   {isAdmin && <th scope="col" class="px-6 py-3">Actions</th>}
//                 </tr>
//               </thead>
//               <tbody class="cursor-pointer">
//                 {filteredEvents.map(event => (
//                   <tr class="bg-white border-b hover:bg-gray-50 text-center" key={event.id} onClick={() => setShowDetails(showDetails === event.id ? null : event.id)}>
//                     <td class="font-lora">{formatDate(event.date)}</td>
//                     <td class="font-lora">{event.title}</td>
//                     {isAdmin && (
//                       <td class="px-6 py-4 text-center">
//                         {/* <button onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }} className={styles.editBtn}>Edit</button> */}
//                         <button onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }} class="text-white bg-gradient-to-r to-bluegreen-1 from-bluegreen-80 transition-all duration-300 cursor-pointer hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-bluegreen-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
//                         <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//                                           <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
//                                           <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
//                                           </svg>
//                           Edit</button>
//                         {/* <button onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} className={styles.deleteBtn}>Delete</button> */}
//                         <button onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} class="text-white bg-gradient-to-r to-pink-10 from-pink-50 hover:bg-gradient-to-l focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
//                         <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//                                       <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
//                                       </svg>
//                           Delete</button>
//                       </td>
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                         <tr class="bg-white border-b hover:bg-gray-50 text-center">
//                             <th scope="row" class="px-6 py-3 text-base">
                                
//                             {/* <button class="text-white bg-bluegreen-1 cursor-pointer focus:ring-4 focus:outline-none focus:ring-bluegreen-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 hover:bg-bluegreen-60">
//                             <svg class="w-5.5 h-5.5 text-bluegreen-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
//                             </svg>

//                             Add Event</button> */}
//                             {isAdmin && (
//                               <button onClick={handleAddEvent} class="text-white bg-bluegreen-1 cursor-pointer hover:bg-bluegreen-60 focus:ring-4 focus:outline-none focus:ring-bluegreen-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
//                                 <svg class="w-5.5 h-5.5 text-bluegreen-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
//                                 </svg>
//                                 Add Event
//                               </button>
//                             )}
//                             </th>
//                             <td class="px-6 py-3"></td>
//                             <td class="px-6 py-3"></td>
//                         </tr>
//                     </tfoot>
//             </table>
//           </div>

//           {showDetails && (
//             <div className={styles.overlay}>
//               <div className={styles.overlayContent}>
//                 <button className={styles.closeButton} onClick={() => setShowDetails(null)}>X</button>
//                 <h3>Event Details</h3>
//                 <p>{filteredEvents.find(event => event.id === showDetails).details}</p>
//               </div>
//             </div>
//           )}

//           {showForm.type && (
//             <div className={styles.overlay}>
//               <div className={styles.overlayContent}>
//                 <button className={styles.closeButton} onClick={() => setShowForm({ type: null, event: null })}>X</button>
//                 <h3>{showForm.type === 'add' ? 'Add Event' : 'Edit Event'}</h3>
//                 <form onSubmit={handleSubmit}>
//                   <label>Event Title:</label>
//                   <input
//                     type="text"
//                     value={showForm.event.title}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, title: e.target.value } })}
//                     required
//                   />

//                   <label>Date:</label>
//                   <input
//                     type="date"
//                     value={showForm.event.date}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, date: e.target.value } })}
//                     required
//                   />

//                   <label>Category:</label>
//                   <select
//                     value={showForm.event.category}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, category: e.target.value } })}
//                     required
//                   >
//                     <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
//                     <option value="Stargardt Disease">Stargardt Disease</option>
//                     <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
//                   </select>

//                   <label>Event Details:</label>
//                   <textarea
//                     value={showForm.event.details}
//                     onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, details: e.target.value } })}
//                     required
//                   ></textarea>

//                   <button type="submit" className={styles.submitBtn}>
//                     {showForm.type === 'add' ? 'Submit' : 'Update'}
//                   </button>
//                 </form>
                
//               </div>
//             </div>
//           )}
//         </section>

//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#55A1B4" fill-opacity="1" d="M0,96L48,128C96,160,192,224,288,250.7C384,277,480,267,576,229.3C672,192,768,128,864,112C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
//         </path></svg>
        
//         <footer className={styles.footer}>
//         <p className='font-lora'>© {new Date().getFullYear()} National Ocular Genetic Registry</p>
//         </footer>
//       </div>
//     </>
//   );
// }

// export default Families;


"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from './Families.module.css';
import FamiliesSection from '../components/FamiliesSection';
import { db } from '../../../firebase/firebase'; // Adjust this path as needed
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import ActivitiesTable from '../components/ActivitiesTable';

function Families({ isAdmin }) {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDetails, setShowDetails] = useState(null);
  const [showForm, setShowForm] = useState({ type: null, event: null });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'schedule');
        const eventSnapshot = await getDocs(eventsCollection);
        const eventList = eventSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    setShowForm({ type: 'add', event: { title: '', date: '', category: '', details: '' } });
  };

  const handleEditEvent = (event) => {
    setShowForm({ type: 'edit', event });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventToSave = {
      title: showForm.event.title,
      date: showForm.event.date,
      category: showForm.event.category,
      details: showForm.event.details,
    };

    try {
      if (showForm.type === 'add') {
        // Add document without manually setting the ID
        const docRef = await addDoc(collection(db, 'schedule'), eventToSave);
        setEvents((prevEvents) => [...prevEvents, { id: docRef.id, ...eventToSave }]);
      } else {
        const eventDoc = doc(db, 'schedule', showForm.event.id);
        await updateDoc(eventDoc, eventToSave);
        setEvents((prevEvents) => prevEvents.map((event) => (event.id === showForm.event.id ? { id: event.id, ...eventToSave } : event)));
      }
      setShowForm({ type: null, event: null });
    } catch (error) {
      console.error("Error saving event: ", error);
    }
  };

  const deleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        // Delete from Firestore
        const eventDoc = doc(db, 'schedule', id);
        await deleteDoc(eventDoc);
  
        // Update the local state to reflect deletion
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
      } catch (error) {
        console.error("Error deleting event: ", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
  };

  const filteredEvents = events
    .filter(event => selectedCategory === '' || event.category === selectedCategory)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className={styles.page}>
      <title>Families</title>
      <Navbar />

      <FamiliesSection />

      <div className="mt-32 mb-14 mx-20 z-10 text-center">                       
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-bluegreen-75 md:text-5xl lg:text-6xl">Support <span className="text-bluegreen-90">Groups</span></h1>
        <p className="text-lg font-normal font-lora text-gray-60 lg:text-xl">See schedule of upcoming activities of patients here.</p>
      </div> 

      <section className={styles.scheduleSection}>
        <div>
          <label className="ml-14 mr-6 text-gray-70 font-lora">Filter by category:</label>
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} className="px-4 py-2 border rounded-lg border-bluegreen-60 text-bluegreen-70">
            <option value="">All</option>
            <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
            <option value="Stargardt Disease">Stargardt Disease</option>
            <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
          </select>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-base text-bluegreen-90 uppercase bg-gray-50 text-center">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Event Title</th>
                {isAdmin && <th scope="col" className="px-6 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody className="cursor-pointer">
              {filteredEvents.map(event => (
                <tr className="bg-white border-b hover:bg-gray-50 text-center" key={event.id} onClick={() => setShowDetails(showDetails === event.id ? null : event.id)}>
                  <td className="font-lora">{formatDate(event.date)}</td>
                  <td className="font-lora">{event.title}</td>
                  {isAdmin && (
                    <td className="px-6 py-4 text-center">
                      <button onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }} className="text-white bg-gradient-to-r to-bluegreen-1 from-bluegreen-80 transition-all duration-300 cursor-pointer hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-bluegreen-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
                        Edit
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} className="text-white bg-gradient-to-r to-pink-10 from-pink-50 hover:bg-gradient-to-l focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr class="bg-white border-b hover:bg-gray-50 text-center">
              <th scope="row" class="px-6 py-3 text-base">
                      {isAdmin && (
                              <button onClick={handleAddEvent} class="text-white bg-bluegreen-1 cursor-pointer hover:bg-bluegreen-60 focus:ring-4 focus:outline-none focus:ring-bluegreen-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
                                <svg class="w-5.5 h-5.5 text-bluegreen-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                                </svg>
                                Add Event
                              </button>
                            )}
                            </th>
                            <td class="px-6 py-3"></td>
                            <td class="px-6 py-3"></td>
                        </tr>
                    </tfoot>
          </table>
        </div>

        {showDetails && (
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <button className={styles.closeButton} onClick={() => setShowDetails(null)}>X</button>
              <h3>Event Details</h3>
              <p>{filteredEvents.find(event => event.id === showDetails).details}</p>
            </div>
          </div>
        )}

        {showForm.type && (
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <button className={styles.closeButton} onClick={() => setShowForm({ type: null, event: null })}>X</button>
              <h3>{showForm.type === 'add' ? 'Add Event' : 'Edit Event'}</h3>
              <form onSubmit={handleSubmit}>
                <label>Event Title:</label>
                <input
                  type="text"
                  value={showForm.event.title}
                  onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, title: e.target.value } })}
                  required
                />
                <label>Date:</label>
                <input
                  type="date"
                  value={showForm.event.date}
                  onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, date: e.target.value } })}
                  required
                />
                <label>Category:</label>
                <select
                  value={showForm.event.category}
                  onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, category: e.target.value } })}
                  required
                >
                  <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
                  <option value="Stargardt Disease">Stargardt Disease</option>
                  <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
                </select>
                <label>Details:</label>
                <textarea
                  value={showForm.event.details}
                  onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, details: e.target.value } })}
                  required
                />
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Families;
