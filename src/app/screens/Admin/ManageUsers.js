  "use client";

  import React, { useState, useEffect, useRef } from 'react';
  import styles from './ManageUsers.module.css';
  import Sidebar from './Sidebar';
  import { collection, getDocs, updateDoc, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
  import { db } from "../../../../firebase/firebase";
  import { format } from 'date-fns';

  //to check for valid access
  import { useAuth } from '../../context/authContext'; // Ensure this is imported correctly
  import { useRouter } from 'next/navigation'; // or 'react-router-dom' if using that

  function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userTypeFilter, setUserTypeFilter] = useState('');
    const [accessTypeFilter, setAccessTypeFilter] = useState('');
    const [actionMenuVisible, setActionMenuVisible] = useState(null);
    const [actionMenuPosition, setActionMenuPosition] = useState({ top: 0, left: 0 });
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ 
      id: '', name: '', email: '', password: '', contact: '', userType: '', 
      registry: false, research: false, approvedAt: '', identity: '' 
    });
    const actionMenuRef = useRef(null);

    //for login/access checking
  const user = useAuth(); // Destructure logout directly
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const [hasAdminAccess, setHasAdminAccess] = useState(false); // Track research access
  const router = useRouter();
  //check if admin
  useEffect(() => {
    try{
    if (user && user.user.userType === "Admin") {
      setIsAuthenticated(true);
      setHasAdminAccess(true);
    } else {
      setIsAuthenticated(false);
      setHasAdminAccess(false);
      router.push('/invalid')
      
    }
  }
  catch{
    setIsAuthenticated(false);
      setHasAdminAccess(false);
      router.push('/invalid')
  }
  }, []);

    // Fetch users from Firebase
    useEffect(() => {
      const fetchUsers = async () => {
        const usersCollection = collection(db, "registeredUsers");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            approvedAt: data.approvedAt 
              ? format(new Date(data.approvedAt.seconds * 1000), 'MM/dd/yyyy') 
              : "Pending",
          };
        });
        setUsers(usersList);
      };
      fetchUsers();
    }, []);

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

    const handleRowClick = (user) => {
      setSelectedUser(user);
      setFormData(user);
      setIsModalOpen(true);
    };

    const handleDelete = async (userId) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        const userRef = doc(db, "registeredUsers", userId);
        await deleteDoc(userRef);
        setUsers(users.filter(user => user.id !== userId));
      }
    };

    const handleSave = async () => {
      const { name, email, password, userType, identity, contact, registry, research } = formData;
    
      //if (!name || !email || !password || !userType || !identity) {
      //  alert("Please fill in all required fields.");
      //  return;
      //}
    
      try {
        const userData = {
          name,
          email,
          password,
          userType,
          identity,
          contact,
          registry,
          research,
          approvedAt: new Date(),
          status: "Approved"
        };
    
        if (selectedUser) {
          // Update existing user in Firebase using the document ID as reference
          await updateDoc(doc(db, "registeredUsers", selectedUser.id), userData);
          setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...userData } : user)));
        } else {
          // Add new user to Firebase and use the generated document ID
          const newUserDoc = doc(collection(db, "registeredUsers"));
          await setDoc(newUserDoc, userData);
          setUsers([...users, { id: newUserDoc.id, ...userData, approvedAt: new Date().toLocaleDateString() }]);
        }
        alert("User saved successfully!");
      } catch (error) {
        console.error("Error saving user:", error);
        alert("Failed to save user.");
      }
    
      setIsModalOpen(false);
      setFormData({ id: '', name: '', email: '', password: '', contact: '', userType: '', registry: false, research: false, approvedAt: '', identity: '' });
    };
    

    const handleAddNewUser = () => {
      setSelectedUser(null);
      setFormData({ id: '', name: '', email: '', password: '', contact: '', userType: '', registry: false, research: false, approvedAt: '', identity: '' });
      setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setFormData(prevState => ({ ...prevState, [name]: checked }));
    };

    const showActionMenu = (event, userId) => {
      event.preventDefault();
      event.stopPropagation();
      setActionMenuVisible(userId);
      setActionMenuPosition({ top: event.clientY, left: event.clientX });
    };

    const filteredUsers = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesUserType = userTypeFilter ? user.userType === userTypeFilter : true;
      const matchesAccessType = accessTypeFilter ? (accessTypeFilter === 'Research' ? user.research : user.registry) : true;
      return matchesSearch && matchesUserType && matchesAccessType;
    });

    return (
      <div>
        <Sidebar />
        <div className={styles.container}>
          <h1 className={styles.title}>Manage Users</h1>

          <div className={styles.filters}>
            <select value={userTypeFilter} onChange={(e) => setUserTypeFilter(e.target.value)}>
              <option value="">Filter by User Type</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Admin">Admin</option>
            </select>

            <select value={accessTypeFilter} onChange={(e) => setAccessTypeFilter(e.target.value)}>
              <option value="">Filter by Access Type</option>
              <option value="Research">Research</option>
              <option value="Registry">Registry</option>
            </select>

            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone</th>
                <th>User Type</th>
                <th>Registry Access</th>
                <th>Research Access</th>
                <th>Create Date</th>
                <th>Proof of Identity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                // <tr key={user.id} onClick={() => handleRowClick(user)}>
                <tr key={user.id} >
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.contact}</td>
                  <td>{user.userType}</td>
                  <td>{user.registry ? 'Yes' : 'No'}</td>
                  <td>{user.research ? 'Yes' : 'No'}</td>
                  <td>{user.approvedAt}</td>
                  <td><a href={user.identity} target="_blank" rel="noopener noreferrer">{user.identity}</a></td>
                  <td>
                    <button className={styles.actionButton} onClick={(e) => showActionMenu(e, user.id)}>
                      ⋮
                    </button>
                    {actionMenuVisible === user.id && (
                      <div
                        ref={actionMenuRef}
                        className={styles.actionMenu}
                        style={{ top: actionMenuPosition.top, left: actionMenuPosition.left }}
                      >
                        <button onClick={() => handleRowClick(user)}>Edit Details</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className={styles.addButton} onClick={handleAddNewUser}>Add a New User</button>

          {isModalOpen && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>{selectedUser ? "Edit User Details" : "Add New User"}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <label>Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                  <label>Email:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  <label>Password:</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                  <label>Contact (optional):</label>
                  <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
                  <label>User Type:</label>
                  <select
  name="userType"
  value={formData.userType}
  onChange={handleInputChange}
  required
>
  <option value="">Select User Type</option>
  <option value="Doctor">Doctor</option>
  <option value="Nurse">Nurse</option>
  <option value="Admin">Admin</option>
</select>

                  <label>Registry Access:</label>
                  <input type="checkbox" name="registry" checked={formData.registry} onChange={handleCheckboxChange} />
                  <label>Research Access:</label>
                  <input type="checkbox" name="research" checked={formData.research} onChange={handleCheckboxChange} />
                  <label>Upload Proof of Identity (URL):</label>
                  <input
                    type="url"
                    name="identity"
                    value={formData.identity}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter a valid link to proof of identity"
                  />
                  <div className={styles.modalActions}>
                    <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    <button type="submit">Save</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  export default ManageUsers;
