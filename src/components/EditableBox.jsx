import React, { useState } from 'react'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button, Form, Modal } from 'react-bootstrap';


const DeleteArticleDataModal = ({ show, onHide, handelDelete,articleData }) => {

  const handleDeleteArticleData = () => {
    handelDelete(articleData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button className='btn bg-primary ' onClick={onHide}>
          Cancel
        </Button>
        <Button className='btn bg-danger ' onClick={handleDeleteArticleData}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const EditArticleDataModal = ({ articleDataId, contentType, contentData, show, onHide, onConfirm }) => {

  const [newContentType, setNewContentType] = useState(contentType);
  const [newContentData, setNewContentData] = useState(contentData);

  const handleSaveChanges = () => {
    onConfirm(articleDataId, newContentType, newContentData);
    onHide();
  };



  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Article Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDropdown">
            <Form.Label>Select Option</Form.Label>
            <Form.Control
              as="select"
              value={newContentType}
              onChange={(e) => setNewContentType(e.target.value)}
            >
              <option selected>{newContentType}</option>
              {newContentType === 'Important Note' && (
                <>
                  <option value="Code Component">Code Component</option>
                  <option value="Paragrah">Paragraph</option>
                </>
              )}
              {newContentType === 'Code Component' && (
                <>
                  <option value="Important Note">Important Note</option> &&
                  <option value="Paragraph">Paragraph</option>
                </>
              )}
              {newContentType === 'Paragraph' && (
                <>
                  <option value="Important Note">Important Note</option> &&
                  <option value="Code Component">Code Component</option>
                </>
              )}

            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formText">
            <Form.Label>Content Data</Form.Label>
            <Form.Control
              type="textarea"
              value={newContentData}
              onChange={(e) => setNewContentData(e.target.value)}
            />
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
function EditableBox({ articleData, handelEdit ,handelDelete}) {

  const [showEditArticleDataModal, setShowEditArticleDataModal] = useState(false);
  const [showDeleteArticleDataModal, setShowDeleteArticleDataModal] = useState(false);
  

  const closeEditArticleModal = () => {
    setShowEditArticleDataModal(false);
  }

  const closeDeleteArticleModal = () => {
    setShowEditArticleDataModal(false);
  }

  return (
    <div className='my-3'>
      <div className='card px-0 bg-gray-950 container m-2 '>

        <div className=' card-body mb-0'>

          <div className='flex justify-between m-0 align-top mb-1 mt-0'>
            <div>
              Edit Article Data
            </div>
            <div className='flex justify-center'>
              <button className='mx-1 my-0' onClick={() => setShowEditArticleDataModal(true)}><EditIcon /> </button>
              <button className='mx-1 my-0' onClick={() => setShowDeleteArticleDataModal(true)}><DeleteIcon /></button>
            </div>
          </div>
          <hr className='bg-white' />
          <div>
            <div className='  my-2'>
              <div className='bg-gray-700 rounded'>

                <div className="card">
                  <div className="card-body bg-gray-700 rounded">
                    <p className="text-white text-xs font-bold mb-2 text-left mt-0">{articleData.contentType}</p>
                    <hr className="bg-white" />


                    <div className='flex align-middle mt-2'>
                      <h4 className='text-white mt-1 text-left'>{articleData.contentData}</h4>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>




        <EditArticleDataModal
          articleDataId={articleData.articleDataId}
          contentType={articleData.contentType}
          contentData={articleData.contentData}
          show={showEditArticleDataModal}
          onHide={() => setShowEditArticleDataModal(false)}
          onConfirm={handelEdit}
        />
        <DeleteArticleDataModal 
          articleData={articleData}
          handelDelete={handelDelete}
          show={showDeleteArticleDataModal}
          onHide={()=>setShowDeleteArticleDataModal(false)}
        />
        
      </div>




    </div>


  )
}

export default EditableBox
