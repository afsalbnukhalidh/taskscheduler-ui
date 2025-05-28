import React, {useState, useEffect} from 'react';
import DomainDrpDwn from '../DomainDD/DomainDrpDwn';
import ErrorModal from "../ErrorModal/ErrorModal";
import API from '../api';


const AdminUserCreation = () => {
    const [errorShow, setErrorShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [domainName, setDomainName] = useState('');
    const [nameOfUser, setNameOfUser] = useState('');
    const [emailOfUser, setEmailOfUser] = useState('');
    const [userNameOfUser, setUserNameOfUser] = useState('');
    const [domainNameCreateUser, setDomainNameCreateUser] = useState('');

   
    
   const handleSubmitDomain = (e) => {
    e.preventDefault();
        API.post('api/Domain/CreateDomainByAdmin',{ name: domainName })
        .then(response => {
            console.log('Response:', response);
            if(response.data.message === 'success') {
                setDomainName('');
            console.log('Domain created successfully:', response.data.message);
            }
        else {
            console.error('Failed to create domain:', response.data.message);
        }
        })
        .catch((error) => {
        setErrorMsg(error.response?.data?.message || error.message || "Unknown error");
        setErrorShow(true);
      })
    };

    const handleSubmitCreateUser = (e) => {
        e.preventDefault();
        API.post('api/Authentic/CreateUserByAdmin', {
            name: nameOfUser,
            email: emailOfUser,
            userName: userNameOfUser,
            domain: domainNameCreateUser
        })
        .then(response => {
            if(response.data.isSuccess) {
                setNameOfUser('');
                setEmailOfUser('');
                setUserNameOfUser('');
                setDomainNameCreateUser('');
                console.log('User created successfully:', response.data.message);
            } else {
                console.error('Failed to create user:', response.data.message);
            }
        }).catch((error) => {
            setErrorMsg(error.response?.data?.message || error.message || "Unknown error");
            setErrorShow(true);
        });
    }
     const handleSelect = (key, label) => {
        setDomainNameCreateUser(label);
    };
    return (
       
       <div className="container-fluid mt-2 p-3">
        <div className="row">
            <div className="col-md-5">
                <form onSubmit = {handleSubmitCreateUser}>
                    <h5>Create Users</h5>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" 
                        className="form-control"
                         id="name"
                          placeholder="Enter name"
                          value={nameOfUser}
                          onChange={(e) => setNameOfUser(e.target.value)}
                          />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                        className="form-control" 
                        id="email" 
                        placeholder="Enter email"
                        value={emailOfUser}
                        onChange={(e) => setEmailOfUser(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username">User Name</label>
                        <input type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter Username"
                        value={userNameOfUser}
                        onChange={(e) => setUserNameOfUser(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username">Domain</label>
                        <DomainDrpDwn onDomainSelect={handleSelect} />
                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-secondary">Create User</button>
                    </div>
                </form>
            </div>
            <div className="col-md-7">
                <div className="ms-5 row">
                    <h5>Add New Domain</h5>
                    <form className="d-flex mt-4"  onSubmit={handleSubmitDomain}>
                        <div className="mb-3 me-3 col-md-8">
                            <input type="text" 
                            className="form-control"
                             id="name"
                              placeholder="Enter name"
                               value={domainName}
                               onChange={(e) => setDomainName(e.target.value)}
                               />
                        </div>
                        
                        <div className="mb-3 text-center col-md-4">
                            <button type="submit" className="btn btn-secondary">Create Domain</button>
                        </div>
                    </form>
                </div>
               
            </div>
        </div>
            <ErrorModal
            show={errorShow}
            onClose={() => setErrorShow(false)}
            message={errorMsg}
            />
        </div>
    );
}
export default AdminUserCreation;