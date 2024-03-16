import React, { useContext, useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap';

import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneIcon from '@mui/icons-material/Done';
import FolderIcon from '@mui/icons-material/Folder';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import ReactPlayer from 'react-player';

function CourseCard({ course, mentorDetails }) {

    const { username, userrole, jwtToken } = useContext(AuthContext);
    const [ thumbnailImg, setThumbnailImg ] = useState();

    useEffect(() => {
        fetchThumbnail();
    }, []);

    const fetchThumbnail = () => {
        const storedToken = jwtToken;
        const backend = `http://localhost:8080/public/${username}/courses/${course.courseTitle}/course-thumbnail`;
        console.log("backend " + backend)
        fetch(backend, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storedToken}`,
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
    // const loadEvent = async () => {
    //     const result = await axios.get(
    //       `http://localhost:8080/public/${username}/courses/${course.courseTitle}/course-thumbnail`,{
    //                 Authorization: `Bearer ${jwtToken}`,
    //                 "Content-Type": "application/json",
    //             }
    //     );
    //     setThumbnailImg('data:image/jpeg;base64,' + result.data.eventFlyer)
    //   };
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
                    <a href={`/${username}/manage-account/my-courses/${course.courseTitle}`}><Card.Title >{course.courseTitle}</Card.Title></a>
                    <a href={`/${username}/manage-account/my-profile`}>
                        <Card.Text className='font-semibold'>
                            {mentorDetails.firstname} {mentorDetails.lastname}
                        </Card.Text>
                    </a>

                    <Card.Text>{course.description}</Card.Text>
                    <div className='flex justify-end text-sm'>
                        <Card.Text >
                            <a className='border-0 m-1'>
                                {course.published ? <DoneIcon /> : <RemoveDoneIcon />}
                            </a>
                            <a className='border-0 m-1'>
                                <FolderIcon />
                            </a>
                        </Card.Text>
                    </div>
                </Card.Body>
                {course.label && <span className="label">{course.label}</span>}
            </Card>
        </Col>
    )
}

export default CourseCard
