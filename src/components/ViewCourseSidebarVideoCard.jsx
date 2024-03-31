import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import AuthContext from '../context/AuthContext';

const navLinkStyle = {
    base: {
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'font-weight 0.3s ease, z-index 0.3s ease',
    },
    hover: {
        fontWeight: 'bold',
        cursor: 'poniter',
        zIndex: 1010,
    },
};

function ViewCourseSidebarVideoCard({ courseData, courseTitle }) {
    const { username, jwtToken } = useContext(AuthContext);
    // const backendEndpoint="http://localhost:8080/public/video/video1";
    let backendEndpoint = `http://localhost:8080/public/courses/${courseTitle}/${courseData.courseDataTitle}/video`;
    let thumbnailUrl = `http://localhost:8080/public/courses/${courseTitle}/${courseData.courseDataTitle}/thumbnail`;
    const [thumbnailImg, setThumbnailImg] = useState();

    useEffect(() => {


        backendEndpoint = `http://localhost:8080/public/courses/${courseTitle}/${courseData.courseDataTitle}/video`;
        thumbnailUrl = `http://localhost:8080/public/courses/${courseTitle}/${courseData.courseDataTitle}/thumbnail`;
    }, [courseTitle, courseData]);

    useEffect(() => {
        fetchThumbnail();
    }, []);

    const fetchThumbnail = () => {
        const storedToken = jwtToken;

        fetch(thumbnailUrl, {
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

    return (
        <li className='mb-4 mx-3'>
            <Card className='bg-gray-950 border-0'>
                <div className='flex items-center'>
                    {/* Video player on the left */}
                    {/* <div className='flex-1/5 '>
                        <ReactPlayer
                            className='react-player'
                            url={backendEndpoint}
                            light={thumbnailImg}
                            style={{ flex: '20%' }}
                            width="24px"
                            height="15px"
                            controls={true}
                        />
                    </div> */}
                    {/* Course details on the right */}
                    <div className='flex-4/5'>
                        <a style={navLinkStyle.base}>
                            <div className='ml-4'>
                                <Card.Title
                                    onMouseOver={(e) => {
                                        e.target.style.fontWeight = navLinkStyle.hover.fontWeight;
                                        e.target.style.zIndex = navLinkStyle.hover.zIndex;
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.fontWeight = 'normal';
                                        e.target.style.zIndex = 1000;
                                    }}>
                                    <a href={`course-video/${courseData.courseDataTitle}`}>
                                        {courseData.courseDataTitle}
                                    </a>

                                </Card.Title>
                                {/* <Card.Text>Description : {courseData.description.substring(0, 190) + "..."}</Card.Text> */}
                                {/* <Card.Text>{courseDetails.students}</Card.Text> */}
                            </div>
                        </a>
                    </div>
                </div>
                <hr className='bg-white my-2' />
            </Card>
        </li>
    )
}

export default ViewCourseSidebarVideoCard
