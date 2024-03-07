import React, { useState, useEffect, useContext } from 'react'
import Slider from "react-slick";
import AuthContext from '../context/AuthContext';

// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
function TopicCerosoal() {


    const settings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 10,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        arrows: true
       
    };

    const [topicsData, setTopicsData] = useState([]);
    const {jwtToken,username} = useContext(AuthContext);

    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
        // Fetch data from the /topics endpoint
        const storedToken = jwtToken;
        console.log("jwtToken "+ storedToken)
        console.log("username "+ username)
        fetch('http://localhost:8080/topics', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                setTopicsData(data);
            })
            .catch(error => console.error('Error:', error));
    }, []); // The empty dependency array ensures that this effe

    return (
        <div className='bg-gray-900'>

            <Slider {...settings}>
                {topicsData.map((item, index) => (
                    <div key={index} className='slick-item'>
                        <a className="nav-link text-white" href="#" key={index}>
                            {item}
                        </a>
                    </div>
                ))}

            </Slider>
        </div>
    )
}

export default TopicCerosoal
