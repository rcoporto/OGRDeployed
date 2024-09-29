"use client"

import React, { useState, useEffect, useRef } from 'react';
import styles from './ManageApplications.module.css';
import Sidebar from './Sidebar';

// Sample application data
const fauxApplications = [
  {
    id: '#A0001',
    name: 'Juan Dela Cruz',
    email: 'jdelacruz@gmail.com',
    phone: '0991 234 5678',
    userType: 'Nurse',
    accessRequest: ['Research'],
    status: 'Pending',
    proof: 'proof-link-1.jpg',
  },
  {
    id: '#A0002',
    name: 'Maria Clara',
    email: 'mclara@gmail.com',
    phone: '0991 234 5679',
    userType: 'Doctor',
    accessRequest: ['Registry'],
    status: 'Approved',
    proof: 'proof-link-2.jpg',
  },
  {
    id: '#A0003',
    name: 'Jose Rizal',
    email: 'jrizal@gmail.com',
    phone: '0991 234 5680',
    userType: 'Researcher',
    accessRequest: ['Research', 'Registry'],
    status: 'Denied',
    proof: 'proof-link-3.jpg',
  },
  {
    id: '#A0004',
    name: 'Andres Bonifacio',
    email: 'abonifacio@gmail.com',
    phone: '0991 234 5681',
    userType: 'Nurse',
    accessRequest: ['Research'],
    status: 'Pending',
    proof: 'proof-link-4.jpg',
  },
  {
    id: '#A0005',
    name: 'Emilio Aguinaldo',
    email: 'eaguinaldo@gmail.com',
    phone: '0991 234 5682',
    userType: 'Doctor',
    accessRequest: ['Registry'],
    status: 'Approved',
    proof: 'proof-link-5.jpg',
  },
];

const ManageApplications = () => {
  const [applications, setApplications] = useState(fauxApplications);
  const [filteredApplications, setFilteredApplications] = useState(fauxApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionMenuVisible, setActionMenuVisible] = useState(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ top: 0, left: 0 });
  const [filterStatus, setFilterStatus] = useState('All');
  const [accessFilter, setAccessFilter] = useState('All');
  const actionMenuRef = useRef(null);

  // Handle outside click for the floating action menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setActionMenuVisible(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  // Update filtered applications based on selected filters
  useEffect(() => {
    filterApplications();
  }, [filterStatus, accessFilter]);

  const filterApplications = () => {
    let filtered = applications;

    // Filter by status
    if (filterStatus !== 'All') {
      filtered = filtered.filter((app) => app.status === filterStatus);
    }

    // Filter by access request
    if (accessFilter !== 'All') {
      filtered = filtered.filter((app) => app.accessRequest.includes(accessFilter));
    }

    setFilteredApplications(filtered);
  };

  const handleBadgeFilter = (status) => {
    setFilterStatus(status);
  };

  const handleAccessFilterChange = (event) => {
    setAccessFilter(event.target.value);
  };

  // Function to handle approval
  const handleApprove = (id) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Approved' } : app))
    );
    setActionMenuVisible(null);
    setShowModal(false);
  };

  
  // Function to handle denial
  const handleDeny = (id) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Denied' } : app))
    );
    setActionMenuVisible(null);
    setShowModal(false);
  };

  // Function to handle deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications((prev) => prev.filter((app) => app.id !== id));
      setActionMenuVisible(null);
    }
  };

  // Function to handle viewing details
  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
    setActionMenuVisible(null);
  };

  // Function to show action menu at the cursor position
  const showActionMenu = (event, appId) => {
    event.preventDefault();
    setActionMenuVisible(appId);
    setActionMenuPosition({ top: event.clientY, left: event.clientX });
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Manage Applications</h1>
          <div className={styles.filter}>
            <select onChange={handleAccessFilterChange}>
              <option value="All">Filter by Access Request</option>
              <option value="Research">Research</option>
              <option value="Registry">Registry</option>
            </select>
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        {/* Stats Section */}
        <div className={styles.stats}>
          <button onClick={() => handleBadgeFilter('All')}>
            All: {applications.length}
          </button>
          <button onClick={() => handleBadgeFilter('Pending')}>
            Pending: {applications.filter((app) => app.status === 'Pending').length}
          </button>
          <button onClick={() => handleBadgeFilter('Approved')}>
            Approved: {applications.filter((app) => app.status === 'Approved').length}
          </button>
          <button onClick={() => handleBadgeFilter('Denied')}>
            Denied: {applications.filter((app) => app.status === 'Denied').length}
          </button>
        </div>

        {/* Applications Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Submitted by</th>
                <th>Email</th>
                <th>Phone</th>
                <th>User Type</th>
                <th>Access Request</th>
                <th>Status</th>
                <th>Proof of Identity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{app.userType}</td>
                  <td>{app.accessRequest.join(', ')}</td>
                  <td className={styles[`status-${app.status.toLowerCase()}`]}>
                    {app.status}
                  </td>
                  <td>
                    <a href={app.proof} target="_blank" rel="noopener noreferrer">
                      View Proof
                    </a>
                  </td>
                  <td>
                    <button
                      className={styles.actionButton}
                      onClick={(e) => showActionMenu(e, app.id)}
                    >
                      ⋮
                    </button>
                    {actionMenuVisible === app.id && (
                      <div
                        className={styles.actionMenu}
                        style={{ top: actionMenuPosition.top, left: actionMenuPosition.left }}
                        ref={actionMenuRef}
                      >
                        {app.status === 'Pending' && (
                          <>
                            <button onClick={() => handleApprove(app.id)}>Approve</button>
                            <button onClick={() => handleDeny(app.id)}>Deny</button>
                          </>
                        )}
                        <button onClick={() => handleDelete(app.id)}>Delete</button>
                        <button onClick={() => handleViewDetails(app)}>View Details</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for viewing details */}
        {showModal && selectedApplication && (
          <div className={styles.modal} onClick={() => setShowModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h2>Application Details</h2>
              <p><strong>ID:</strong> {selectedApplication.id}</p>
              <p><strong>Name:</strong> {selectedApplication.name}</p>
              <p><strong>Email:</strong> {selectedApplication.email}</p>
              <p><strong>Phone:</strong> {selectedApplication.phone}</p>
              <p><strong>User Type:</strong> {selectedApplication.userType}</p>
              <p><strong>Access Request:</strong> {selectedApplication.accessRequest.join(', ')}</p>
              <p><strong>Status:</strong> {selectedApplication.status}</p>
              <p>
                <strong>Proof of Identity:</strong>{' '}
                <a href={selectedApplication.proof} target="_blank" rel="noopener noreferrer">
                  View Proof
                </a>
              </p>
              <div className={styles.modalActions}>
                <button onClick={() => handleApprove(selectedApplication.id)}>Approve</button>
                <button onClick={() => handleDeny(selectedApplication.id)}>Deny</button>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
