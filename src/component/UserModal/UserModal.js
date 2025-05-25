import React,{useState, useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
import './UserModal.css';

const UserModal = ({ onClose }) => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.sub);
            setUserName(decodedToken.name);
            setUserEmail(decodedToken.email); 
            if (Array.isArray(decodedToken.role)) {
            setUserRole(decodedToken.role[0]); // Assuming the first role is the primary one
            console.log('User roles:', userRole);
          } else {
            setUserRole(decodedToken.role);
          }
          } catch (err) {
            console.error('Failed to decode token:', err);
          }
        }
  });

  if (!userId) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content-custom">
          <div className="modal-header-custom">
            <h5>User Details</h5>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body-custom">
            <p><strong>Name  :</strong> {userName}</p>
            <p><strong>Email :</strong> {userEmail}</p>
            <p><strong>Role  :</strong> {userRole}</p>
          </div>
          <div className="modal-footer-custom">
            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.reload();
              }}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
