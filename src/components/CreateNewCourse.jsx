import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function CreateNewCourse() {

    const [courseName, setCourseName] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const { username, jwtToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        setFormErrors({});

        // Validation check
        const errors = {};

        if (!courseName) {
            errors.courseName = 'Article Group Name is required';
        }


        if (Object.keys(errors).length > 0) {

            setFormErrors(errors);
            return;
        }
        // Placeholder for making a POST request to the backend
        // Use the actual API endpoint and library for your application
        const courseTitle=courseName;
        const formData = {
            courseTitle
        };

        console.log(formData);


        const backendEndpoint = `http://localhost:8080/mentors/${username}/courses/create-new-course`;


        // Make a POST request to the backend API with formData
        // Example using Fetch API
        fetch(backendEndpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {

                navigate(`/${username}/manage-account/my-courses`);
            })
            .catch((error) => {
                console.log('hello');
                console.error('Error:', error);
                // Handle error
            });
    };

    return (
        <div className='vh-100 vw-100 bg-gray-500  align-middle'>
            <div className="flex justify-center text-white ">
                <div className="w-2/5 my-5" role="document">
                    <div className="">
                        <div className="bg-gray-900 align-middle flex justify-between py-3 px-4">
                            <h5 className="modal-title text-center text-2xl text-fw-semibold " id="exampleModalLongTitle">
                                Create New Course
                            </h5>
                            <a href="/">
                                <button onClick={() => navigate(-1)} type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">X</span>
                                </button>
                            </a>
                        </div>
                        <div className="modal-body bg-gray-700">
                            {/* <!-- Login Form --> */}
                            <form onSubmit={handleSubmit}>


                                <div className="mb-2">
                                    {formErrors.email && <div className="text-white-500 text-left mx-1  font-bold ">{formErrors.articleGroupName}</div>}
                                    <input
                                        type="text"
                                        className={`form-control w-full px-3 py-4 ${formErrors.courseName ? 'border-red-500 bg-red-300' : ''}`}
                                        id="articleGroupName"
                                        placeholder="Enter New Course Name"
                                        value={courseName}
                                        onChange={(e) => setCourseName(e.target.value)}
                                    />
                                </div>




                                <div className='flex justify-end'>
                                    <Button onClick={()=>navigate(-1)} className='btn btn-danger bg-danger m-2'>Cancel</Button>
                                    <Button onClick={handleSubmit} className='btn btn-success bg-success m-2'>Submit</Button>

                                </div>
                            </form>
                            {/* <!-- End Login Form --> */}
                            {/* <!-- Additional Options: Login and Forget Password --> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewCourse
