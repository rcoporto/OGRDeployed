"use client"
import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc, getDoc, setDoc, } from 'firebase/firestore';
import { db } from "../../../../firebase/firebase"; // Make sure the path is correct
import styles from './ManageApplications.module.css';
import Sidebar from './Sidebar';
import Navbar from '../../components/Navbar';

// To check for valid access
import { useAuth } from '../../context/authContext'; // Ensure this is imported correctly
import { useRouter } from 'next/navigation'; // or 'react-router-dom' if using that

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionMenuVisible, setActionMenuVisible] = useState(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ top: 0, left: 0 });
  const [filterStatus, setFilterStatus] = useState('All');
  const [accessFilter, setAccessFilter] = useState('All');
  const actionMenuRef = useRef(null);

  const generateRandomPassword = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // For login/access checking
  const user = useAuth(); // Destructure logout directly
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const [hasAdminAccess, setHasAdminAccess] = useState(false); // Track research access
  const router = useRouter();

  // Check if admin
  useEffect(() => {
    try {
      if (user && user.user.userType === "Admin") {
        setIsAuthenticated(true);
        setHasAdminAccess(true);
      } else {
        setIsAuthenticated(false);
        setHasAdminAccess(false);
        router.push('/invalid')

      }
    }
    catch {
      setIsAuthenticated(false);
      setHasAdminAccess(false);
      router.push('/invalid')
    }
  }, []);

  // Fetch applications from Firestore
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'newUser'));
        const appData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(appData);
        setFilteredApplications(appData);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  // Update filtered applications based on selected filters
  useEffect(() => {
    filterApplications();
  }, [filterStatus, accessFilter, applications]);

  const filterApplications = () => {
    let filtered = applications;
    if (filterStatus !== 'All') {
      filtered = filtered.filter(app => app.status === filterStatus);
    }
    // if (accessFilter !== 'All') {
    //   filtered = filtered.filter(app => app.accessRequest.includes(accessFilter));
    // }
    if (accessFilter !== 'All') {
      if (accessFilter == 'Registry')
        filtered = filtered.filter(app => app.registry);
      else if (accessFilter == 'Research')
        filtered = filtered.filter(app => app.research);
    }
    setFilteredApplications(filtered);
  };

  const handleBadgeFilter = (status) => setFilterStatus(status);

  const handleAccessFilterChange = (event) => setAccessFilter(event.target.value);

  const handleApprove = async (id) => {
    try {
      // Reference to the application in newUser collection
      const appRef = doc(db, 'newUser', id);
      const appSnap = await getDoc(appRef);

      if (appSnap.exists()) {
        const applicationData = appSnap.data();

        // Generate a random password for the new user
        const password = generateRandomPassword();

        // Prepare data for registeredUsers collection
        const registeredUserData = {
          ...applicationData,
          password: password,
          status: 'Approved', // Optional, in case you want to store status here
          approvedAt: new Date(),
        };

        // Copy data to registeredUsers collection
        const registeredUserRef = doc(db, 'registeredUsers', id); // Use same ID or generate a new one
        await setDoc(registeredUserRef, registeredUserData);

        // Update the application status in newUser collection
        await updateDoc(appRef, { status: 'Approved' });

        // Update local state (if using React state)
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: 'Approved' } : app))
        );
        setActionMenuVisible(null);
        setShowModal(false);

        alert(`User approved with password: ${password}`);
      } else {
        console.error('No such application found!');
      }
    } catch (error) {
      console.error('Error approving application: ', error);
    }
  };


  const handleDeny = async (id) => {
    await updateApplicationStatus(id, 'Denied');
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const applicationRef = doc(db, 'newUser', id);
      await updateDoc(applicationRef, { status });
      setApplications(apps => apps.map(app => (app.id === id ? { ...app, status } : app)));
      setActionMenuVisible(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteDoc(doc(db, 'newUser', id));
        setApplications(apps => apps.filter(app => app.id !== id));
        setActionMenuVisible(null);
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
    setActionMenuVisible(null);
  };

  const showActionMenu = (event, appId) => {
    event.preventDefault();
    setActionMenuVisible(appId);
    setActionMenuPosition({ top: event.clientY, left: event.clientX });
  };

  return (
    <>
      <div
        className={styles.page}
        style={{
          backgroundImage: "url('/wavelines4.png')",
          backgroundColor: "white",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          width: '100vw',
        }}
      >
        <Navbar /> <br />
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
              <button onClick={() => handleBadgeFilter('All')}>All: {applications.length}</button>
              <button onClick={() => handleBadgeFilter('Pending')}>Pending: {applications.filter(app => app.status === 'Pending').length}</button>
              <button onClick={() => handleBadgeFilter('Approved')}>Approved: {applications.filter(app => app.status === 'Approved').length}</button>
              <button onClick={() => handleBadgeFilter('Denied')}>Denied: {applications.filter(app => app.status === 'Denied').length}</button>
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
                    <th>Registry Access</th>
                    <th>Research Access</th>
                    <th>Status</th>
                    <th>Proof of Identity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map(app => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.contact}</td>
                      <td>{app.userType}</td>
                      <td>{app.registry ? 'Yes' : 'No'}</td>
                      <td>{app.research ? 'Yes' : 'No'}</td>

                      <td className={styles[`status-${app.status.toLowerCase()}`]}>{app.status}</td>
                      <td>{app.identity}</td>

                      <td>
                        <button className={styles.actionButton} onClick={e => showActionMenu(e, app.id)}>⋮</button>
                        {actionMenuVisible === app.id && (
                          <div className={styles.actionMenu} style={{ top: actionMenuPosition.top, left: actionMenuPosition.left }} ref={actionMenuRef}>
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
                  <p><strong>Registry Access:</strong> {selectedApplication.registry ? 'Yes' : 'No'}</p>
                  <p><strong>Research Access:</strong> {selectedApplication.research ? 'Yes' : 'No'}</p>

                  <p><strong>Status:</strong> {selectedApplication.status}</p>
                  <p><strong>Proof of Identity:</strong> <a href={selectedApplication.proof} target="_blank" rel="noopener noreferrer">View Proof</a></p>
                  <div className={styles.modalActions}>
                    <button onClick={() => handleApprove(selectedApplication.id)}>Approve</button>
                    <button onClick={() => handleDeny(selectedApplication.id)}>Deny</button>
                    <button onClick={() => setShowModal(false)}>Close</button>
                  </div>
                </div>
              </div>
            )}

          {/* End of content div */}
          </div>

        {/* End of container div */}
        </div>

      {/* End of page div */}
      </div>
    </>
  );
};

export default ManageApplications;

