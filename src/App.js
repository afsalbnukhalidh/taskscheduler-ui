import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Layout from './component/LayOut/LayOut';
import Main from './component/Main/Main';
import Login from './component/Login/Login';
import UserCreation from './component/UserCreation/UserCreation';

// Layout for protected routes
function ProtectedLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

// Application routes
function AppLayout({ isAuthenticated, userRole, setIsAuthenticated }) {
  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/Login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
        }
      />

      {/* Protected routes */}
      {isAuthenticated && (
        <Route element={<ProtectedLayout />}>
          {/* Common route for both Admin and User */}
          <Route path="/" element={<Main />} />

          {/* Only Admin can access this */}
          {userRole === 'Admin' && 
            <Route path="/UserCreation" element={<UserCreation />}
            
        />}
        </Route>
      )}

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/Login"} replace />} />
    </Routes>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      try {
        const decodedToken = jwtDecode(token);
        const role = Array.isArray(decodedToken.role) ? decodedToken.role[0] : decodedToken.role;
        setUserRole(role);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Token decode failed', err);
        setIsAuthenticated(false);
      }
    }

    setIsCheckingAuth(false);
  }, []);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppLayout
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
}

export default App;
