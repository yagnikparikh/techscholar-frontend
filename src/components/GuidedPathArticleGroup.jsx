import React, { useContext, useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import AuthContext from '../context/AuthContext';
import ArticleGroupCard from './ArticleGroupCard';
import GuidedPathCard from './GuidedPathCard';
import { Button, Form, Modal } from 'react-bootstrap';

const CreateNewGuidedPathModal = ({ show, onHide, handelAddNewGuidedPath }) => {

    const [newGuidedPathTitle, setNewGuidedPathTitle] = useState('');
    
  
    const handleSaveChanges = () => {
  
      const guidedPathTitle=newGuidedPathTitle;
      
      const Data = {
            guidedPathTitle
      }
      handelAddNewGuidedPath(Data);
      onHide();
    };
  
  
  
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Guided Path </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDropdown">
              <Form.Label>New Guided Path Title</Form.Label>
              <Form.Control
                as="textarea"
                value={newGuidedPathTitle}
                onChange={(e) => setNewGuidedPathTitle(e.target.value)}
              >
                
  
              </Form.Control>
            </Form.Group>
  
            
  
  
          </Form>
        </Modal.Body>
        <Modal.Footer>
  
          <Button variant="primary" onClick={handleSaveChanges} className='ml-2 bg-primary '>
            Save Changes
          </Button>
  
  
          <Button variant="secondary" onClick={onHide} className="ml-2 bg-danger ">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal >
    );
  };


function GuidedPathArticleGroup() {

    const { jwtToken, username } = useContext(AuthContext);
    const [guidedPathList, setGuidedPathList] = useState([]);
    const [showCreateNewGuidedPathModal,setShowCreateNewGuidedPathModal] = useState(false);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        
        fetchGuidedPathList();
    }, [refreshData]);

    const fetchGuidedPathList = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken);
        
        fetch(`http://localhost:8080/guidedpaths`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                console.log('Update the state with the fetched data');
                setGuidedPathList(data.guidedPathList);
            })
            .catch(error => console.error('Error:', error));
    }

    const handelAddNewGuidedPath = (data) => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken);
        
        fetch(`http://localhost:8080/admin/create-new-guidedpath`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                console.log('Update the state with the fetched data'+data.messege);
                fetchGuidedPathList();
                setShowCreateNewGuidedPathModal(false);
            })
            .catch(error => console.error('Error:', error));
    }

    return (


        <div className='bg-gray-800 text-white text-justify relative' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
            <div className='container m-2 bg-inherit '>

                <div className='card bg-gray-700 h-36' style={{ backgroundImage: 'url(https://gstatic.com/classroom/themes/Chemistry.jpg)', backgroundSize: 'cover' }}>

                    <div className="card-body position-relative">
                        <div className="position-absolute bottom-2 start-2 mb-2 ms-2 text-white">
                            <p className='text-4xl font-serif'>Guided Paths</p>
                        </div>
                    </div>

                </div>



                <a onClick={()=>setShowCreateNewGuidedPathModal(true)} className="card bg-gray-700 mt-1 text-decoration-none ">
                    <div className="card-body">
                        <p className="card-text text-xl align-middle"> <CreateIcon className='align-middle' /> Create New Guided Path</p>
                    </div>
                </a>

                <div>
                    {guidedPathList.map(guidedPath => (
                        <GuidedPathCard key={guidedPath.id} content={guidedPath.guidedPathTitle}  reloadGuidedPathList={fetchGuidedPathList}/>
                    ))}
                </div>

              <CreateNewGuidedPathModal 
              onHide={()=>setShowCreateNewGuidedPathModal(false)}
              show={showCreateNewGuidedPathModal}
                    handelAddNewGuidedPath={handelAddNewGuidedPath}
              
              />



            </div>
        </div>




    )
}

export default GuidedPathArticleGroup