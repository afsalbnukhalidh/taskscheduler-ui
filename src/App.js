import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Layout from './component/LayOut/LayOut';
import Login from './component/Login/Login';
import UserCreation from './component/UserCreation/UserCreation';
import AdminLayout from './component/AdminLayout/AdminLayout';
import AdminUserCreation from './component/AdminUserCreation/AdminUserCreation';
import Dashboard from './component/Dashboard/Dashboard';
import Projects from './component/Projects/Projects';
import TaskList from './component/TaskList/TaskList';

// Layout for protected routes
function ProtectedLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
function ProtectedAdminLayout() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
// Application routes
function AppLayout({ isAuthenticated, userRole,userId, setIsAuthenticated,setUserRole,setUserId }) {
  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/Login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole}/>
        }
      />
      {isAuthenticated && userRole === 'User' && (
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<TaskList userId={userId} />
        } />
        </Route>
      )};
      {/* Protected routes */}
      {isAuthenticated && userRole === 'Admin' && (
        <Route element={<ProtectedAdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/UserCreation" element={<UserCreation />} >
            <Route index element={<AdminUserCreation />} />
          </Route>
          <Route path="/Projects" element={<Projects />} />
        </Route>
      )};
    

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/Login"} replace />} />
    </Routes>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      try {
        const decodedToken = jwtDecode(token);
        const role = Array.isArray(decodedToken.role) ? decodedToken.role[0] : decodedToken.role;
        const userId = decodedToken.sub;
        setUserId(userId);
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
        userId={userId}
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
        setUserId={setUserId}
      />
    </Router>
  );
}

export default App;
