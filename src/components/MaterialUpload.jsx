
import axios from 'axios';
import { React, useContext, useState } from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function MaterialUpload() {
    const [file, setFile] = useState(null);
    const { username, jwtToken, userrole } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    
   
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('materialFile', file);

        try {
            console.log(formData)
            const response = await axios.post(`http://localhost:8080/mentors/{username}/upload-material`, formData, {headers: {
                'Authorization': `Bearer ${jwtToken}`, // Add the Authorization header
                'Content-Type': 'multipart/form-data' // Set the content type for file upload
            }});
            
            console.log(response.data); // Log the response from the server
            navigate(`/${username}/manage-account/my-materials`)
        } catch (error) {
            console.error('Error uploading material:', error);
        }
    };

    

    return (
        

            <div className='bg-gray-800 text-white text-justify ' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
                <div className='container m-4 bg-inherit'>
                    
                    <hr className='m-2 bg-white' />
                    <div className='bg-gray-800 container text-white text-left  p-3' >
                        <h1 className='text-4xl m-3'>Upload New Matrial</h1>
                        <div className='flex text-white bg-gray-600 rounded m-3 p-5'>
                            <input className='w-1/3' type="file" onChange={handleFileChange} />
                            <button className='btn btn-success ' onClick={handleUpload}>Upload</button>
                        </div>
                    </div>

                </div>

                
            </div>
       
    );
}
       

export default MaterialUpload;