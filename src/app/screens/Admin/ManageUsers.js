"use client"

import React, { useState, useEffect, useRef } from 'react';
import styles from './ManageUsers.module.css';
import Sidebar from './Sidebar';

const usersData = [
  { id: "#12345", name: "Juan Dela Cruz", email: "jdelacruz@gmail.com", password: "password123", phone: "0991 234 5678", userType: "Admin", accessType: ["Research", "Registry"], createDate: "09/13/2024", proofOfIdentity: "professionalID.png" },
  { id: "#12346", name: "Maria Santos", email: "mariasantos@hotmail.com", password: "password456", phone: "0912 987 6543", userType: "Doctor", accessType: ["Registry"], createDate: "08/05/2023", proofOfIdentity: "id_mariasantos.png" },
  { id: "#12347", name: "John Reyes", email: "johnreyes@yahoo.com", password: "johnpass789", phone: "0933 765 4321", userType: "Nurse", accessType: ["Research"], createDate: "07/22/2022", proofOfIdentity: "id_johnreyes.png" },
  { id: "#12348", name: "Luisa Martinez", email: "lmartinez@gmail.com", password: "luisaPass1", phone: "0921 345 6789", userType: "Doctor", accessType: ["Research", "Registry"], createDate: "05/17/2024", proofOfIdentity: "id_luisamartinez.png" },
  { id: "#12349", name: "Carlos Rivera", email: "crivera@domain.com", password: "passCarlos99", phone: "0910 456 7890", userType: "Admin", accessType: ["Admin"], createDate: "06/12/2023", proofOfIdentity: "id_carlosrivera.png" },
  { id: "#12350", name: "Jessica Lee", email: "jessica_lee@gmail.com", password: "lee1234", phone: "0911 222 3333", userType: "Nurse", accessType: ["Registry"], createDate: "11/11/2022", proofOfIdentity: "id_jessicalee.png" },
];

function ManageUsers() {
  const [users, setUsers] = useState(usersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [accessTypeFilter, setAccessTypeFilter] = useState('');
  const [actionMenuVisible, setActionMenuVisible] = useState(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '', phone: '', userType: '', accessType: [], createDate: '', proofOfIdentity: '' });
  const actionMenuRef = useRef(null);

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
    setFormData(user); // Prefill form with selected user's details
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.userType || !formData.accessType.length || !formData.proofOfIdentity) {
      alert("Please fill in all required fields.");
      return;
    }

    if (selectedUser) {
      // Update existing user
      setUsers(users.map(user => user.id === formData.id ? formData : user));
    } else {
      // Add new user
      setUsers([...users, { ...formData, id: `#${Math.floor(Math.random() * 90000) + 10000}`, createDate: new Date().toLocaleDateString() }]);
    }

    setIsModalOpen(false);
    setFormData({ id: '', name: '', email: '', password: '', phone: '', userType: '', accessType: [], createDate: '', proofOfIdentity: '' });
  };

  const handleAddNewUser = () => {
    setSelectedUser(null);
    setFormData({ id: '', name: '', email: '', password: '', phone: '', userType: '', accessType: [], createDate: '', proofOfIdentity: '' }); // Reset form for new user
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, proofOfIdentity: e.target.files[0] });
  };

  
  const handleAccessTypeChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prevState => ({ ...prevState, accessType: options }));
  };

  const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;

     let newAccessType;

     if (value === 'Admin' && checked) {
       // If Admin is selected, deselect Research and Registry
       newAccessType = ['Admin'];
     } else if ((value === 'Research' || value === 'Registry') && checked) {
       // If Research or Registry is selected, deselect Admin
       newAccessType = formData.accessType.filter(type => type !== 'Admin');
       newAccessType.push(value);
     } else if (!checked) {
       // If a checkbox is unchecked, remove it from the array
       newAccessType = formData.accessType.filter(type => type !== value);
     }

     setFormData({ ...formData, accessType: newAccessType });
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
    const matchesAccessType = accessTypeFilter ? user.accessType.includes(accessTypeFilter) : true;
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
              <th>Access Type</th>
              <th>Create Date</th>
              <th>Proof of Identity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} onClick={() => handleRowClick(user)}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.userType}</td>
                <td>{user.accessType.join(", ")}</td>
                <td>{user.createDate}</td>
                <td><a href={`/${user.proofOfIdentity}`} target="_blank">{user.proofOfIdentity}</a></td>
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
                <label>Phone (optional):</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                <label>User Type:</label>
                <select name="userType" value={formData.userType} onChange={handleInputChange} required>
                  <option value="">Select User Type</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Admin">Admin</option>
                </select>
                <label>Access Type:</label>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              value="Research"
              checked={formData.accessType.includes("Research")}
              onChange={handleCheckboxChange}
              // disabled={formData.accessType.includes("Admin")}  // Disable if Admin is selected
            />
            Research
          </label>
          <label>
            <input
              type="checkbox"
              value="Registry"
              checked={formData.accessType.includes("Registry")}
              onChange={handleCheckboxChange}
              // disabled={formData.accessType.includes("Admin")}  // Disable if Admin is selected
            />
            Registry
          </label>
        </div>
        
                <label>Proof of Identity:</label>
                <input type="file" name="proofOfIdentity" onChange={handleFileChange} required={!selectedUser} />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
