import React, { useEffect, useState } from 'react'
import MentorCard from './MentorCard';

function Mentors() {

    const [mentorList, setMentorList] = useState([]);

    useEffect(() => {

        fetchMentorList();
    }, []);

    const fetchMentorList = () => {

        fetch(`http://localhost:8080/public/all-mentors`, {
            method: "GET",
            headers: {

                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                console.log('Update the state with the fetched data' + data);
                setMentorList(data);
                setMentorList(['Dr.Vipul Dabhi','Sandeep Suthar','Deepak Vegda','Nikita Desai']);
            })
            .catch(error => console.error('hello Error:', error));
    }


    return (
        <div className='bg-gray-800 text-white text-justify w-100 m-0 ' style={{ whiteSpace: 'pre-wrap', height: '100vh', overflowY: 'scroll', overflowX: 'hidden' }}>
         <div className='container-fluid  bg-red '>
            <div className='row justify-normal p-2 m-0 text-black '>

                {mentorList.map((mentor, index) => (
                    <MentorCard key={index} mentorData={mentor} />
                ))}

            </div>
        </div>
         </div>
    )
}

export default Mentors
