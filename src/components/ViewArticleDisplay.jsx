import React, { useContext, useEffect, useState } from 'react'
import ArticleHeading from './ArticleHeading';
import { useParams } from 'react-router-dom';
import ArticleParagraph from './ArticleParagraph';
import ImpNote from './ImpNote';
import CodeComponent from './CodeComonenet';
import AuthContext from '../context/AuthContext';
import { useOutletContext } from 'react-router-dom';
import ViewArticleHeading from './ViewArticleHeading';

function ViewArticleDisplay() {

    const { jwtToken, username } = useContext(AuthContext);
    const { articleGroup, articleHeading, mentorusername } = useParams();
    const [article, setArticle] = useState({});
    const [renderNextButton, setRenderNextButton] = useState(true);
    const [renderPrevButton, setRenderPrevButton] = useState(true);
    const [nextArticleHeading, setNextArticleHeading] = useState('');
    const [prevArticleHeading, setPrevArticleHeading] = useState('');
    const { lastArticleHeading, firstArticleHeading, articleList } = useOutletContext();
    const [articleDataList, setArticleDataList] = useState([]);


    useEffect(() => {
        console.log('hello from useEffect');


        fetchAritcle();
        handleArticleChange();




    }, [articleHeading, lastArticleHeading, firstArticleHeading, articleList]);

    const handleArticleChange = () => {

        console.log("handleArticleChange" + articleList + articleHeading + " " + lastArticleHeading);

        const currIndex = articleList.indexOf(articleHeading);


        if (articleHeading === firstArticleHeading) {
            console.log('articleHeading===firstArticleHeading')
            setRenderPrevButton(false);
        }
        if (articleHeading === lastArticleHeading) {
            console.log('articleHeading===lastArticleHeading')
            setRenderNextButton(false);
        }
        if (renderNextButton)
            setNextArticleHeading(articleList[currIndex + 1]);
        if (renderPrevButton)
            setPrevArticleHeading(articleList[currIndex - 1]);
    }

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
                <ViewArticleHeading className='mt-9' content={article.articleHeading} mentorusername={mentorusername} articleGroup={articleGroup} renderNextButton={renderNextButton} renderPrevButton={renderPrevButton} nextArticleHeading={nextArticleHeading} prevArticleHeading={prevArticleHeading} />
               

                {
                    articleDataList.map((articleData) => (
                        <div key={articleData.articleDataId}>
                            {articleData.contentType === 'Paragraph' && <ArticleParagraph content={articleData.contentData} />}
                            {articleData.contentType === 'Important Note' && <ImpNote content={articleData.contentData} />}
                            {articleData.contentType === 'Code Snippet' && <CodeComponent content={articleData.contentData} />}

                        </div>
                    ))
                }









            </div>

        </div >
    )
}

export default ViewArticleDisplay
