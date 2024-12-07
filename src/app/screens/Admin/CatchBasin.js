"use client";
import Navbar from '../../components/Navbar';
import React, { useState, useEffect } from "react";
import styles from "./CatchBasin.module.css";
import Sidebar from "./Sidebar";
import { db } from "../../../../firebase/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// To check for valid access
import { useAuth } from '../../context/authContext'; // Ensure this is imported correctly
import { useRouter } from 'next/navigation'; // or 'react-router-dom' if using that

function CatchBasin() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [actionMenuVisible, setActionMenuVisible] = useState(null); // State to track visible action menu

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
        router.push('/invalid');
      }
    } catch {
      setIsAuthenticated(false);
      setHasAdminAccess(false);
      router.push('/invalid');
    }
  }, [user]);

  // Fetch tickets from Firestore on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      const ticketsCollection = collection(db, "tickets");
      const ticketSnapshot = await getDocs(ticketsCollection);
      const ticketList = ticketSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(ticketList);
    };
    fetchTickets();
  }, []);

  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };

  const handleStatusChange = async (ticketId) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket.id === ticketId) {
          const newStatus = ticket.status === "Open" ? "Closed" : "Open";
          const ticketRef = doc(db, "tickets", ticketId);
          updateDoc(ticketRef, { status: newStatus });
          return { ...ticket, status: newStatus };
        }
        return ticket;
      })
    );
  };

  const handleDelete = async (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      // Delete ticket from Firestore
      const ticketRef = doc(db, "tickets", ticketId);
      await deleteDoc(ticketRef);
      setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = tagFilter ? ticket.tag === tagFilter : true;
    const matchesStatus = filterStatus === "All" || ticket.status === filterStatus;
    return matchesSearch && matchesTag && matchesStatus;
  });

  const countTickets = (status) => tickets.filter((ticket) => ticket.status === status).length;

  const toggleActionMenu = (ticketId) => {
    setActionMenuVisible((prev) => (prev === ticketId ? null : ticketId));
  };

  return (
    <>
      <div className={styles.page}>
        <Navbar />
        <Sidebar />

        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>Tickets</h1>
              <div className={styles.filter}>
                <select className={styles.filterdropdown}
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                >
                  <option value="">Filter by Tag</option>
                  <option value="Donation">Donation</option>
                  <option value="Inquiry">Inquiry</option>
                  <option value="Support">Support</option>
                  <option value="Request">Request</option>
                </select>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.stats}>
              <div onClick={() => setFilterStatus("All")}>Total: {tickets.length}</div>
              <div onClick={() => setFilterStatus("Open")}>Open: {countTickets("Open")}</div>
              <div onClick={() => setFilterStatus("Closed")}>Closed: {countTickets("Closed")}</div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tag</th>
                    <th>Submitted by</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Create Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    // <tr key={ticket.id} onClick={() => handleRowClick(ticket)}>
                    <tr key={ticket.id} >
                      <td>{ticket.id}</td>
                      <td>{ticket.tag}</td>
                      <td>{ticket.name}</td>
                      <td>{ticket.email}</td>
                      <td>{ticket.contact}</td>
                      <td>{ticket.subject}</td>
                      <td>{ticket.dateCreated}</td>
                      <td>{ticket.status}</td>
                      <td>

                        <button className={styles.actionButton} onClick={(e) => { e.stopPropagation(); toggleActionMenu(ticket.id); }}>⋮</button>
                        {actionMenuVisible === ticket.id && (
                          <div className={styles.actionMenu}>
                            <button onClick={() => handleStatusChange(ticket.id)}>
                              {ticket.status === "Open" ? "Mark as Closed" : "Reopen"}
                            </button>
                            <button onClick={() => handleDelete(ticket.id)}>Delete</button>
                            <button onClick={() => handleRowClick(ticket)}>View Details</button>
                          </div>
                        )}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          {/* End of content div */}
          </div>

          {selectedTicket && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>Ticket Details</h2>
                <p><strong>ID:</strong> {selectedTicket.id}</p>
                <p><strong>Tag:</strong> {selectedTicket.tag}</p>
                <p><strong>Submitted by:</strong> {selectedTicket.submittedBy}</p>
                <p><strong>Email:</strong> {selectedTicket.email}</p>
                <p><strong>Phone:</strong> {selectedTicket.phone}</p>
                <p><strong>Subject:</strong> {selectedTicket.subject}</p>
                <p><strong>Create Date:</strong> {selectedTicket.createDate}</p>
                <p><strong>Status:</strong> {selectedTicket.status}</p>
                <p><strong>Message:</strong> {selectedTicket.message}</p>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}

        {/* End of container div */}
        </div>
        
      {/* End of page div */}
      </div>    
    </>
  );
}

export default CatchBasin;

