import React, { useContext, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Card } from 'react-bootstrap';

function PlayVideo() {


  const [mentorDetails, setMentorDetails] = useState({});
  const { courseTitle } = useParams('courseTitle');
  const { username, jwtToken } = useContext(AuthContext);
  const { courseDataTitle } = useParams('courseDataTitle');
  const [courseData, setCourseData] = useState({});
  

  let backendEndpoint = `http://localhost:8080/public/courses/${courseTitle}/${courseDataTitle}/video`;
  let thumbnailUrl = `http://localhost:8080/public/courses/${courseTitle}/${courseDataTitle}/thumbnail`;
  const [thumbnailImg, setThumbnailImg] = useState();

  useEffect(() => {
    backendEndpoint = `http://localhost:8080/public/courses/${courseTitle}/${courseDataTitle}/video`;
    thumbnailUrl = `http://localhost:8080/public/courses/${courseTitle}/${courseDataTitle}/thumbnail`;
  }, [courseTitle]);

  useEffect(() => {
    
    fetchThumbnail();
  }, []);

  useEffect(() => {

    fetchCourseData();
    fetchMentorDetails();
  }, []);


  const fetchCourseData = () => {
    const storedToken = jwtToken;
    console.log("jwtToken " + storedToken)
    
    fetch(`http://localhost:8080/public/courses/${courseTitle}/${courseDataTitle}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        // Update the state with the fetched data
        console.log('Update the state with the fetched fetchCourseDatata' + data);
        console.log(data);

        setCourseData(data.courseData);

      })
      .catch(error => console.error('hello Error:', error));
  }

  const fetchMentorDetails = () => {
    const storedToken = jwtToken;
    console.log("jwtToken " + storedToken)
    fetch(`http://localhost:8080/public/${username}/basic-details`, {
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
    <div className='bg-gray-800 text-white text-justify relative' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
      <div className='container m-2 bg-inherit '>
        
          {/* <Card className='h-100 w-100'> */}
          <div className='w-100 h-auto '>
          <ReactPlayer
            // className='react-player'
            url={backendEndpoint}
            light={thumbnailImg}
            style={{ flex: '20%' }}
            width="100%"
            height="500px"
            controls={true}
          />
          </div>
          {/* </Card> */}

          <Card className='bg-gray-950 my-2'>
          <Card.Title className='my-2 mx-3 text-3xl'>{ courseData.courseDataTitle}</Card.Title>
            <Card.Text className='my-2 mx-3 text-small '>{courseData.description }</Card.Text>

          </Card>

        
      </div>
    </div>
  )
}

export default PlayVideo
