import React from 'react'

function ArticleHeading({content}) {
    return (

        <div className='container m-2 '>
            <div className=' bg-inherit'>
                <h1 className='text-left text-4xl'>
                    {content}
                </h1>
                
                <hr className='mt-2 bg-white' />
            </div>
        </div>
    )
}

export default ArticleHeading
