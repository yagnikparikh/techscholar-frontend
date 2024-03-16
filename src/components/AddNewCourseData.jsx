import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import { useOutletContext } from 'react-router-dom';

function AddNewCourseData() {

    const { courseDetails, fetchCourseDetails, fetchMentorDetails, mentorDetails } = useOutletContext();
    const { jwtToken, username } = useContext(AuthContext);
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [courseDataTitle, setCourseDataTitle] = useState('');
    const [description, setDescription] = useState('');
    const [formErrors, setFormErrors] = useState({
        video: null,
        thumbnail: null,
        courseDataTitle: null,
        description: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate course title and description
        if (!courseDataTitle) {
            setFormErrors((prevErrors) => ({ ...prevErrors, courseDataTitle: 'Course title is required.' }));
            return;
        }
        if (!description) {
            setFormErrors((prevErrors) => ({ ...prevErrors, description: 'Course description is required.' }));
            return;
        }

        if (!videoFile) {
            setFormErrors((prevErrors) => ({ ...prevErrors, video: 'Course title is required.' }));
            return;
        }
        if (!thumbnail) {
            setFormErrors((prevErrors) => ({ ...prevErrors, thumbnail: 'Course description is required.' }));
            return;
        }

        // Create form data
        const mp4File = videoFile;
        const jpgFile = thumbnail;
        const formData = new FormData();
        formData.append('courseDataTitle', courseDataTitle);
        formData.append('description', description);
        formData.append('mp4File', mp4File);
        formData.append('jpgFile', jpgFile);

        console.log(formData.get('courseDataTitle'));
        console.log(formData.get('description'));
        console.log(formData.get('mp4File'));
        console.log(formData.get('jpgFile'));
        console.log(courseDataTitle);

        // Make POST request to backend
        // axios.post(`http://localhost:8080/mentors/${username}/courses/${courseDetails.courseTitle}/create-new-coursedata`, formData,{
        //     headers: {
        //         'Authorization': `Bearer ${jwtToken}`,
        //         "Content-Type": "application/json",
        //     }
        // })
        const backendEndpoint = `http://localhost:8080/mentors/${username}/courses/${courseDetails.courseTitle}/create-new-coursedata`;
        fetch(backendEndpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {

                console.log('Success:', data);

            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error
            });


    };

    // const handleFileChange = (e, setFile, isVideo) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const media = document.createElement(isVideo ? 'video' : 'img');
    //         const event = isVideo ? 'loadedmetadata' : 'load';
    //         media[event] = () => {
    //             if (media.width > media.height) {
    //                 setFile(file);
    //                 setFormErrors(prevErrors => ({ ...prevErrors, [e.target.name]: null }));
    //             } else {
    //                 setFormErrors(prevErrors => ({ ...prevErrors, [e.target.name]: 'Must be in landscape orientation.' }));
    //             }
    //         };
    //         media.onerror = () => {
    //             setFormErrors(prevErrors => ({ ...prevErrors, [e.target.name]: 'Invalid file.' }));
    //         };
    //         media.src = URL.createObjectURL(file);
    //     }
    // };

    return (
        <Card className='bg-gray-950'>
            <Card.Body>




                <Form onSubmit={handleSubmit}>
                    <Form.Group className='my-2' as={Row}>
                        <Form.Label column sm={2}>Course Data Title:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                value={courseDataTitle}
                                onChange={(e) => setCourseDataTitle(e.target.value)}
                                isInvalid={!!formErrors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.courseDataTitle}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group className='my-2' as={Row}>
                        <Form.Label column sm={2}>Description:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                isInvalid={!!formErrors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.description}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group className='my-2' as={Row}>
                        <Form.Label column sm={2}>Video:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setVideoFile(file);
                                        setFormErrors((prevErrors) => ({ ...prevErrors, video: null }));
                                    }
                                }}
                                isInvalid={!!formErrors.video}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.video}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group className='my-2' as={Row}>
                        <Form.Label column sm={2}>Thumbnail:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const img = new Image();
                                        img.onload = () => {
                                            if (img.width > img.height) {
                                                setThumbnail(file);
                                                setFormErrors((prevErrors) => ({ ...prevErrors, thumbnail: null }));
                                            } else {
                                                setFormErrors((prevErrors) => ({ ...prevErrors, thumbnail: 'Image must be in landscape orientation.' }));
                                            }
                                        };
                                        img.onerror = () => {
                                            setFormErrors((prevErrors) => ({ ...prevErrors, thumbnail: 'Invalid image file.' }));
                                        };
                                        img.src = URL.createObjectURL(file);
                                    }
                                }}
                                isInvalid={!!formErrors.thumbnail}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.thumbnail}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>


                    <div className='flex justify-end'>
                        <Button onClick={handleSubmit} className='bg-success ' type="submit">Submit</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddNewCourseData
