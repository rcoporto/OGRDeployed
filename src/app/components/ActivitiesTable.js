"use client";

import React, { useState, useEffect } from 'react';
import styles from '../screens/Families.module.css';
import { db } from '../../../firebase/firebase'; // Adjust this path as needed
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';


const ActivitiesTable = ({ isAdmin }) => {

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
        ...showForm.event,
        id: showForm.type === 'add' ? Date.now().toString() : showForm.event.id,
      };
  
      try {
        if (showForm.type === 'add') {
          await addDoc(collection(db, 'schedule'), eventToSave);
          setEvents((prevEvents) => [...prevEvents, eventToSave]);
        } else {
          const eventDoc = doc(db, 'schedule', eventToSave.id);
          await updateDoc(eventDoc, eventToSave);
          setEvents((prevEvents) => prevEvents.map((event) => (event.id === eventToSave.id ? eventToSave : event)));
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
        <div>
            {/* <div>
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
                        Add Event
                    </button>
                )}
            </div> */}

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-base text-gray-700 uppercase bg-gray-50 text-center">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Event Name
                            </th>
                            {isAdmin && <th scope="col" class="px-6 py-3">
                                Action
                            </th>}
                        </tr>
                    </thead>
                    <tbody class="cursor-pointer">
                    {filteredEvents.map(event => (
                        <tr class="bg-white border-b hover:bg-gray-50 text-center" key={event.id} onClick={() => setShowDetails(showDetails === event.id ? null : event.id)}>
                            {/* <th scope="row" class="px-6 py-4 font-medium font-lora text-gray-900 whitespace-nowrap">
                                Lorem ipsum
                            </th>
                            <td class="px-6 py-4 font-lora">
                                Lorem ipsum
                            </td> */}
                            <td>{formatDate(event.date)}</td>
                            <td>{event.title}</td>
                            {isAdmin && (
                            <td class="px-6 py-4 text-center">
                                <button type="button" onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }} class="text-white bg-gradient-to-r to-bluegreen-1 from-bluegreen-80 transition-all duration-300 cursor-pointer hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-bluegreen-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
                                        <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                                        <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                                        </svg>
                                        Edit
                                </button>
                                <button type="button" onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} class="text-white bg-gradient-to-r to-pink-10 from-pink-50 hover:bg-gradient-to-l focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                                    <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                    </svg>
                                        Delete
                                </button>
                            </td>
                            )}
                        </tr>
                        // <tr class="bg-white border-b hover:bg-gray-50 text-center">
                        //     <th scope="row" class="px-6 py-4 font-medium font-lora text-gray-900 whitespace-nowrap dark:text-white">
                        //         Lorem ipsum
                        //     </th>
                        //     <td class="px-6 py-4 font-lora">
                        //         Lorem ipsum
                        //     </td>
                        //     <td class="px-6 py-4 text-center">
                        //         <button type="button" class="text-white bg-gradient-to-r to-bluegreen-1 from-bluegreen-80 transition-all duration-300 cursor-pointer hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-bluegreen-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                        //                 <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        //                 <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                        //                 <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                        //                 </svg>
                        //                 Edit
                        //             </button>
                        //             <button type="button" class="text-white bg-gradient-to-r to-pink-10 from-pink-50 hover:bg-gradient-to-l focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                        //             <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        //             <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                        //             </svg>
                        //                 Delete
                        //         </button>
                        //     </td>
                        // </tr>
                        // <tr class="bg-white border-b hover:bg-gray-50 text-center">
                        //     <th scope="row" class="px-6 py-4 font-medium font-lora text-gray-900 whitespace-nowrap dark:text-white">
                        //         Lorem ipsum
                        //     </th>
                        //     <td class="px-6 py-4 font-lora">
                        //         Lorem ipsum
                        //     </td>
                        //     <td class="px-6 py-4 text-center">
                        //         <button type="button" class="text-white bg-gradient-to-r to-bluegreen-1 from-bluegreen-80 transition-all duration-300 cursor-pointer hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-bluegreen-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                        //             <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        //             <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                        //             <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                        //             </svg>
                        //             Edit
                        //         </button>
                        //         <button type="button" class="text-white bg-gradient-to-r to-pink-10 from-pink-50 hover:bg-gradient-to-l focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                        //         <svg class="w-5 h-5 text-gray-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        //         <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                        //         </svg>
                        //             Delete
                        //         </button>
                        //     </td>
                            
                        // </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr class="bg-white border-b hover:bg-gray-50 text-center">
                            <th scope="row" class="px-6 py-3 text-base">
                                
                            <button class="text-white bg-bluegreen-1 cursor-pointer focus:ring-4 focus:outline-none focus:ring-bluegreen-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 hover:bg-bluegreen-60">
                            <svg class="w-5.5 h-5.5 text-bluegreen-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                            </svg>

                            Add Event</button>
                            </th>
                            <td class="px-6 py-3"></td>
                            <td class="px-6 py-3"></td>
                        </tr>
                    </tfoot>
                </table>

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
            </div>
        </div>
    )
}

export default ActivitiesTable;