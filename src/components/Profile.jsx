import React, { useContext } from 'react'
import ProfileSidebar from './ProfileSidebar'
import CreateNewArticle from './CreateNewArticle'
import TopicCerosoal from './TopicCerosoal'
import NavBar from './NavBar'
import AuthContext from '../context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import UserProfile from './UserProfile'

function Profile() {

  const { username } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!username) {
    navigate('/')
    return null;
  }
  return (


    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowX: 'hidden' }}>

      <NavBar />

      <TopicCerosoal />

      <Outlet />


      {/* <div style={{ display: 'flex', flex: 1 }}>
        <ProfileSidebar /> */}
        {/* <ArticleContent /> */}
        {/* <CreateNewArticle /> */}
        {/* <MaterialUpload/> */}
        {/* <UserProfile/> */}
        {/* <Outlet/>
      </div> */}
    </div>


  )
}

export default Profile
