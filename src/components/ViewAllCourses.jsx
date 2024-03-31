import React from 'react'
import ViewCourseCards from './ViewCourseCards'
import AddIcon from '@mui/icons-material/Add';
function ViewAllCourses() {
  return (
    <div className='bg-gray-800 text-white text-justify relative' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
      <div className='container m-2 bg-inherit '>
        
        <ViewCourseCards />
      </div>
    </div>
  )
}

export default ViewAllCourses
