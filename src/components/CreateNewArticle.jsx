// import React, { useState } from 'react';
// import ArticleParagraph from './ArticleParagraph';
// import CodeComponent from './CodeComonenet';
// import ImpNote from './ImpNote';
// import ArticleHeading from './ArticleHeading';




// function CreateNewArticle() {
//     const [components, setComponents] = useState([]);
//     const [firstHeadingAdded, setFirstHeadingAdded] = useState(false);
//     const [headingContent, setHeadingContent] = useState('');

//     const handleAddComponent = (buttonType, content) => {
//         if (!firstHeadingAdded && buttonType === 'Heading') {
//             setFirstHeadingAdded(true);
//             setHeadingContent(content);

//         } else if (firstHeadingAdded) {
//             if (buttonType === 'Heading') {
//                 // Update heading content if heading already exists
//                 setHeadingContent(content);
//             } else {
//                 // Add other components to the list
//                 setComponents((prev) => [...prev, { type: buttonType, content }]);
//             }
//         }
//     };

//     const handleButtonClick = (buttonType) => {
//         const content = prompt(`Enter content for ${buttonType}:`);
//         if (content !== null) {
//             handleAddComponent(buttonType, content);
//         }
//     };

//     return (
//         <div className='bg-gray-800 text-white text-justify ' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
//             <div className='container m-4 bg-inherit'>
//                 <h1 className='text-left text-5xl'>
//                     Create Your Article
//                 </h1>
//                 <hr className='m-2 bg-white' />
//                 <div className='flex space-x-4'>
//                     <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => handleButtonClick('Heading')}>
//                         Add/Edit Heading
//                     </button>
//                     <button className={`bg-blue-500 text-white px-4 py-2 rounded ${firstHeadingAdded ? '' : 'cursor-not-allowed'}`} onClick={() => handleButtonClick('Paragraph')} disabled={!firstHeadingAdded}>
//                         Add Paragraph
//                     </button>
//                     <button className={`bg-blue-500 text-white px-4 py-2 rounded ${firstHeadingAdded ? '' : 'cursor-not-allowed'}`} onClick={() => handleButtonClick('Important Note')} disabled={!firstHeadingAdded}>
//                         Add Important Note
//                     </button>
//                     <button className={`bg-blue-500 text-white px-4 py-2 rounded ${firstHeadingAdded ? '' : 'cursor-not-allowed'}`} onClick={() => handleButtonClick('Code Snippet')} disabled={!firstHeadingAdded}>
//                         Add Code Snippet
//                     </button>
//                 </div>
//             </div>

//             <div className='container m-4'>
//                 <h1 className='text-3xl text-center'>
//                     Article Content Preview
//                 </h1>
//                 <hr className='bg-white m-2' />
//                 {firstHeadingAdded && (
//                     <>
//                         <ArticleHeading className='mt-9' content={headingContent} />
//                         {components.map((component, index) => (
//                             <div key={index}>
//                                 {component.type === 'Paragraph' && <ArticleParagraph content={component.content} />}
//                                 {component.type === 'Important Note' && <ImpNote content={component.content} />}
//                                 {component.type === 'Code Snippet' && <CodeComponent content={component.content} />}
//                             </div>
//                         ))}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default CreateNewArticle;


import React, { useContext, useEffect, useState } from 'react';
import ArticleParagraph from './ArticleParagraph';
import CodeComponent from './CodeComonenet';
import ImpNote from './ImpNote';
import ArticleHeading from './ArticleHeading';
import AuthContext from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Button, Form } from 'react-bootstrap';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const InputModal = ({ contentType, contentData, show, onHide, onConfirm }) => {

    const [newContentType, setNewContentType] = useState(contentType);
    const [newContentData, setNewContentData] = useState('');
    // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    let options = {
        inlineStyles: {
            // Use 'b' for bold.
            BOLD: { element: 'b' },
            // Use 'i' for italic.
            ITALIC: { element: 'i' },
            // Use 'ul' for unordered list.
            'unordered-list-item': { element: 'ul' },
        },
    };


    useEffect(() => {
        setNewContentType(contentType);
    }, [contentType])

    useEffect(() => {
        setNewContentData('');
    }, [])

    const handleSaveChanges = () => {
        onConfirm(newContentData, newContentType);
        onHide();
    };

    // const onItalicClick = () => {
    //     setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    // };

    // const onBoldClick = () => {
    //     setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    // };

    // const onBulletPointClick = () => {
    //     setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
    // };



    // const onChange = (newEditorState) => {
    //     console.log(newEditorState);
    //     setEditorState(newEditorState);
    //     // Extracting text from editor state and updating newContentData
    //     const contentAsHTML = stateToHTML(newEditorState.getCurrentContent(),options);
    //     console.log(contentAsHTML);
    //     setNewContentData(contentAsHTML);
    // };


    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Enter {newContentType} Content</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <button onClick={onItalicClick}>Italic</button>
                <button onClick={onBoldClick}>Bold</button>

                if()
                <button onClick={onBulletPointClick}>Bullet Point</button> */}
                {newContentType == "Heading" ?
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newContentData}
                        onChange={(e) => setNewContentData(e.target.value)}
                    />
                    :
                    <ReactQuill value={newContentData} onChange={setNewContentData} />
                }

                {/* <Editor
                    editorState={editorState}
                    onChange={onChange}
                    options={options}
                /> */}

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" className='bg-danger ' onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" className='bg-primary' onClick={handleSaveChanges}>
                    Add {newContentType}
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

