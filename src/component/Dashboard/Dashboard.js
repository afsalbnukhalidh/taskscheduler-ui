import React from 'react';


const Dashboard = () => {
    return(
       <div className="container-fluid mt-2 p-3">
            <h5>Welcome to the Admin Panel Dashboard</h5>
            <p>As a Super User, you can create users, assign programming languages, and appoint validators to review their work—ensuring a smooth, quality-controlled workflow.</p>
            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Manage Projects</h5>
                            <p className="card-text">Add projects, assign to users, and set Domains.</p>
                            <a href="/create-user" className="btn btn-secondary">Manage Projects</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Project Settings</h5>
                            <p className="card-text">Update user and Super Users privilege in the Project Settings page.</p>
                            <a href="/assign-languages" className="btn btn-secondary">Project Settings</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Appoint Validators</h5>
                            <p className="card-text">Choose validators responsible for reviewing user submissions.</p>
                            <a href="/appoint-validators" className="btn btn-secondary">Appoint Validators</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create Users</h5>
                            <p className="card-text">Manage user accounts, assign roles, and set permissions.</p>
                            <a href="/create-user" className="btn btn-secondary">Create User</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Assign Tasks</h5>
                            <p className="card-text">Assign and update tasks to users for task management.</p>
                            <a href="/assign-languages" className="btn btn-secondary">Assign Tasks</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;