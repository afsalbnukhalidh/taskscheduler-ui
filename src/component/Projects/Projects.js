import React,{useState} from 'react';
import DomainDrpDwn from '../DomainDD/DomainDrpDwn';
import ReusableModal from '../ProjectBasics/ReusableModal/ReusableModal';
import { Button, Form } from 'react-bootstrap';
import CustomDataTable from '../ProjectBasics/Table/CustomDataTable';
import ErrorModal from '../ErrorModal/ErrorModal';
import API from '../api';

const Projects = () => {
    const [projecName, setProjecName] = useState('');
    const [domainName, setDomainName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorShow, setErrorShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (!projecName || !domainName) {
      alert('Please fill in all fields');
      return;
    }
     API.post('api/Project/CreateProjectByAdmin', {
            projectName: projecName,
            domainName: domainName
        })
        .then(response => {
            if(response.data.isSuccess) {
                setProjecName('');
                alert('project created successfully');
            } else {
                console.error('Failed to create project');
            }
        }).catch((error) => {
            setErrorMsg(error.response?.data?.message || error.message || "Unknown error");
            setErrorShow(true);
        });
    setShowModal(false);
  };


    const handleSelect = (key, label) => {
        setDomainName(label);
    };

    return(
        <>
        <div className="container-fluid mt-2 p-3">
            <h5>Manage Projects</h5>
            <p>
                As a Super User, you can create projects, assign them to users, and set domains. 
                This allows for efficient project management and user collaboration.
            </p>
        <Button className='btn-secondary mt-3' onClick={() => setShowModal(true)}>Create New Project</Button>
        <CustomDataTable/>
        </div>

      <ReusableModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Project"
        children={
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={projecName}
                onChange={(e) => setProjecName(e.target.value)}
              />
              <div className='mt-3'>
                <DomainDrpDwn onDomainSelect={handleSelect} />
              </div>
              <div className='mt-3'>
                <DomainDrpDwn onDomainSelect={handleSelect} />
              </div>
            </Form.Group>
          </Form>
        }
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Create
            </Button>
          </>
        }
      />
      <ErrorModal
            show={errorShow}
            onClose={() => setErrorShow(false)}
            message={errorMsg}
            />
      </>
    );
}
export default Projects;