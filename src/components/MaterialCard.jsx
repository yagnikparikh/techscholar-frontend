import React, { useContext, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DownloadIcon from '@mui/icons-material/Download';
import AuthContext from '../context/AuthContext';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const DeleteArticleGroupModal = ({ show, onHide, onConfirm }) => {
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
                <Button className='btn bg-danger ' onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

function MaterialCard({ content, reloadMaterialList }) {

    const { username, jwtToken } = useContext(AuthContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const backendEndpoint = `http://localhost:8080/mentors/${username}/${content}/delete-material`;

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
                reloadMaterialList();

            })
            .catch((error) => {
                console.log('Not deleted succssfully');
                console.error('Error:', error);
                // Handle error
            });

        setShowDeleteModal(false);



    }

    const handleDownload = async (content) => {

        const backendEndpoint = `http://localhost:8080/${username}/download/${content}`

        try {
            const response = await axios.get(backendEndpoint, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                },
                responseType: 'blob', // Ensure response type is blob for file download
            });

            // Create a blob URL and initiate download
            // const contentDisposition = response.headers.get('Content-Disposition');
            // console.log(contentDisposition);
            // const filename = contentDisposition.split('filename=')[0].split(';')[0].replace(/"/g, '');
            // const contentDisposition = response.headers.get('Content-Disposition');
            // console.log(contentDisposition);
            // let filename = 'default-filename.ico'; // Set a default filename in case parsing fails

            // if (contentDisposition) {
            //     const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            //     const matches = filenameRegex.exec(contentDisposition);
            //     if (matches != null && matches[1]) {
            //         filename = matches[1].replace(/['"]/g, ''); // Remove any surrounding quotes
            //     }
            // }
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', content);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading material:', error);
        }
        // fetch(backendEndpoint, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${jwtToken}`
        //     },

        // })
        //     .then((response) => {
        //         // Check if the response is ok (status code 200)
        //         if (response.ok) {
        //             // Get the filename from the Content-Disposition header
        //             const contentDisposition = response.headers.get('Content-Disposition');
        //             // const filename = contentDisposition.split('filename=')[1].split(';')[0].replace(/"/g, '');
        //             // Download the file
        //             response.blob().then(blob => {
        //                 // Create a blob URL and initiate download
        //                 const url = window.URL.createObjectURL(new Blob([blob]));
        //                 const link = document.createElement('a');
        //                 link.href = url;
        //                 link.setAttribute('download', 'fresh');
        //                 document.body.appendChild(link);
        //                 link.click();
        //                 // // Create a new URL pointing to the Blob object
        //                 // const url = window.URL.createObjectURL(blob);
        //                 // // Create a link element
        //                 // const a = document.createElement('a');
        //                 // // Set the download attribute with the filename
        //                 // a.download = filename;
        //                 // // Set the href to the Blob URL
        //                 // a.href = url;
        //                 // // Append the link to the body (required for Firefox)
        //                 // document.body.appendChild(a);
        //                 // // Simulate a click on the link to trigger the download
        //                 // a.click();
        //                 // // Remove the link from the body
        //                 // document.body.removeChild(a);
        //                 // // Revoke the Blob URL to free up resources
        //                 // window.URL.revokeObjectURL(url);
        //             });
        //         } else {
        //             // Handle non-200 responses
        //             throw new Error('Server responded with a non-200 status code');
        //         }
        //     })
        //     .then((data) => {

        //         console.log('downloded succssfully:', data);
        //         // reloadMaterialList();

        //     })
        //     .catch((error) => {
        //         console.log('Not downloded succssfully');
        //         console.error('Error:', error);
        //         // Handle error
        //     });





    }
    return (
        <div>
            <a className="card bg-gray-700 mt-1 text-decoration-none text-light">
                <div className="card-body d-flex justify-between align-items-center ">
                    <a ><div className="card-text text-lg">{content}</div></a>
                    <div className="d-flex justify-content-beween">
                        <button onClick={() => handleDownload(content)} className="btn btn-primary mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                            <DownloadIcon />
                        </button>
                        <button className="btn btn-primary mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                            <BookmarkIcon />
                        </button>

                        <button onClick={() => setShowDeleteModal(true)} className="btn btn-danger mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>

            </a>
            <DeleteArticleGroupModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    )
}

export default MaterialCard


