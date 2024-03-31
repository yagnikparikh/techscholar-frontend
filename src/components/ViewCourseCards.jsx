import React, { useContext, useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneIcon from '@mui/icons-material/Done';
import FolderIcon from '@mui/icons-material/Folder';
import MyCourseCard from './MyCourseCard';
import ViewCourseCard from './ViewCourseCard';

function ViewCourseCards() {
    const { username, userrole, jwtToken } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
  
      fetchAllMyCourses();
    }, []);
  
    const fetchAllMyCourses = () => {
      const storedToken = jwtToken;
      console.log("jwtToken " + storedToken)
      fetch(`http://localhost:8080/public/all-publised-courses`, {
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
  
    

  
    
  
    return (
      // <CardDeck>
      <Row xs={1} md={2} lg={3} className="g-4">
        {courses.map((course) => (
          <ViewCourseCard course={course}  />
        ))}
      </Row>
    );
}

export default ViewCourseCards
