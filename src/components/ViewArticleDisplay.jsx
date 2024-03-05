import React, { useContext, useEffect, useState } from 'react'
import ArticleHeading from './ArticleHeading';
import { useParams } from 'react-router-dom';
import ArticleParagraph from './ArticleParagraph';
import ImpNote from './ImpNote';
import CodeComponent from './CodeComonenet';
import AuthContext from '../context/AuthContext';

function ViewArticleDisplay() {
    
    const { jwtToken, username } = useContext(AuthContext);
    const { articleGroup, articleHeading,mentorusername } = useParams();
    const [article, setArticle] = useState({});
    const [articleDataList, setArticleDataList] = useState([]);

    useEffect(() => {
        console.log('hello from useEffect');
        fetchAritcle();
    }, []);

    const fetchAritcle = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken)
        console.log("username " + username)
        console.log("articleGroup " + articleGroup)
        console.log("articleHeading " + articleHeading)
        fetch(`http://localhost:8080/${mentorusername}/${articleGroup}/${articleHeading}`, {
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
                setArticle(data);
                setArticleDataList(data.articleDataList);
            })
            .catch(error => console.error('Error:', error));
    }





    return (
        <div className='bg-gray-800 text-white text-justify sp' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>

            <div>
                <ArticleHeading className='mt-9' content={article.articleHeading} />

                <div className='grid-flow-row flex justify-end '>


                    <hr className='bg-white my-2' />

                </div>




                {
                    articleDataList.map((articleData) => (
                        <div key={articleData.articleDataId}>
                            {articleData.contentType === 'Paragraph' && <ArticleParagraph content={articleData.contentData} />}
                            {articleData.contentType === 'Important Note' && <ImpNote content={articleData.contentData} />}
                            {articleData.contentType === 'Code Component' && <CodeComponent content={articleData.contentData} />}

                        </div>
                    ))
                }









            </div>

        </div >
    )
}

export default ViewArticleDisplay
