
import NavBar from './NavBar'
import TopicCerosoal from './TopicCerosoal'
import ArticleContent from './ArticleContent'
import Sidebar from './SideBar'
import CreateNewArticle from './CreateNewArticle'
import MaterialUpload from './MaterialUpload'
import { React, useState, useEffect } from 'react';
import axios from 'axios'

function HomePage() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(['DSA', 'HTML']);
  const result1 = {title:'DSA',}

  useEffect(() => {
    if (searchText) {
      // Replace with your actual API endpoint
      axios.post(`http://localhost:8080/public/search-result`, searchText)
        .then(res => {
          console.log(res);
          setSearchResults(res.data.list);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowX: 'hidden' }}>

      <NavBar />

      <TopicCerosoal />

      {/* <div style={{ display: 'flex', flex: 1 }}> */}
      {/* <Sidebar /> */}
      {/* <ArticleContent /> */}
      {/* <CreateNewArticle /> */}
      {/* <MaterialUpload/> */}

      <div className='bg-gray-950 flex items-center justify-center h-screen w-screen'>
        {/* <div className='bg-gray-900 rounded-lg m-10 p-10 flex items-center justify-center h-full w-full max-w-4xl max-h-96'> */}
        {/* <div className='flex-col'>
          <h1>Hello, What Do You Want To Learn?</h1>
          <input
            className="w-full h-12 px-6 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:outline-none"
            type='search'
            placeholder='Search...'
          />
          </div> */}
        <div className='flex-col w-full'>
          <h1 className='text-white text-3xl'>Hello, What Do You Want To Learn?</h1>
          <div className="relative">
          <input
            className={`w-full lg:w-2/4 h-12 px-6 mt-2 text-lg text-gray-700 placeholder-gray-600 border  ${searchResults && searchResults.length > 0 ? 'rounded-tl-full  rounded-bl-lg rounded-br-none' : 'rounded-full '} focus:outline-none`}
            type='search'
            placeholder='Search...'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />

          {/* <div
            className={`dropdown-menu ${searchResults.length != 0 ? 'show' : ''}`}
            style={{ position: 'absolute', top: '100%', left: 0 }}
            aria-labelledby="Search"
          >
            {searchResults.map((item, index) => (
              <a className="dropdown-item " href={item.link} key={index}>
                <strong>{item.title}</strong>
                <br></br>
                <small className='mt-0'>{item.type}</small>
              </a>
            ))}
            </div> */}
            {/* <div className='w-full lg:w-2/4 h-12 px-6 mt-2 text-lg text-gray-700 placeholder-gray-600 border rounded-full focus:outline-none '></div> */}
            <div className="absolute left-0 right-0 mx-auto  bg-white mt-0 w-full lg:w-2/4 rounded-none shadow-lg ">
              { searchResults && searchResults.map((result, index) => (
                <div key={index} className="border-b last:border-b-0 p-2">
                  <a href={result.link} className=''>
                    <div className='flex  items-baseline'>
                    <strong className='mx-2 text-xl'>
                      {result.title}
                    </strong>
                    <small className='italic mx-2 align-baseline'>{result.type}</small>
                    </div></a>
                </div>
              ))}
            </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        {/* </div> */}
      </div>
      )
}

      export default HomePage
