import React, { useContext, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AuthContext from '../context/AuthContext';
import { Button, Modal } from 'react-bootstrap';

const DeleteArticleGroupModal = ({ show, onHide, onConfirm, articleName }) => {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {articleName} Article?</Modal.Body>
        <Modal.Footer>
          <Button className='btn bg-primary ' onClick={onHide}>
            Cancel
          </Button>
          <Button className='btn bg-danger ' onClick={onConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

function ArticleCard({content,reloadArticleList,articleGroupName}) {

    const {username,jwtToken} = useContext(AuthContext);
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const backendEndpoint = `http://localhost:8080/mentors/${username}/${articleGroupName}/${content}/delete-article`;

    const handleDelete = () => {

     

        fetch(backendEndpoint, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`            
          },
          body: JSON.stringify({}),
        })
          .then((response) => response.json())
          .then((data) => {
            
            console.log('deleted succssfully:', data);
            reloadArticleList();
            
          })
          .catch((error) => {
            console.log('Not deleted succssfully');
            console.error('Error:', error);
            // Handle error
          });

       setShowDeleteModal(false);
      


    }
  return (
    <div>
      <a  className="card bg-gray-700 mt-1 text-decoration-none text-light">
            <div className="card-body d-flex justify-between align-items-center ">
            <a href={`${content}`}><div className="card-text text-lg">{content}</div></a>
                <div className="d-flex justify-content-beween">
                    <button className="btn btn-primary mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <BookmarkIcon />
                    </button>
                    <button onClick={()=> setShowDeleteModal(true)} className="btn btn-danger mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
            
        </a>
        <DeleteArticleGroupModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        articleName={content}
      />
    </div>
  )
}

export default ArticleCard


