import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ViewArticleCard from './ViewArticleCard';

function ViewArticleList() {
    const { jwtToken, username } = useContext(AuthContext);
    const { articleGroup,mentorusername } = useParams();
    const [articleList, setArticleList] = useState([]);

    useEffect(() => {
        
        fetchAritcleList();
    },[]);

    const fetchAritcleList = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken)
        console.log("articleGroup " + articleGroup)
        fetch(`http://localhost:8080/${mentorusername}/${articleGroup}/articles`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                console.log('Update the state with the fetched data'+ data);
                setArticleList(data);
            })
            .catch(error => console.error('hello Error:', error));
    }

    return (

        

        <div className='bg-gray-800 text-white text-justify relative' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
            <div className='container m-2 bg-inherit '>

                <div className='card bg-gray-700 h-36' style={{ backgroundImage: 'url(https://gstatic.com/classroom/themes/Chemistry.jpg)', backgroundSize: 'cover' }}>

                    <div className="card-body position-relative">
                        <div className="position-absolute bottom-2 start-2 mb-2 ms-2 text-white">
                            <p className='text-4xl font-serif'>Article Of {articleGroup} </p>
                        </div>
                    </div>

                </div>



                

                <div>
                    {articleList.map(article => (
                        <ViewArticleCard key={article.id} content={article.articleHeading} articleGroupName={articleGroup}  />
                    ))}
                </div>

              



            </div>
        </div>



    )
}

export default ViewArticleList
