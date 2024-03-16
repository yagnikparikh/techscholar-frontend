import React from 'react'
import { Card } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { useOutletContext } from 'react-router-dom';
import VideoCard from './VideoCard';

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

function MyCourseVideoList() {

    const { courseDetails } = useOutletContext();
    const backendEndpoint = "http://localhost:8080/public/video/video1";
    const thumbnailUrl = "https://i.ytimg.com/vi/fRCndnyrmG4/maxresdefault.jpg";

    return (
        <Card className='bg-gray-950 border-0 rounded-lg my-2'>
            <Card.Title className='text-2xl m-3'>Videos of Course</Card.Title>
            <ul>
                {courseDetails && courseDetails.courseDataList && courseDetails.courseDataList.map((courseData, index) => {
                    console.log(courseData);
                    return <VideoCard courseData={courseData} courseTitle={courseDetails.courseTitle} />
                })}


            </ul>
        </Card>
    )
}

export default MyCourseVideoList
