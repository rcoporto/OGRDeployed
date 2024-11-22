"use client";

import React, { useState, useEffect } from "react";
import styles from "./CatchBasin.module.css";
import Sidebar from "./Sidebar";
import { db } from "../../../../firebase/firebase"; // Make sure the path is correct
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// to check for valid access
import { useAuth } from '../../context/authContext'; // Ensure this is imported correctly
import { useRouter } from 'next/navigation'; // or 'react-router-dom' if using that

function CatchBasin() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [actionMenuVisible, setActionMenuVisible] = useState(null); // State to track visible action menu

  // for login/access checking
  const user = useAuth(); // Destructure logout directly
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const [hasAdminAccess, setHasAdminAccess] = useState(false); // Track research access
  const router = useRouter();

  // check if admin
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
          // const confirmMessage =
          //   newStatus === "Closed"
          //     ? "Mark as closed? Confirm"
          //     : "Reopen this ticket? Confirm";

          // if (window.confirm(confirmMessage)) {
          //   // Update status in Firestore
          //   const ticketRef = doc(db, "tickets", ticketId);
          //   updateDoc(ticketRef, { status: newStatus });
          //   return { ...ticket, status: newStatus };
          // }

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
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Tickets</h1>
          <div className={styles.filter}>
            <select
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
                    <div className={styles.actionMenu}>
                      <button onClick={(e) => { e.stopPropagation(); toggleActionMenu(ticket.id); }}>options</button>
                      {actionMenuVisible === ticket.id && (
                        <div className={styles.actionMenuContent}>
                          <button onClick={() => handleStatusChange(ticket.id)}>
                            {ticket.status === "Open" ? "Mark as Closed" : "Reopen"}
                          </button>
                          <button onClick={() => handleDelete(ticket.id)}>Delete</button>
                          <button onClick={() => handleRowClick(ticket)}>View Details</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    </div>
  );
}

export default CatchBasin;


// "use client";

// import React, { useState, useEffect } from "react";
// import styles from "./CatchBasin.module.css";
// import Sidebar from "./Sidebar";
// import { db } from "../../../../firebase/firebase"; // Make sure the path is correct
// import { collection, getDocs } from "firebase/firestore";

// //to check for valid access
// import { useAuth } from '../../context/authContext'; // Ensure this is imported correctly
// import { useRouter } from 'next/navigation'; // or 'react-router-dom' if using that


// function CatchBasin() {
//   const [tickets, setTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [tagFilter, setTagFilter] = useState("");
//   const [actionMenuVisible, setActionMenuVisible] = useState(null); // State to track visible action menu

//   //for login/access checking
//   const user = useAuth(); // Destructure logout directly
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
//   const [hasAdminAccess, setHasAdminAccess] = useState(false); // Track research access
//   const router = useRouter();
//   //check if admin
//   useEffect(() => {
//     try{
//     if (user && user.user.userType === "Admin") {
//       setIsAuthenticated(true);
//       setHasAdminAccess(true);
//     } else {
//       setIsAuthenticated(false);
//       setHasAdminAccess(false);
//       router.push('/invalid')
      
//     }
//   }
//   catch{
//     setIsAuthenticated(false);
//       setHasAdminAccess(false);
//       router.push('/invalid')
//   }
//   }, []);

//   // Fetch tickets from Firestore on component mount
//   useEffect(() => {
//     const fetchTickets = async () => {
//       const ticketsCollection = collection(db, "tickets");
//       const ticketSnapshot = await getDocs(ticketsCollection);
//       const ticketList = ticketSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setTickets(ticketList);
//     };
//     fetchTickets();
//   }, []);

//   const handleRowClick = (ticket) => {
//     setSelectedTicket(ticket);
//   };

//   const closeModal = () => {
//     setSelectedTicket(null);
//   };

//   // const handleStatusChange = (ticketId) => {
//   //   if (window.confirm("This action cannot be undone. Mark as closed? Confirm")) {
//   //     setTickets((prevTickets) =>
//   //       prevTickets.map((ticket) =>
//   //         ticket.id === ticketId ? { ...ticket, status: "Closed" } : ticket
//   //       )
//   //     );
//   //   }
//   // };

//   const handleStatusChange = (ticketId) => {
//     setTickets((prevTickets) =>
//       prevTickets.map((ticket) => {
//         if (ticket.id === ticketId) {
//           const newStatus = ticket.status === "Open" ? "Closed" : "Open";
//           const confirmMessage = newStatus === "Closed"
//             ? "This action cannot be undone. Mark as closed? Confirm"
//             : "Reopen this ticket? Confirm";
  
