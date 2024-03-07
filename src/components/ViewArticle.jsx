import React, { useContext, useEffect, useState } from 'react'
import DriverSidebar from './DriverSidebar'
import ViewArticleDisplay from './ViewArticleDisplay'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import Profile from './Profile'
import NavBar from './NavBar'
import TopicCerosoal from './TopicCerosoal'
import AuthContext from '../context/AuthContext'

function ViewArticle() {


    const { jwtToken, username } = useContext(AuthContext);
    const { articleGroup, articleHeading, mentorusername } = useParams();
    const [articleList, setArticleList] = useState([]);
    const [contextValue, setContextValue] = useState({ lastArticleHeading: '', firstArticleHeading: '',articleList:[] });

    const location = useLocation();

    useEffect(() => {
        console.log('hello from useEffect');
        fetchAllAritcleHeadings();
        console.log('lastArticleHeading '+contextValue.lastArticleHeading);
        console.log('firstArticleHeading '+contextValue.firstArticleHeading);

    }, [articleGroup,mentorusername]);

    useEffect(() => {
        // Update contextValue only when articleList changes
        settingContext();
    }, [articleList]);


    const settingContext = () => {
        console.log("seting contextValue");
        if (articleList.length > 0) {
            console.log("seting contextValue");
            const lastHeading = articleList[articleList.length - 1];
            const firstHeading = articleList[0];
            setContextValue({ articleList: articleList,lastArticleHeading: lastHeading, firstArticleHeading: firstHeading });
        }
    }

    const fetchAllAritcleHeadings = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken)
        console.log("username " + username)
        console.log("articleGroup " + articleGroup)
        console.log("articleHeading " + articleHeading)
        console.log("location.pathname " + location.pathname)

        fetch(`http://localhost:8080/${mentorusername}/${articleGroup}/all-article-headings`, {
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
                setArticleList(data.list);
                // const lastHeading = articleList[articleList.length - 1];
                // const firstHeading = articleList[0];
                // setContextValue({ articleList: articleList,lastArticleHeading: lastHeading, firstArticleHeading: firstHeading });

            })
            .catch(error => console.error('Error:', error));
    }




    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowX: 'hidden' }}>

                <NavBar />

                <TopicCerosoal />
                <div style={{ display: 'flex', flex: 1 }}>
                    <DriverSidebar articleList={articleList} />
                    <Outlet context={contextValue} articleList={articleList}/>
                    {/* <ViewArticleDisplay /> */}
                </div>

            </div>
        </>

    )
}

export default ViewArticle
