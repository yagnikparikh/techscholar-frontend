import React, { useContext, useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneIcon from '@mui/icons-material/Done';
import FolderIcon from '@mui/icons-material/Folder';
import CourseCard from './CourseCard';


const CourseCards = () => {
  // This array would ideally come from props or state

  const { username, userrole, jwtToken } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [mentorDetails, setMentorDetails] = useState({});

  useEffect(() => {

    fetchAllMyCourses();
    fetchMentorDetails();
  }, []);

  const fetchAllMyCourses = () => {
    const storedToken = jwtToken;
    console.log("jwtToken " + storedToken)
    fetch(`http://localhost:8080/mentors/${username}/courses/all-courses`, {
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
        if (data.courseList)
          setCourses(data.courseList);

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
    // <CardDeck>
    <Row xs={1} md={2} lg={3} className="g-4">
      {courses.map((course) => (
        <CourseCard course={course} mentorDetails={mentorDetails} />
      ))}
    </Row>
  );
}

export default CourseCards;
