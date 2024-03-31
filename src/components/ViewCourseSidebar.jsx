import React from 'react'
import { Card } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { useLocation, useOutletContext } from 'react-router-dom';
import VideoCard from './VideoCard';
import ViewCourseSidebarVideoCard from './ViewCourseSidebarVideoCard';

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



function ViewCourseSidebar({courseDetails}) {

    const courseTitle = courseDetails.courseTitle;
    const location = useLocation();
    
    return (
        <div className='bg-gray-900' style={{ flex: '0 0 20%', overflowY: 'scroll', height: '100vh' }}>
        {/* Your sidebar content */}
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-gray-900" >
            <ul class="nav nav-pills flex-column mb-auto">
                <li className='nav-item '>
                    <a class="text-xl overflow-x-hidden   nav-link text-left" aria-current="page">

                        {courseDetails.courseTitle}
                    </a>
                </li>
            </ul>
            <hr className='bg-white' />
            <ul class="nav nav-pills flex-column mb-auto">
            {courseDetails && courseDetails.courseDataList && courseDetails.courseDataList.map((courseData, index) => (
                    <li className='nav-item' key={index}>
                        <a href={`/courses/${courseTitle}/${courseData.courseDataTitle}`} class="nav-link text-left" aria-current="page"
                            style={location.pathname.replace(/%20/g, ' ') === `/courses/${courseTitle}/${courseData.courseDataTitle}` ?
                                navLinkStyle.active : navLinkStyle.base}

                            onMouseOver={(e) => {
                                e.target.style.fontWeight = navLinkStyle.hover.fontWeight;
                                e.target.style.zIndex = navLinkStyle.hover.zIndex;
                            }}
                            onMouseOut={(e) => {
                                e.target.style.fontWeight = 'normal';
                                e.target.style.zIndex = 1000;
                            }}

                        >
                            {courseData.courseDataTitle}
                        </a>
                        <hr className="bg-white" />
                    </li>

                ))}



            </ul>
            <hr />

        </div>

    </div>
        // <div className='bg-gray-900' style={{ flex: '0 0 20%', overflowY: 'scroll', height: '100vh' }}>
        //     <Card className='bg-gray-950 border-0 rounded-lg my-2'>
        //         <Card.Title className='text-2xl m-3'>Videos of Course</Card.Title>
        //         <ul>
        //             {courseDetails && courseDetails.courseDataList && courseDetails.courseDataList.map((courseData, index) => {
        //                 console.log(courseData);
        //                 return <ViewCourseSidebarVideoCard courseData={courseData} courseTitle={courseDetails.courseTitle} />
        //             })}

        //             {/* <VideoCard courseData={{courseDataTitle:'java 11',description:'ajajaj'}} courseTitle={'Java'} /> */}


        //         </ul>
        //     </Card>
        // </div>
    )
}

export default ViewCourseSidebar
