import { Height } from '@mui/icons-material';
import axios from 'axios';
import { React, useState } from 'react'

function MaterialUpload() {


    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('materialFile', file);

        try {
            console.log(formData)
            const response = await axios.post('http://localhost:8080/upload-material', formData);
            console.log(response.data); // Log the response from the server
        } catch (error) {
            console.error('Error uploading material:', error);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/download/okk`, {
                responseType: 'blob', // Ensure response type is blob for file download
            });

            // Create a blob URL and initiate download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'fresh');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading material:', error);
        }
    };

    return (
        

            <div className='bg-gray-800 text-white text-justify ' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
                <div className='container m-4 bg-inherit'>
                    <h1 className='text-left text-5xl'>
                        Create Your Article
                    </h1>
                    <hr className='m-2 bg-white' />
                    <div className='bg-gray-800 container text-white text-left  p-3' >
                        <h1 className='text-4xl m-3'>Upload New Matrial</h1>
                        <div className='flex text-white bg-gray-600 rounded m-3 p-5'>
                            <input className='w-1/3' type="file" onChange={handleFileChange} />
                            <button className='btn btn-success ' onClick={handleUpload}>Upload</button>
                        </div>
                    </div>

                </div>

                <button onClick={handleDownload}>Download Material</button>
            </div>
       
    );
}

export default MaterialUpload