//           if (window.confirm(confirmMessage)) {
//             return { ...ticket, status: newStatus };
//           }
//         }
//         return ticket;
//       })
//     );
//   };
  
//   const handleDelete = (ticketId) => {
//     if (window.confirm("Are you sure you want to delete this ticket?")) {
//       setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
//     }
//   };

//   const filteredTickets = tickets.filter((ticket) => {
//     const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesTag = tagFilter ? ticket.tag === tagFilter : true;
//     const matchesStatus = filterStatus === "All" || ticket.status === filterStatus;
//     return matchesSearch && matchesTag && matchesStatus;
//   });

//   const countTickets = (status) => tickets.filter((ticket) => ticket.status === status).length;

//   const toggleActionMenu = (ticketId) => {
//     setActionMenuVisible((prev) => (prev === ticketId ? null : ticketId));
//   };

//   return (
//     <div className={styles.container}>
//       <Sidebar />
//       <div className={styles.content}>
//         <div className={styles.header}>
//           <h1>Tickets</h1>
//           <div className={styles.filter}>
//             <select
//               value={tagFilter}
//               onChange={(e) => setTagFilter(e.target.value)}
//             >
//               <option value="">Filter by Tag</option>
//               <option value="Donation">Donation</option>
//               <option value="Inquiry">Inquiry</option>
//               <option value="Support">Support</option>
//               <option value="Request">Request</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className={styles.stats}>
//           <div onClick={() => setFilterStatus("All")}>Total: {tickets.length}</div>
//           <div onClick={() => setFilterStatus("Open")}>Open: {countTickets("Open")}</div>
//           <div onClick={() => setFilterStatus("Closed")}>Closed: {countTickets("Closed")}</div>
//         </div>
//         <div className={styles.tableContainer}>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Tag</th>
//                 <th>Submitted by</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Subject</th>
//                 <th>Create Date</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTickets.map((ticket) => (
//                 <tr key={ticket.id} onClick={() => handleRowClick(ticket)}>
//                   <td>{ticket.id}</td>
//                   <td>{ticket.tag}</td>
//                   <td>{ticket.name}</td>
//                   <td>{ticket.email}</td>
//                   <td>{ticket.contact}</td>
//                   <td>{ticket.subject}</td>
//                   <td>{ticket.dateCreated}</td>
//                   <td>{ticket.status}</td>
//                   <td>
//                     <div className={styles.actionMenu}>
//                       <button onClick={(e) => { e.stopPropagation(); toggleActionMenu(ticket.id); }}>options</button>
//                       {actionMenuVisible === ticket.id && (
//                         <div className={styles.actionMenuContent}>
//                           <button onClick={() => handleStatusChange(ticket.id)}>
//   {ticket.status === "Open" ? "Mark as Closed" : "Reopen"}
// </button>
                          
//                           <button onClick={() => handleDelete(ticket.id)}>Delete</button>
//                           <button onClick={() => handleRowClick(ticket)}>View Details</button>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {selectedTicket && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h2>Ticket Details</h2>
//             <p><strong>ID:</strong> {selectedTicket.id}</p>
//             <p><strong>Tag:</strong> {selectedTicket.tag}</p>
//             <p><strong>Submitted by:</strong> {selectedTicket.submittedBy}</p>
//             <p><strong>Email:</strong> {selectedTicket.email}</p>
//             <p><strong>Phone:</strong> {selectedTicket.phone}</p>
//             <p><strong>Subject:</strong> {selectedTicket.subject}</p>
//             <p><strong>Create Date:</strong> {selectedTicket.createDate}</p>
//             <p><strong>Status:</strong> {selectedTicket.status}</p>
//             <p><strong>Message:</strong> {selectedTicket.message}</p>
//             <button onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CatchBasin;


// "use client";

// import React, { useState } from "react";
// import styles from "./CatchBasin.module.css";
// import Sidebar from "./Sidebar";

// const fauxTickets = [
//   { id: "#12345", category: "Donation", submittedBy: "Juan Dela Cruz", email: "jdelacruz@gmail.com", phone: "0991 234 5678", subject: "How to donate", createDate: "09/13/2024", status: "Open", message: "I would like to know how to donate to the Admin." },
//   { id: "#12346", category: "Inquiry", submittedBy: "Maria Clara", email: "mclara@gmail.com", phone: "0991 234 5679", subject: "Data privacy concerns", createDate: "09/12/2024", status: "Open", message: "What measures are in place for data privacy?" },
//   { id: "#12347", category: "Support", submittedBy: "Jose Rizal", email: "jrizal@gmail.com", phone: "0991 234 5680", subject: "Technical issue", createDate: "09/11/2024", status: "Closed", message: "Having trouble with logging into my account." },
//   { id: "#12348", category: "Request", submittedBy: "Andres Bonifacio", email: "abonifacio@gmail.com", phone: "0991 234 5681", subject: "Account access", createDate: "09/10/2024", status: "Closed", message: "Can I request access to view specific data?" },
//   { id: "#12349", category: "Inquiry", submittedBy: "Emilio Aguinaldo", email: "eaguinaldo@gmail.com", phone: "0991 234 5682", subject: "Partnership", createDate: "09/09/2024", status: "Open", message: "Would you be open to a partnership with our research?" },
// ];

