import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserModal from '../UserModal/UserModal'; // You’ll create this
import { jwtDecode } from 'jwt-decode';

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(''); // Assuming you have a way to determine user role

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.name);
        if (Array.isArray(decodedToken.role)) {
        setUserRole(decodedToken.role[0]); 
      } else {
        setUserRole(decodedToken.role);
      }
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
  },[]);

  if (!userId) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <div
        className="sidebar bg-dark text-white d-flex flex-column justify-content-between p-3"
        style={{ minWidth: '250px', height: '100vh' }}
      >
        <div>
          <h4>Task Scheduler</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/tasks">Tasks</Link>
            </li>
            {
              userRole === 'Admin' && (
                <li className="nav-item">
              <Link className="nav-link text-white" to="/settings">Settings</Link>
            </li>
            )}
          </ul>
        </div>
          <div>
          <input
            className="btn btn-outline-light w-100 mt-3"
            onClick={() => setShowModal(true)}
            value= {`Welcome, ${userId.split(' ')[0]}`}
            type='button'
          />
        </div>
        
      </div>

      {showModal && <UserModal onClose={() => setShowModal(false)} />}
    </>
  );


};

export default Sidebar;
