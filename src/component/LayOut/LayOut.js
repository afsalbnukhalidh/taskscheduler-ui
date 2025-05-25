// ./component/LayOut/LayOut.js
import React,{useEffect,useState} from "react";
import {jwtDecode} from 'jwt-decode';
import Nav from '../NavBar/Nav'; 
import './LayOut.css'; // optional for layout styles

const Layout = ({ children }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
          const token = localStorage.getItem('accessToken');
          if (token) {
              try{
                  const decodedToken = jwtDecode(token);
                  if (Array.isArray(decodedToken.role)) {
                  setUserRole(decodedToken.role[0]);
                  console.log('User roles:', userRole);
              } else {
                  setUserRole(decodedToken.role);
              }
              }catch (err) {
                  console.error('Failed to decode token:', err);
              }
          }
      }, []);

  return (
    <div className="app-layout d-flex">
      <Nav />
      { userRole === 'Admin' && (
        <main className="content-Admin flex-grow-1">
          {children}
        </main>
      )}
      { userRole === 'User' && (
         <main className="content flex-grow-1 p-3">
          {children}
         </main>
      )}
    </div>
  );
};

export default Layout;
