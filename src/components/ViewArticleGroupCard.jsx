import React, { useContext, useEffect, useState } from 'react'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';

function ViewArticleGroupCard({ content }) {

    const { username, jwtToken } = useContext(AuthContext);
    const [firstArticleHeading, setFirstArticleHeading] = useState('');
    const {  mentorusername } = useParams();

    useEffect(() => {
        console.log('hello from ViewArticleGroupCard');
        fetchFirstAritcleHeading();
    }, []);

    const fetchFirstAritcleHeading = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken)
        console.log("username " + username)
        
        const backendEndpoint=`http://localhost:8080/${mentorusername}/${content}/first-article-heading`;
        console.log(backendEndpoint);
        fetch(backendEndpoint, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                console.log('Update the state with the fetched data hello' + data);
                console.log(data);
                setFirstArticleHeading(data.messege);

            })
            .catch(error => console.error('ViewArticleGroupCard Error:', error));
    }


    return (
        <div>
            <a className="card bg-gray-700 mt-1 text-decoration-none text-light">
                <div className="card-body d-flex justify-between align-items-center ">
                    <a href={`${content}/${firstArticleHeading}`}><div className="card-text text-lg">{content}</div></a>
                    <div className="d-flex justify-content-beween">
                        <button className="btn btn-primary mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                            <BookmarkIcon />
                        </button>
                        <button className="btn btn-success  mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Like" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                            <ThumbUpAltOutlinedIcon />
                        </button>
                    </div>
                </div>

            </a>

        </div>
    )
}

export default ViewArticleGroupCard
