import React from 'react'
import CourseCards from './CourseCards'
import AddIcon from '@mui/icons-material/Add';

function MyCourses() {
  return (
    <div className='bg-gray-800 text-white text-justify relative' style={{ whiteSpace: 'pre-wrap', flex: '1', height: '100vh', padding: '20px', overflowY: 'scroll', overflowX: 'hidden' }}>
      <div className='container m-2 bg-inherit '>
        <a href='my-courses/create-new-course' className="card bg-gray-700 mt-1 text-decoration-none ">
          <div className="card-body">
            <h1 className="card-text text-xl align-middle"> <AddIcon className='align-middle' /> Create New Course</h1>
          </div>
        </a>
        <CourseCards />
      </div>
    </div>
  )
}

export default MyCourses
