import React, { useContext, useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import AuthContext from '../context/AuthContext';
import ArticleGroupCard from './ArticleGroupCard';
import ArticleCard from './ArticleCard';
import { useParams } from 'react-router-dom';
import GuidedPathCard from './GuidedPathCard';
import GuidedPathArticleCard from './GuidedPathArticleCard';


function GuidedPathArticleList() {

    const { jwtToken, username } = useContext(AuthContext);
    const { guidedPathTitle } = useParams();
    const [guidedPathArticleList, setGuidedPathArticleList] = useState([]);

    useEffect(() => {
        
        fetchGuidedPathAritcleList();
    },[]);

    const fetchGuidedPathAritcleList = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken)
        console.log("guidedPathTitle " + guidedPathTitle)
        fetch(`http://localhost:8080/${guidedPathTitle}/articles`, {
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
                setGuidedPathArticleList(data.guidedPathArticleList);
            })
            .catch(error => console.error('hello Error:', error));
    }

    return (


        <div className='bg-gray-800 text-white text-justify relative' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
            <div className='container m-2 bg-inherit '>

                <div className='card bg-gray-700 h-36' style={{ backgroundImage: 'url(https://gstatic.com/classroom/themes/Chemistry.jpg)', backgroundSize: 'cover' }}>

                    <div className="card-body position-relative">
                        <div className="position-absolute bottom-2 start-2 mb-2 ms-2 text-white">
                            <p className='text-4xl font-serif'>Article Of {guidedPathTitle} </p>
                        </div>
                    </div>

                </div>



                <a href='create-new-guidedpath-article' className="card bg-gray-700 mt-1 text-decoration-none ">
                    <div className="card-body">
                        <p className="card-text text-xl align-middle"> <CreateIcon className='align-middle' /> Create New Article</p>
                    </div>
                </a>

                <div>
                    {guidedPathArticleList.map(guidedPathArticle => (
                        <GuidedPathArticleCard key={guidedPathArticle.id} content={guidedPathArticle.articleHeading} guidedPathTitle={guidedPathTitle}  reloadArticleList={fetchGuidedPathAritcleList}/>
                    ))}
                </div>

              



            </div>
        </div>



    )
}

export default GuidedPathArticleList