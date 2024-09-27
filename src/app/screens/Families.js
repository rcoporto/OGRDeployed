"use client"

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from './Families.module.css';

function Families({ isAdmin }) {
  const [events, setEvents] = useState([
    { id: 1, title: 'Retinitis Pigmentosa Workshop', date: '2024-10-01', category: 'Retinitis Pigmentosa', details: 'A workshop for Retinitis Pigmentosa patients.' },
    { id: 2, title: 'Stargardt Disease Seminar', date: '2024-10-05', category: 'Stargardt Disease', details: 'An educational seminar on Stargardt Disease.' },
    { id: 3, title: 'Cone Rod Dystrophy Support Group', date: '2024-10-10', category: 'Cone Rod Dystrophy', details: 'Support group meeting for Cone Rod Dystrophy patients.' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDetails, setShowDetails] = useState(null);
  const [showForm, setShowForm] = useState({ type: null, event: null });

  const handleAddEvent = () => {
    setShowForm({ type: 'add', event: { title: '', date: '', category: '', details: '' } });
  };

  const handleEditEvent = (event) => {
    setShowForm({ type: 'edit', event });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: showForm.type === 'add' ? events.length + 1 : showForm.event.id,
      ...showForm.event,
    };
    let updatedEvents;
    if (showForm.type === 'add') {
      updatedEvents = [...events, newEvent];
    } else {
      updatedEvents = events.map(event => event.id === newEvent.id ? newEvent : event);
    }

    // Sort events by date after adding/editing
    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(updatedEvents);
    setShowForm({ type: null, event: null });
  };

  const deleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
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
      <Navbar />
      <div className={styles.familiesContainer}> 
        <title>Families</title>

        {/* How to donate section */}
        <section className={styles.donateSection}>
          <h2>How to Donate</h2>
          <p>You can support us by donating to the following bank account:</p>
          <p>Bank: Example Bank</p>
          <p>Account Name: Families Support</p>
          <p>Account Number: 1234 5678 9012</p>
          <p>SWIFT Code: EXAMPBANK</p>
          <img src="/path/to/qr-code.png" alt="QR Code for Donation" className={styles.qrCode} />
        </section>

        {/* Schedule of activities section */}
        <section className={styles.scheduleSection}>
          <h2>Schedule of Activities</h2>

          {/* Filters for event categories */}
          <div className={styles.filters}>
            <label>Filter by category:</label>
            <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
              <option value="">All</option>
              <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
              <option value="Stargardt Disease">Stargardt Disease</option>
              <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
            </select>
            {isAdmin && (
              <button onClick={handleAddEvent} className={styles.addBtn}>Add Event</button>
            )}
          </div>

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
      </div>
    </>
  );
}

export default Families;

