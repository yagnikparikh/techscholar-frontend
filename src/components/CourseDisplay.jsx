import React from 'react'
import NavBar from './NavBar'
import TopicCerosoal from './TopicCerosoal'
import Sidebar from './SideBar'
import ViewAllCourses from './ViewAllCourses'
function CourseDisplay() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowX: 'hidden' }}>

      <NavBar />

      <TopicCerosoal />


      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <ViewAllCourses />
       
      </div>
    </div>
  )
}

export default CourseDisplay
