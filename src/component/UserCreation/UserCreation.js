import React from 'react';
import { Outlet } from 'react-router-dom';


const UserCreation = () => {
    return (
        <>
            <div className="container-fluid mt-2 p-3">
            <h5>User Management & Domain Setup</h5>
                <p>
                As a Super User, you can create new users, assign programming languages, and define domains for users to belong to. 
                You can also appoint validators to review user submissions—ensuring a well-organized and quality-controlled workflow.
                </p>

            </div>
            <Outlet/>
        </>
    );
}
export default UserCreation;