// function CatchBasin() {
//   const [tickets, setTickets] = useState(fauxTickets);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [actionMenuVisible, setActionMenuVisible] = useState(null); // State to track visible action menu

//   const handleRowClick = (ticket) => {
//     setSelectedTicket(ticket);
//   };

//   const closeModal = () => {
//     setSelectedTicket(null);
//   };

//   const handleStatusChange = (ticketId) => {
//     if (window.confirm("This action cannot be undone. Mark as closed? Confirm")) {
//       setTickets((prevTickets) =>
//         prevTickets.map((ticket) =>
//           ticket.id === ticketId ? { ...ticket, status: "Closed" } : ticket
//         )
//       );
//     }
//   };

//   const handleDelete = (ticketId) => {
//     if (window.confirm("Are you sure you want to delete this ticket?")) {
//       setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
//     }
//   };

//   const filteredTickets = tickets.filter((ticket) => {
//     const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = categoryFilter ? ticket.category === categoryFilter : true;
//     const matchesStatus = filterStatus === "All" || ticket.status === filterStatus;
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   const countTickets = (status) => tickets.filter((ticket) => ticket.status === status).length;

//   const toggleActionMenu = (ticketId) => {
//     setActionMenuVisible((prev) => (prev === ticketId ? null : ticketId));
//   };

//   return (
//     <div className={styles.container}>
//       <Sidebar />
//       <div className={styles.content}>
//         <div className={styles.header}>
//           <h1>Tickets</h1>
//           <div className={styles.filter}>
//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//             >
//               <option value="">Filter by Category</option>
//               <option value="Donation">Donation</option>
//               <option value="Inquiry">Inquiry</option>
//               <option value="Support">Support</option>
//               <option value="Request">Request</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className={styles.stats}>
//           <div onClick={() => setFilterStatus("All")}>Total: {tickets.length}</div>
//           <div onClick={() => setFilterStatus("Open")}>Open: {countTickets("Open")}</div>
//           <div onClick={() => setFilterStatus("Closed")}>Closed: {countTickets("Closed")}</div>
//         </div>
//         <div className={styles.tableContainer}>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Category</th>
//                 <th>Submitted by</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Subject</th>
//                 <th>Create Date</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTickets.map((ticket) => (
//                 <tr key={ticket.id} onClick={() => handleRowClick(ticket)}>
//                   <td>{ticket.id}</td>
//                   <td>{ticket.category}</td>
//                   <td>{ticket.submittedBy}</td>
//                   <td>{ticket.email}</td>
//                   <td>{ticket.phone}</td>
//                   <td>{ticket.subject}</td>
//                   <td>{ticket.createDate}</td>
//                   <td>{ticket.status}</td>
//                   <td>
//                     <div className={styles.actionMenu}>
//                       <button onClick={(e) => { e.stopPropagation(); toggleActionMenu(ticket.id); }}>⋮</button>
//                       {actionMenuVisible === ticket.id && (
//                         <div className={styles.actionMenuContent}>
//                           {ticket.status === "Open" && (
//                             <button onClick={() => handleStatusChange(ticket.id)}>
//                               Mark as Closed
//                             </button>
//                           )}
//                           <button onClick={() => handleDelete(ticket.id)}>Delete</button>
//                           <button onClick={() => handleRowClick(ticket)}>View Details</button>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {selectedTicket && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h2>Ticket Details</h2>
//             <p><strong>ID:</strong> {selectedTicket.id}</p>
//             <p><strong>Category:</strong> {selectedTicket.category}</p>
//             <p><strong>Submitted by:</strong> {selectedTicket.submittedBy}</p>
//             <p><strong>Email:</strong> {selectedTicket.email}</p>
//             <p><strong>Phone:</strong> {selectedTicket.phone}</p>
//             <p><strong>Subject:</strong> {selectedTicket.subject}</p>
//             <p><strong>Create Date:</strong> {selectedTicket.createDate}</p>
//             <p><strong>Status:</strong> {selectedTicket.status}</p>
//             <p><strong>Message:</strong> {selectedTicket.message}</p>
//             <button onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CatchBasin;