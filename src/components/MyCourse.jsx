import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import AuthContext from '../context/AuthContext';
import ReactPlayer from 'react-player';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import FolderIcon from '@mui/icons-material/Folder';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MyCourseVideoList from './MyCourseVideoList';
import { Link, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

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



function MyCourse() {

  const { jwtToken, username } = useContext(AuthContext);
  const backendEndpoint = "http://localhost:8080/public/video/video1";
  const thumbnailUrl = "https://i.ytimg.com/vi/fRCndnyrmG4/maxresdefault.jpg";

  const [courseDetails, setCourseDetails] = useState({});
  const [mentorDetails, setMentorDetails] = useState({});
  const {courseTitle} = useParams('courseTitle');

  useEffect(() => {

    fetchCourseDetails();
    fetchMentorDetails();
  }, []);

  const fetchCourseDetails = () => {
    const storedToken = jwtToken;
    console.log("jwtToken " + storedToken)
    fetch(`http://localhost:8080/public/${username}/courses/${courseTitle}`, {
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

        setCourseDetails(data);

      })
      .catch(error => console.error('hello Error:', error));
  }

  const fetchMentorDetails = () => {
    const storedToken = jwtToken;
    console.log("jwtToken " + storedToken)
    fetch(`http://localhost:8080/mentors/${username}/basic-details`, {
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

  
  return (
    <div className='bg-gray-800 text-white text-justify relative' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
      <div className='container m-2 bg-inherit '>
        {/* <div className='card ' style={{backgroundImage:"url(https://gstatic.com/classroom/themes/Chemistry.jpg)"}} /> */}
        <Card className='border-0 p-0 m-0' style={{ backgroundImage: "url(https://gstatic.com/classroom/themes/Chemistry.jpg)" }} >
          {/* <Card.Img className='p-0 m-0' variant="top" style={{ objectFit: 'contain' }} src="https://gstatic.com/classroom/themes/Chemistry.jpg"  /> */}
          <Card.Body className='text-left'>
            <a href={`/${username}/manage-account/my-courses/${courseDetails.courseTitle}`}><Card.Title className='text-2xl' >{courseDetails.courseTitle}</Card.Title></a>
            <a href={`/${username}/manage-account/my-profile`}><Card.Text>{username}</Card.Text></a>
            <Card.Text>{courseDetails.students}</Card.Text>
          </Card.Body>
          {courseDetails.label && <span className="label">{courseDetails.label}</span>
          }
        </Card>

        <div className="card bg-gray-950 my-2">
          <div className='flex justify-between m-3'>
            <h1 className="card-text text-xl align-middle">
              Manage Your Course
            </h1>
            <div className="card-text text-xl align-middle">
            <Link className='mx-2' to="add-new-video" title="Add new course video"><AddIcon /></Link>
              <Link className='mx-2' to="course-videos" title="Manage course videos"><VideoLibraryIcon /></Link>
              <Link className='mx-2' to="course-material" title="Manage course materials"><FolderIcon /></Link>
              <Link className='mx-2' to="course-details" title="Manage course details"><InfoIcon /></Link>
              <Link className='mx-2' to="course-users" title="Manage users"><PersonIcon /></Link>
            </div>
          </div>
        </div>

        {/* <MyCourseVideoList course={course}/> */}
        <Outlet context={{ mentorDetails,courseDetails,fetchCourseDetails,fetchMentorDetails }} />

      </div>
    </div>
  )
}

export default MyCourse
