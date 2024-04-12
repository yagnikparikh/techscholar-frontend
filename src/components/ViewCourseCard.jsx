import React, { useContext, useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneIcon from '@mui/icons-material/Done';

import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FolderIcon from '@mui/icons-material/Folder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import ReactPlayer from 'react-player';

function calculateFinalPrice(originalPrice, discountPercentage) {
    // Calculate the discount amount
    const discountAmount = (originalPrice * discountPercentage) / 100;

    // Calculate the final price after discount
    let finalPrice = originalPrice - discountAmount;

    // Round down the final price if it's in decimal
    finalPrice = Math.floor(finalPrice);

    return finalPrice;
}

function ViewCourseCard({ course }) {

    const { username, userrole, jwtToken } = useContext(AuthContext);
    const [thumbnailImg, setThumbnailImg] = useState();
    const [mentorDetails, setMentorDetails] = useState({});
    const [IsPurchesed, setIsPurchesed] = useState(false);
    const [courseLink,setCourseLink] = useState('');

    useEffect(() => {
        fetchThumbnail();
        fetchMentorDetails();
        checkIsPurchesed();
        getFirstCourseData();
    }, []);

    const fetchThumbnail = () => {
        const storedToken = jwtToken;
        const backend = `http://localhost:8080/public/courses/${course.courseTitle}/course-thumbnail`;
        console.log("backend " + backend)
        fetch(backend, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => response.text())
            .then(data => {
                // Update the state with the fetched data
                console.log('Update the state with the fetched data' + data);
                console.log(data);
                setThumbnailImg(`data:image/jpeg;base64,${data}`);
                console.log("fetchThumbnail : " + fetchThumbnail);
                // setCourseSubscibers(data.courseSubscibers.map);
            })
            .catch(error => console.error('hello Error:', error));

    }

    const getFirstCourseData = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken)
        fetch(`http://localhost:8080/public/courses/${course.courseTitle}/get-first-courseData`, {
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
                setCourseLink(`/courses/${course.courseTitle}/${data.courseData.courseDataTitle}`);
                console.log("mentorDetails : " + mentorDetails);
                // setCourseSubscibers(data.courseSubscibers.map);
            })
            .catch(error => console.error('hello Error:', error));
    }


    const checkIsPurchesed = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken)
        fetch(`http://localhost:8080/public/courses/${course.courseTitle}/get-instructor-details`, {
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
                setMentorDetails(data);
                console.log("mentorDetails : " + mentorDetails);
                // setCourseSubscibers(data.courseSubscibers.map);
            })
            .catch(error => console.error('hello Error:', error));
    }
    // const loadEvent = async () => {
    //     const result = await axios.get(
    //       `http://localhost:8080/public/${username}/courses/${course.courseTitle}/course-thumbnail`,{
    //                 Authorization: `Bearer ${jwtToken}`,
    //                 "Content-Type": "application/json",
    //             }
    //     );
    //     setThumbnailImg('data:image/jpeg;base64,' + result.data.eventFlyer)
    //   };

    const fetchMentorDetails = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken)
        fetch(`http://localhost:8080/public/courses/${course.courseTitle}/purchesed-info`, {
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
                setIsPurchesed(data.isPurchesed);
                console.log("mentorDetails : " + mentorDetails);
                // setCourseSubscibers(data.courseSubscibers.map);
            })
            .catch(error => console.error('hello Error:', error));
    }

    const handelBuyNow = () => {

        const backendEndpoint = `http://localhost:8080/payments/${course.courseId}`;
        fetch(backendEndpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then((response) => response.json())
            .then((data) => {

                console.log('Success:', data);
                window.location.href = data.paymentLinkUrl;
            })
            .catch((error) => {

                console.error('Error:', error);
                // Handle error
            });
    }

    return (
        <Col key={course.id}>

            <Card className='my-2 bg-gray-950 border-0'>
                <Card.Img variant="top" src={thumbnailImg} />
                {/* <img src={thumbnailImg} alt='okkk' /> */}
                {/* <ReactPlayer className='react-player'
                    url={`http://localhost:8080/public/${username}/courses/${course.courseTitle}/course-thumbnail`}
                    light={`http://localhost:8080/public/${username}/courses/${course.courseTitle}/course-thumbnail`}
                    width="240px"
                    height="135px"
                /> */}
                <Card.Body className='text-left '>
                    <Card.Title className='m-0' >
                        {IsPurchesed ?
                            <a href={courseLink}>
                                {course.courseTitle}
                            </a>
                            :
                            <a onClick={handelBuyNow}>
                                {course.courseTitle}
                            </a>

                        }
                    </Card.Title>
                    <a href={`/${username}/profile`} className=' font-medium mt-1'>
                        <Card.Text className='font-medium '>
                            {mentorDetails.firstname} {mentorDetails.lastname}
                        </Card.Text>

                    </a>



                    <div className='mt-2 flex justify-between'>

                        <div className='flex  items-baseline'>
                            <Card.Title className='text-2xl p-0 m-0 '>
                                {calculateFinalPrice(course.coursePrice, 10)}&#x20b9;

                            </Card.Title>
                            <div className='line-through text-small align-baseline mx-1'>
                                {course.coursePrice}&#x20b9;
                            </div>
                        </div>

                        <div className='flex justify-end text-sm'>
                            <Card.Text >

                                {
                                    IsPurchesed ?
                                        <a className='border-0 m-1' href={courseLink}>
                                            <Button className='btn btn-primary  text-sm  bg-primary '>Learn Now</Button>
                                        </a>
                                        :
                                        <a className='border-0 m-1'>
                                            <Button onClick={handelBuyNow} className='btn btn-success  text-sm  bg-success '>Buy Now</Button>
                                        </a>



                                }
                                <a className='border-0 m-1'>
                                    <button title='Add to Favorites' className='bg-transparent border-0' style={{ outline: 'none' }}><FavoriteBorderIcon /></button>
                                </a>
                            </Card.Text>
                        </div>
                    </div>


                </Card.Body>

                {course.label && <span className="label">{course.label}</span>}
            </Card>
        </Col>
    )
}

export default ViewCourseCard
