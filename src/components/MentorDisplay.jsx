import React from 'react'
import MentorCard from './MentorCard'
import TopicCerosoal from './TopicCerosoal'
import NavBar from './NavBar'
import Sidebar from './SideBar'

function MentorDisplay() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowX: 'hidden' }}>

      <NavBar />

      <TopicCerosoal />


      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <MentorCard />
       
      </div>
    </div>
  )
}

export default MentorDisplay
