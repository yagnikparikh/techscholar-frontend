import React, { useContext, useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import AuthContext from '../context/AuthContext';
import ArticleGroupCard from './ArticleGroupCard';


function MyArticleGroup() {

    const { jwtToken, username } = useContext(AuthContext);
    const [articleGroupList, setArticleGroupList] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        
        fetchAritcleGroupList();
    }, [refreshData]);

    const fetchAritcleGroupList = () => {
        const storedToken = jwtToken;
        console.log("jwtToken " + storedToken)
        fetch(`http://localhost:8080/${username}/articlegroups`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                // Update the state with the fetched data
                console.log('Update the state with the fetched data');
                setArticleGroupList(data.articleGroupList);
            })
            .catch(error => console.error('Error:', error));
    }

    return (


        <div className='bg-gray-800 text-white text-justify relative' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
            <div className='container m-2 bg-inherit '>

                <div className='card bg-gray-700 h-36' style={{ backgroundImage: 'url(https://gstatic.com/classroom/themes/Chemistry.jpg)', backgroundSize: 'cover' }}>

                    <div className="card-body position-relative">
                        <div className="position-absolute bottom-2 start-2 mb-2 ms-2 text-white">
                            <p className='text-4xl font-serif'>Article Groups</p>
                        </div>
                    </div>

                </div>



                <a href='create-new-articlegroup' className="card bg-gray-700 mt-1 text-decoration-none ">
                    <div className="card-body">
                        <p className="card-text text-xl align-middle"> <CreateIcon className='align-middle' /> Create New Article Group</p>
                    </div>
                </a>

                <div>
                    {articleGroupList.map(articleGroup => (
                        <ArticleGroupCard key={articleGroup.id} content={articleGroup.articleGroupName}  reloadArticleGroupList={fetchAritcleGroupList}/>
                    ))}
                </div>

              



            </div>
        </div>



    )
}

export default MyArticleGroup