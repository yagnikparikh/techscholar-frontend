import React, { useContext, useEffect, useState } from 'react';
import { Card, Form, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


function MyCourseDetails() {
    const { courseDetails, fetchCourseDetails, fetchMentorDetails, mentorDetails } = useOutletContext();
    const { username, jwtToken } = useContext(AuthContext);
    // const [courseDetails, setCourseDetails] = useState({});
    // onst [mentorDetails, setMentorDetails] = useState({});
    const [courseTitle, setCourseTitle] = useState(courseDetails.courseTitle);
    const [courseInstructor, setCourseInstructor] = useState({}); // Assuming instructor is part of the course object
    const [coursePrice, setCoursePrice] = useState(courseDetails.coursePrice);
    const [discount, setDiscount] = useState(courseDetails.discount);
    const [published, setPublished] = useState(courseDetails.published);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [courseThumbnailPath,setCourseThumbnailPath] = useState(courseDetails.courseThumbnailPath);
    const [publishDate, setPublishDate] = useState(courseDetails.publishDate);
    const [thumbnail, setThumbnail] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [relatedTopics, setRelatedTopics] = useState([]);


    useEffect(() => {
        let temp=new String(courseDetails.courseTitle);
            const index = temp.lastIndexOf(`\\`);
            temp = temp.substring(index+1);
        if (courseDetails.courseTitle) {
            let temp=new String(courseDetails.courseTitle);
            const index = temp.lastIndexOf('/');
            temp = temp.substring(index+1);
            console.log(temp);
            setCourseTitle(temp);
        }

        if (courseDetails.courseThumbnailPath) {
            setCourseThumbnailPath(courseDetails.courseThumbnailPath);
        }

        if (courseDetails.coursePrice) {
            setCoursePrice(courseDetails.coursePrice);
        }
        if (courseDetails.courseRelatedTopics) {
            setRelatedTopics(courseDetails.courseRelatedTopics);
        }
        if (courseDetails.discount) {
            setDiscount(courseDetails.discount);
        }
        if (courseDetails.published) {
            setPublished(courseDetails.published);
        }
        if (courseDetails.publishDate) {
            setPublishDate(courseDetails.publishDate);
        }
        // Assuming courseDetails.thumbnail is the URL or data for the thumbnail
        if (courseDetails.thumbnail) {
            setThumbnail(courseDetails.thumbnail);
        }

        console.log(courseDetails.courseTitle);
        console.log(courseTitle);
    }, [courseDetails]);

    useEffect(() => {
        if (mentorDetails != undefined) {
            setCourseInstructor(mentorDetails);
        }

        console.log(mentorDetails);
    }, [mentorDetails]);



    const handleSubmit = async (event) => {
        event.preventDefault();
        let errors = {};
        if (!courseTitle) errors.title = 'Title is required';
        // if (!courseInstructor) errors.instructor = 'Instructor is required';
        if (!coursePrice) errors.price = 'Price is required';
        if (!discount) errors.discount = 'Discount is required';
        // if (!publishDate) errors.publishDate = 'Publish date is required';
        if (!courseTitle) {
            errors.courseTitle = 'Course title cannot be empty.';
        }
        if (coursePrice <= 0) {
            errors.coursePrice = 'Course price must be greater than zero.';
        }
        if (discount < 0 || discount > 100) {
            errors.discount = 'Discount must be between 0 and 100%.';
        }
        if (relatedTopics.length === 0) {
            errors.relatedTopics = 'Related topics are required.';
        }
        if (!thumbnail) {
            errors.thumbnail = 'Course thumbnail is required.';
        }
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Form is valid, prepare the data for submission
            const formData = new FormData(); // Assuming you want to send this
            formData.append('price', coursePrice);
            formData.append('discount', discount);
            formData.append('relatedTopics',relatedTopics);
            formData.append('thumbnailFile', thumbnail);
            
            console.log(formData);
            console.log(coursePrice);
            console.log(discount);
            console.log(relatedTopics);
            // Make PUT request to the backend with all the data
            try {
                const response = await fetch(`http://localhost:8080/mentors/${username}/courses/${courseTitle}/update-course-details`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: formData,
                    // Headers may be omitted since FormData is automatically set to 'multipart/form-data'
                });

                if (!response.ok) {
                    // Handle HTTP errors
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                await fetchCourseDetails();
                // Handle successful response
                //   onSave(data); // Pass the updated data back to the parent component
            } catch (error) {
                // Handle errors, e.g., display a message to the user
                console.error('There was an error updating the course details:', error);
            }
        }
    };

    const handlePublish = async (event) => {
        console.log('hello handlePublish');
        event.preventDefault();
        let errors = {};
        if (!courseTitle) errors.title = 'Title is require To Publishd';
        // if (!courseInstructor) errors.instructor = 'Instructor is require To Publishd';
        if (!coursePrice) errors.price = 'Price is require To Publishd';
        if (!discount) errors.discount = 'Discount is require To Publishd';
        // if (!publishDate) errors.publishDate = 'Publish date is require To Publishd';
        if (!courseTitle) {
            errors.courseTitle = 'Course title cannot be empty To Publish.';
        }
        if (coursePrice <= 0) {
            errors.coursePrice = 'Course price must be greater than zero To Publish.';
        }
        if (discount < 0 || discount > 100) {
            errors.discount = 'Discount must be between 0 and 100% To Publish.';
        }
        if (relatedTopics.length === 0) {
            errors.relatedTopics = 'Related topics are required.';
        }
        if (!thumbnail) {
            errors.thumbnail = 'Course thumbnail is required To Publish.';
        }
        setFormErrors(errors);

        

        if (Object.keys(errors).length === 0) {
            // Form is valid, prepare the data for submission
            const formData = new FormData(); // Assuming you want to send this
            formData.append('price', coursePrice);
            formData.append('discount', discount);
            formData.append('relatedTopics',relatedTopics);
            formData.append('thumbnailFile', thumbnail);
            
            console.log(formData);
            console.log(coursePrice);
            console.log(discount);
            console.log(relatedTopics);
            // Make PUT request to the backend with all the data
            try {
                const response = await fetch(`http://localhost:8080/mentors/${username}/courses/${courseTitle}/publish-course`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: formData,
                    // Headers may be omitted since FormData is automatically set to 'multipart/form-data'
                });

                if (!response.ok) {
                    // Handle HTTP errors
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                await fetchCourseDetails();
                // Handle successful response
                //   onSave(data); // Pass the updated data back to the parent component
            } catch (error) {
                // Handle errors, e.g., display a message to the user
                console.error('There was an error updating the course details:', error);
            }
        }
    };

    const renderRelatedTopics = (topics) => {
        if (topics && topics.length > 0) {
            return (
                <div>
                     {topics.join(', ')}
                </div>
            );
        }
        return 'No related topics added';
    };

    const handleThumbnailChange = (event) => {
        setThumbnail(event.target.files[0]);
    };

    

    const renderValue = (value) => {
        return value ? value : <span style={{ color: 'red' }}>Not Available</span>;
    };

    return (
        <Card className='bg-gray-950'>
            <Card.Body>
                <div className='flex justify-between'>
                    <Card.Title className='text-2xl '>Course Details</Card.Title>
                    <Button onClick={() => setIsEditMode(!isEditMode)} className='btn btn-success bg-success '>{isEditMode ? <>Preview Mode</> : <>Edit Mode</>}</Button>
                </div>
                {isEditMode ?
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='my-2' as={Row}>
                            <Form.Label column sm={2}>Title:</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    value={courseTitle}
                                    onChange={(e) => setCourseTitle(e.target.value)}
                                    isInvalid={!!formErrors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.title}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group className='my-2' as={Row}>
                            <Form.Label column sm={2}>Instructor:</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    value={courseInstructor.firstname + ' ' + courseInstructor.lastname}
                                    onChange={(e) => setCourseInstructor(e.target.value)}
                                    isInvalid={!!formErrors.instructor}
                                    disabled
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.instructor}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group className='my-2' as={Row}>
                            <Form.Label column sm={2}>Price:</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="number"
                                    value={coursePrice}
                                    onChange={(e) => setCoursePrice(e.target.value)}
                                    isInvalid={!!formErrors.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.price}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group className='my-2' as={Row}>
                            <Form.Label column sm={2}>Discount:</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={discount}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (value >= 0 && value <= 100) {
                                            setDiscount(value);
                                        }
                                    }}
                                    isInvalid={!!formErrors.discount}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.discount}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group className='my-2' as={Row}>
                            <Form.Label column sm={2}>Related Topics:</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    value={relatedTopics.join(', ')}
                                    onChange={(e) => setRelatedTopics(e.target.value.split(',').map(topic => topic.trim()))}
                                    isInvalid={!!formErrors.relatedTopics}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.relatedTopics}
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
                                            // Create an image object to check its dimensions
                                            const img = new Image();
                                            img.onload = () => {
                                                // Check if the image is in landscape orientation (width > height)
                                                if (img.width > img.height) {
                                                    setThumbnail(file); // Set the file as the thumbnail
                                                    setFormErrors((prevErrors) => ({ ...prevErrors, thumbnail: null })); // Clear any previous thumbnail errors
                                                } else {
                                                    setFormErrors((prevErrors) => ({ ...prevErrors, thumbnail: 'Image must be in landscape orientation.' }));
                                                }
                                            };
                                            img.onerror = () => {
                                                setFormErrors((prevErrors) => ({ ...prevErrors, thumbnail: 'Invalid image file.' }));
                                            };
                                            img.src = URL.createObjectURL(file); // Load the image to check dimensions
                                        }
                                    }}
                                    isInvalid={!!formErrors.thumbnail}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.thumbnail}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group className='my-2' as={Row}>
                            <Form.Label column sm={2}>Publish Date:</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="date"
                                    value={publishDate}
                                    onChange={(e) => setPublishDate(e.target.value)}
                                    isInvalid={!!formErrors.publishDate}
                                    disabled
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.publishDate}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <div className='flex justify-end mt-4'>
                            {!published && (
                                <Button onClick={handlePublish} variant="primary bg-primary mr-2" >
                                    Publish
                                </Button>
                            )}

                            {isEditMode && <Button variant="success" className='bg-success ' type="submit">Save</Button>}
                        </div>
                    </Form>
                    :
                    <div>
                        <Row className="mb-2">
                            <Col xs={12} sm={6} md={5} lg={4} xl={3}><strong>Title:</strong></Col>
                            <Col xs={12} sm={6} md={7} lg={8} xl={9}>{renderValue(courseTitle)}</Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={12} sm={6} md={5} lg={4} xl={3}><strong>Instructor:</strong></Col>
                            <Col xs={12} sm={6} md={7} lg={8} xl={9}>
                                {courseInstructor
                                    ? <a href={`/${username}/manage-account/my-profile`}>{courseInstructor.firstname + ' ' + courseInstructor.lastname}</a>
                                    : <span style={{ color: 'red' }}>Not Available</span>}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={12} sm={6} md={5} lg={4} xl={3}><strong>Price:</strong></Col>
                            <Col xs={12} sm={6} md={7} lg={8} xl={9}>{renderValue(coursePrice)}</Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={12} sm={6} md={5} lg={4} xl={3}><strong>Discount:</strong></Col>
                            <Col xs={12} sm={6} md={7} lg={8} xl={9}>{renderValue(discount)}</Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={12} sm={6} md={5} lg={4} xl={3}><strong>Thumbnail:</strong></Col>
                            <Col xs={12} sm={6} md={7} lg={8} xl={9}>{renderValue(courseThumbnailPath)}</Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={12} sm={6} md={5} lg={4} xl={3}><strong>Related Topics:</strong></Col>
                            <Col xs={12} sm={6} md={7} lg={8} xl={9}>{renderRelatedTopics(relatedTopics)}</Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={12} sm={6} md={5} lg={4} xl={3}><strong>Publish Date:</strong></Col>
                            <Col xs={12} sm={6} md={7} lg={8} xl={9}>
                                {published ? renderValue(publishDate) : renderValue('')}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={12} sm={6} md={5} lg={4} xl={3}><strong>Status:</strong></Col>
                            <Col xs={12} sm={6} md={7} lg={8} xl={9}>
                                {published ? 'Published' : 'Not Published'}
                            </Col>
                        </Row>
                    </div>
                }
            </Card.Body>
        </Card>
    );
}

export default MyCourseDetails
