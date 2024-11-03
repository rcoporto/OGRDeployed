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

"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from './Families.module.css';
import FamiliesSection from '../components/FamiliesSection';
import { db } from '../../../firebase/firebase'; // Adjust this path as needed
import { collection, getDocs } from 'firebase/firestore';
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
          id: doc.id, // Firestore document ID
          ...doc.data(), // Get document data
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
    const newEvent = {
      id: showForm.type === 'add' ? Date.now().toString() : showForm.event.id, // Use timestamp for new ID
      ...showForm.event,
    };

    let updatedEvents;
    if (showForm.type === 'add') {
      // Save new event to Firestore
      // You would add a function to add this to Firestore
      await addDoc(collection(db, 'schedule'), newEvent);
      updatedEvents = [...events, newEvent];
    } else {
      // Update existing event
      await updateDoc(doc(db, 'schedule', newEvent.id), newEvent); // Assuming event.id is the document ID
      updatedEvents = events.map(event => (event.id === newEvent.id ? newEvent : event));
    }

    // Sort events by date after adding/editing
    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    setEvents(updatedEvents);
    setShowForm({ type: null, event: null });
  };

  const deleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // Delete from Firestore
      await deleteDoc(doc(db, 'schedule', id)); // Assuming id corresponds to document ID
      const updatedEvents = events.filter(event => event.id !== id);
      // Sort remaining events by date
      updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(updatedEvents);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
  };

  const filteredEvents = events
    .filter(event => selectedCategory === '' || event.category === selectedCategory)
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Ensure filtered events are sorted by date

  return (
    <>
      <div className={styles.page}> 
        <title>Families</title>
        <Navbar />

        {/* How to donate section */}

        <FamiliesSection />

        <div class="mt-32 mb-14 mx-20 z-10 text-center">                       
                    
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-bluegreen-75 md:text-5xl lg:text-6xl">Support <span class="text-bluegreen-90">Groups</span></h1>
          <p class="text-lg font-normal font-lora text-gray-60 lg:text-xl">See schedule of upcoming activities of patients here.</p>

        </div> 

        {/* <section className={styles.donateSection}>
          <h2>How to Donate</h2>
          <p>You can support us by donating to the following bank account:</p>
          <p>Bank: Example Bank</p>
          <p>Account Name: Families Support</p>
          <p>Account Number: 1234 5678 9012</p>
          <p>SWIFT Code: EXAMPBANK</p>
          <img src="/path/to/qr-code.png" alt="QR Code for Donation" className={styles.qrCode} />
        </section> */}

        {/* Schedule of activities section */}
        <section className={styles.scheduleSection}>
          {/* <h2>Schedule of Activities</h2> */}

          {/* Filters for event categories */}
          {/* <div className={styles.filters}> */}
          <div>
            <label class="ml-14 mr-6 text-gray-70 font-lora">Filter by category:</label>
            <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} class="px-4 py-2 border rounded-lg border-bluegreen-60 text-bluegreen-70">
              <option value="">All</option>
              <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
              <option value="Stargardt Disease">Stargardt Disease</option>
              <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
            </select>
            {isAdmin && (
              <button onClick={handleAddEvent} class="text-white bg-bluegreen-1 cursor-pointer focus:ring-4 focus:outline-none focus:ring-bluegreen-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ml-24">
                <svg class="w-5.5 h-5.5 text-bluegreen-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                </svg>

                Add Event</button>
            )}
          </div>

          <ActivitiesTable />

          {/* Event table */}
          <table className={styles.eventTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Event Title</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => (
                <tr key={event.id} onClick={() => setShowDetails(showDetails === event.id ? null : event.id)}>
                  <td>{formatDate(event.date)}</td>
                  <td>{event.title}</td>
                  {isAdmin && (
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }} className={styles.editBtn}>Edit</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} className={styles.deleteBtn}>Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Event details overlay */}
          {showDetails && (
            <div className={styles.overlay}>
              <div className={styles.overlayContent}>
                <button className={styles.closeButton} onClick={() => setShowDetails(null)}>X</button>
                <h3>Event Details</h3>
                <p>{filteredEvents.find(event => event.id === showDetails).details}</p>
              </div>
            </div>
          )}

          {/* Event form overlay */}
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

                  <label>Event Details:</label>
                  <textarea
                    value={showForm.event.details}
                    onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, details: e.target.value } })}
                    required
                  ></textarea>

                  <button type="submit" className={styles.submitBtn}>
                    {showForm.type === 'add' ? 'Submit' : 'Update'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#55A1B4" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      </div>
    </>
  );
}

export default Families;