function CreateNewArticle() {

    const { username, jwtToken } = useContext(AuthContext);
    const { articleGroup } = useParams();
    const [components, setComponents] = useState([]);
    const [firstHeadingAdded, setFirstHeadingAdded] = useState(false);
    const [showInputModal, setShowInputModal] = useState(false);
    const [inputContentType, setInputContentType] = useState(false);
    const [headingContent, setHeadingContent] = useState('');
    const navigate = useNavigate();



    const handleAddComponent = (buttonType, content) => {
        if (!firstHeadingAdded && buttonType === 'Heading') {
            setFirstHeadingAdded(true);
            setHeadingContent(content);

        } else if (firstHeadingAdded) {
            if (buttonType === 'Heading') {
                // Update heading content if heading already exists
                setHeadingContent(content);
            } else {
                // Add other components to the list
                setComponents((prev) => [...prev, { type: buttonType, content }]);
            }
        }
    };

    const handleButtonClick = (buttonType) => {
        // const content = prompt(`Enter content for ${buttonType}:`);

        setInputContentType(buttonType);
        setShowInputModal(true);


    };

    const handleModalSubmit = (content, buttonType) => {
        console.log(buttonType + " " + content);
        if (content !== null) {
            handleAddComponent(buttonType, content);
        }
    }

    const handlePublish = async () => {
        // Prepare data to send to the backend
        const dataToSend = {
            articleHeading: headingContent,
            articleDataList: components.map((component) => ({ contentType: component.type, contentData: component.content })),
        };
        console.log(dataToSend);




        const backendEndpoint = `http://localhost:8080/mentors/${username}/${articleGroup}/create-new-article`;

        try {
            // Make a POST request to the backend
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                // Handle successful response
                console.log('Data published successfully!');
                navigate(`/${username}/${articleGroup}`)
            } else {
                // Handle error response
                console.error('Error publishing data to the backend.');
            }
        } catch (error) {
            // Handle network error
            console.error('Network error:', error);
        }
    };

    // const handlePublish = async () => {
    //     // You can include logic here to format data as needed for GET request parameters

    //     // Replace 'YOUR_BACKEND_ENDPOINT' with the actual endpoint and any necessary parameters
    //     const backendEndpoint = 'http://localhost:8080/create-new-article';

    //     try {
    //       // Make a GET request to the backend
    //       const response = await fetch(backendEndpoint);

    //       if (response.ok) {
    //         // Handle successful response
    //         const responseData = await response.json();
    //         console.log('Data retrieved successfully:', responseData);
    //       } else {
    //         // Handle error response
    //         console.error('Error retrieving data from the backend.');
    //       }
    //     } catch (error) {
    //       // Handle network error
    //       console.error('Network error:', error);
    //     }
    //   };

    return (
        <div className='bg-gray-800 text-white text-justify ' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
            <div className='container m-4 bg-inherit'>
                <h1 className='text-left text-5xl'>
                    Create Your Article
                </h1>
                <hr className='m-2 bg-white' />
                <div className='flex space-x-4'>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => handleButtonClick('Heading')}>
                        Add/Edit Heading
                    </button>
                    <button className={`bg-blue-500 text-white px-4 py-2 rounded ${firstHeadingAdded ? '' : 'cursor-not-allowed'}`} onClick={() => handleButtonClick('Paragraph')} disabled={!firstHeadingAdded}>
                        Add Paragraph
                    </button>
                    <button className={`bg-blue-500 text-white px-4 py-2 rounded ${firstHeadingAdded ? '' : 'cursor-not-allowed'}`} onClick={() => handleButtonClick('Important Note')} disabled={!firstHeadingAdded}>
                        Add Important Note
                    </button>
                    <button className={`bg-blue-500 text-white px-4 py-2 rounded ${firstHeadingAdded ? '' : 'cursor-not-allowed'}`} onClick={() => handleButtonClick('Code Snippet')} disabled={!firstHeadingAdded}>
                        Add Code Snippet
                    </button>
                </div>
            </div>

            <div className='container m-4'>
                <h1 className='text-3xl text-center'>
                    Article Content Preview
                </h1>
                <hr className='bg-white m-2' />
                {firstHeadingAdded && (
                    <>
                        <ArticleHeading className='mt-9' content={headingContent} />
                        {components.map((component, index) => (
                            <div key={index}>
                                {component.type === 'Paragraph' && <ArticleParagraph content={component.content} />}
                                {component.type === 'Important Note' && <ImpNote content={component.content} />}
                                {component.type === 'Code Snippet' && <CodeComponent content={component.content} />}
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Publish button */}
            <div className='flex justify-center'>
                <button className='bg-green-500 text-white px-4 py-2 rounded mt-4 ' onClick={handlePublish}>
                    Publish
                </button>
            </div>

            <InputModal
                show={showInputModal}
                contentType={inputContentType}
                onHide={() => setShowInputModal(false)}
                onConfirm={handleModalSubmit} />

        </div>
    );
}

export default CreateNewArticle;


