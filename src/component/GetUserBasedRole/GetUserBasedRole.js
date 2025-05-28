import React, {useState, useEffect} from 'react';
import DropDown from '../ProjectBasics/DropDown/DropDown';
import ErrorModal from "../ErrorModal/ErrorModal";
import API from '../api';

const DomainDrpDwn = ({onDomainSelect, setGetUserRole={setGetUserRole} }) =>{
    const [errorShow, setErrorShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [userList,setUserList] = useState([]);
    const [selectedname, setSelectedName] = useState('');
    const [getuserRole, setGetUserRole] = useState('');

    useEffect(() =>{
        API.get('api/Authentic/GetUsersByRole', {
            params: { role: getuserRole }})
        .then(response =>{
            if(response.data.res.message === 'success') {
                const names =(response.data.items || []).map(item => item.name);
                setUserList(names);
                setSelectedName(getuserRole);
            }   
            else{
                console.error('Failed to fetch domain items:', response.data.res.message);
            }
        })
        .catch((error) => {
            setErrorMsg(error.response?.data?.message || error.message || "Unknown error");
            setErrorShow(true);
        });
    }, [])
    const handleSelect = (key, label) => {
        if (onDomainSelect) {
            onDomainSelect(key, label); 
    }
    };
    return(
        <>
        <DropDown data={userList} onSelect={handleSelect} selectedname={selectedname}/>
        <ErrorModal
            show={errorShow}
            onClose={() => setErrorShow(false)}
            message={errorMsg}
            />
        </>
    );
}
export default DomainDrpDwn;