import { ThumbsUpDownOutlined } from '@mui/icons-material';
import React from 'react'

import BookmarkIcon from '@mui/icons-material/Bookmark';
import AuthContext from '../context/AuthContext';

function ViewArticleCard({content}) {
    
    
  return (
    <div>
      <a  className="card bg-gray-700 mt-1 text-decoration-none text-light">
            <div className="card-body d-flex justify-between align-items-center ">
            <a href={`${content}`}><div className="card-text text-lg">{content}</div></a>
                <div className="d-flex justify-content-beween">
                    <button className="btn btn-primary mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Save" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <BookmarkIcon />
                    </button>
                    <button  className="btn btn-success  mx-1" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <ThumbsUpDownOutlined />
                    </button>
                </div>
            </div>
            
        </a>
        
    </div>
  )
}

export default ViewArticleCard
