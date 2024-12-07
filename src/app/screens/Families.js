"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from './Families.module.css';
import FamiliesSection from '../components/FamiliesSection';
import { db } from '../../../firebase/firebase'; // Adjust this path as needed
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

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
    // if (window.confirm('Are you sure you want to delete this event?')) {
      if (typeof window !== 'undefined' && window.confirm('Are you sure you want to delete this event?')) {

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

    // Container div for entire page
    <div class="flex flex-col min-h-screen bg-[#F8F8FF]">
      <title>Families</title>
      <Navbar />

      <FamiliesSection />

      <div className="mt-32 mb-14 mx-20 z-10 text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-bluegreen-75 md:text-5xl lg:text-6xl">Support <span className="text-bluegreen-90">Groups</span></h1>
        <p className="text-lg font-normal font-lora text-gray-60 lg:text-xl">See schedule of upcoming activities of patients here.</p>
      </div>

      <section class="mb-4">
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
                  <td className="px-6 py-4 text-center font-lora">{formatDate(event.date)}</td>
                  <td className="px-6 py-4 text-center font-lora">{event.title}</td>
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
            {isAdmin && (
              <tfoot>
                <tr class="bg-white border-b hover:bg-gray-50 text-center">
                  <th scope="row" class="px-6 py-3 text-base">
                    <button onClick={handleAddEvent} class="text-white bg-bluegreen-1 cursor-pointer hover:bg-bluegreen-60 focus:ring-4 focus:outline-none focus:ring-bluegreen-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
                      <svg class="w-5.5 h-5.5 text-bluegreen-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                      </svg>
                      Add Event
                    </button>
                  </th>
                  <td class="px-6 py-3"></td>
                  <td class="px-6 py-3"></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {showDetails && (
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <button className={styles.closeButton} onClick={() => setShowDetails(null)}>X</button>
              <h3 class="text-lightbluegreen-5 text-xl font-bold mb-3">Event Details</h3>
              <p class="font-lora text-[#EEEEEE]">{filteredEvents.find(event => event.id === showDetails).details}</p>
            </div>
          </div>
        )}

        {showForm.type && (
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <button className={styles.closeButton} onClick={() => setShowForm({ type: null, event: null })}>X</button>
              <h3 class="text-lightbluegreen-5 text-xl font-bold mb-5">{showForm.type === 'add' ? 'Add Event' : 'Edit Event'}</h3>
              <form onSubmit={handleSubmit}>
                <label class="block mb-2 text-left text-sm font-medium text-bluegreen-1">Event Title:</label>
                <input
                  type="text"
                  value={showForm.event.title}
                  onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, title: e.target.value } })}
                  class="block px-2.5 py-2.5 mb-3 w-full font-lora text-sm text-[#EEEEEE] bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                  required
                />

                <div class="z-10 mb-2 grid md:grid-cols-2 gap-4">
                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-1">Date:</label>
                    <input
                      type="date"
                      value={showForm.event.date}
                      onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, date: e.target.value } })}
                      class="block px-2.5 py-2.5 w-full font-lora text-sm text-bluegreen-90 bg-[#EEEEEE] rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    />
                  </div>

                  <div class="relative">
                    <label class="block mb-2 text-left text-sm font-medium text-bluegreen-1">Category:</label>
                    <select
                      value={showForm.event.category}
                      onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, category: e.target.value } })}
                      class="block px-2.5 py-2.5 w-full text-sm font-lora text-bluegreen-90 bg-[#EEEEEE] rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                      required
                    >
                      <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
                      <option value="Stargardt Disease">Stargardt Disease</option>
                      <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
                    </select>
                  </div>
                </div>

                <label class="block mb-2 text-left text-sm font-medium text-bluegreen-1">Details:</label>
                <textarea
                  value={showForm.event.details}
                  onChange={(e) => setShowForm({ ...showForm, event: { ...showForm.event, details: e.target.value } })}
                  wrap="hard"
                  rows={2}
                  cols={50}
                  class="block px-2.5 pb-2.5 pt-4 w-full font-lora text-sm text-[#EEEEEE] bg-transparent rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
                  required
                />

                <div class="mt-6 mb-2 mx-20 text-center">
                  <button type="submit" class="text-white bg-pink-20 hover:bg-pink-50 focus:ring-4 focus:ring-pink-1 font-medium rounded-lg text-base px-6 py-3 text-center justify-items-center w-max">Save</button>
                </div>
              </form>

              {/* End of overlayContent div */}
            </div>

            {/* End of overlay div */}
          </div>
        )}
      </section>

      {/* End of container div for entire page */}
    </div>
  );
}

export default Families;
