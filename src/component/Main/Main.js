import React,{useEffect,useState} from "react";
import {jwtDecode} from 'jwt-decode';
import TaskList from "../TaskList/TaskList";
import "./Main.css";
import AdminNav from "../AdminNav/AdminNav";

const Main = () => {
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try{
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.sub);
                if (Array.isArray(decodedToken.role)) {
                setUserRole(decodedToken.role[0]);
            } else {
                setUserRole(decodedToken.role);
            }
            }catch (err) {
                console.error('Failed to decode token:', err);
            }
        }
    }, []);

    if (!userId) {
        return <div>Loading user data...</div>;
     }
   return (
        <>
            {   userRole === 'Admin' && (
                <AdminNav/>
            )}
            {
                userRole === 'User' && (
                 <div className="container-fluid main-cls">
                    <TaskList userId={userId} />
                </div>
            )
            }
           
        </>
        
    );
};
export default Main;