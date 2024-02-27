import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ArticleParagraph from './ArticleParagraph';
import ImpNote from './ImpNote';
import CodeComponent from './CodeComonenet';
import ArticleHeading from './ArticleHeading';
import AuthContext from '../context/AuthContext';
import EditableArticleParagraph from './EditableArticleParagraph';
import EditableImpNote from './EditableImpNote';
import EditableCodeComponent from './EditableCodeComponent';

import { Button, Form, Modal } from 'react-bootstrap';

import EditIcon from '@mui/icons-material/Edit';
import EditableArticleImpNote from './EditableImpNote';
import EditableBox from './EditableBox';

const AddArticleDataModal = ({ show, onHide, addNewArticleData }) => {

    const [newContentType, setNewContentType] = useState('Paragraph');
    const [newContentData, setNewContentData] = useState('');
  
    const handleSaveChanges = () => {
  
      const contentData=newContentData;
      const contentType=newContentType;
      const articleData = {
         contentType,contentData
      }
      addNewArticleData(articleData);
      onHide();
    };
  
  
  
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Article Data</Modal.Title>
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
  



function ArticleDisplay() {

    const { jwtToken, username } = useContext(AuthContext);
    const { articleGroup, articleHeading } = useParams();
    const [article, setArticle] = useState({});
    const [articleDataList, setArticleDataList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [showAddArticleDataModal, setShowAddArticleDataModal] = useState(false);




    useEffect(() => {
        console.log('hello from useEffect');
        fetchAritcle();
    }, []);

    const fetchAritcle = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken)
        console.log("username " + username)
        console.log("articleGroup " + articleGroup)
        console.log("articleHeading " + articleHeading)
        fetch(`http://localhost:8080/${username}/${articleGroup}/${articleHeading}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                console.log('Update the state with the fetched data' + data);
                console.log(data);
                setArticle(data);
                setArticleDataList(data.articleDataList);
            })
            .catch(error => console.error('Error:', error));
    }

    const handelEdit = (articleDataId, contentType, contentData) => {

        const articleData = {
            articleDataId,
            contentType,
            contentData
        }

        console.log("data to be sent : ");
        console.log(articleData);
        const backendEndpoint = `http://localhost:8080/mentors/${username}/${articleGroup}/${articleHeading}/update-article-data`;

        fetch(backendEndpoint, {

            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(articleData)
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                console.log('Updated article data' + data);
                console.log(data);
                fetchAritcle();

            })
            .catch(error => console.error('Error:', error));
    }

    const handelDelete = (articleData) => {

        console.log("data to be sent : ");
        console.log(articleData);
        const backendEndpoint = `http://localhost:8080/mentors/${username}/${articleGroup}/${articleHeading}/delete-article-data`;

        fetch(backendEndpoint, {

            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(articleData)
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                console.log('Deleted article data' + data);
                console.log(data);
                fetchAritcle();

            })
            .catch(error => console.error('Error:', error));


    }

    const handelAddNew = (articleData) => {

       

        console.log("data to be sent : ");
        console.log(articleData);
        const backendEndpoint = `http://localhost:8080/mentors/${username}/${articleGroup}/${articleHeading}/add-article-data`;

        fetch(backendEndpoint, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(articleData)
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                console.log('Added article data' + data);
                console.log(data);
                fetchAritcle();

            })
            .catch(error => console.error('Error:', error));


    }


    return (
        <div className='bg-gray-800 text-white text-justify sp' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>

            <div>
                <ArticleHeading className='mt-9' content={article.articleHeading} />

                <div className='grid-flow-row flex justify-end '>
                {editMode && <button className='btn btn-primary m-1' onClick={()=>setShowAddArticleDataModal(true)}> Add Article Data</button>}
                <button className='btn btn-primary m-1 '  onClick={()=>setEditMode(!editMode)}> {editMode ? <>Preview Mode</> : <>Edit Mode</> }</button>
                
                <hr className='bg-white my-2' />
                
                </div>

                

                {editMode ?
                    articleDataList.map((articleData) => (
                        <div key={articleData.articleDataId}>
                            <EditableBox articleData={articleData} handelEdit={handelEdit} handelDelete={handelDelete}  />

                        </div>
                    ))
                    :
                    articleDataList.map((articleData) => (
                        <div key={articleData.articleDataId}>
                            {articleData.contentType === 'Paragraph' && <ArticleParagraph content={articleData.contentData} />}
                            {articleData.contentType === 'Important Note' && <ImpNote content={articleData.contentData} />}
                            {articleData.contentType === 'Code Component' && <CodeComponent content={articleData.contentData} />}

                        </div>
                    ))

                }
                <AddArticleDataModal
                onHide={()=>setShowAddArticleDataModal(false)}
                show={showAddArticleDataModal}
                addNewArticleData={handelAddNew}
                
                />







            </div>

        </div >
    )
}

export default ArticleDisplay
