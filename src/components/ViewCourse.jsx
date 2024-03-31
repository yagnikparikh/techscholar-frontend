import { Autocomplete } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ViewCourseSidebar from './ViewCourseSidebar';
import NavBar from './NavBar';
import ViewCourseVideo from './ViewCourseVideo';
import TopicCerosoal from './TopicCerosoal';
import PlayVideo from './PlayVideo';

function ViewCourse() {


    const { jwtToken, username } = useContext(AuthContext);
  const [courseDetails, setCourseDetails] = useState({});
  const [mentorDetails, setMentorDetails] = useState({});
  let {courseTitle} = useParams('courseTitle');

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

    

    useEffect(() => {

        const urlParam = new URLSearchParams(window.location.search);
        courseTitle = decodeURIComponent(courseTitle);
        const paymentId = urlParam.get('razorpay_payment_id');
        const paymentLinkId = urlParam.get('razorpay_payment_link_id');
        const paymentStatus = urlParam.get('razorpay_payment_link_status');

        console.log(courseTitle);
        updatePaymentDetails(paymentId, paymentLinkId);
    }, []);

    const updatePaymentDetails = (paymentId, paymentLinkId) => {
        
        const formData = {
            paymentId,
            courseTitle,
            paymentLinkId
        };
        const backendEndpoint = `http://localhost:8080/payments/update-payment-details`;
        console.log(formData);
        fetch(backendEndpoint, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {

                console.log('Success:', data);
            })
            .catch((error) => {

                console.error('Error:', error);
                // Handle error
            });
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowX: 'hidden' }}>

      <NavBar />

      <TopicCerosoal />


      <div style={{ display: 'flex', flex: 1 }}>
        <ViewCourseSidebar courseDetails={courseDetails} />
        <PlayVideo />
       
      </div>
    </div>
    )
}

export default ViewCourse
