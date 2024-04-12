import React from 'react'

function ArticleParagraph({content}) {
    return (
        <div className='my-3'>
            <div className='container m-2 '>
                <h4 className='text-white mt-1 text-left' style={{ whiteSpace: 'pre-wrap' }} >
                    {/* Your code goes here */}
                    <p dangerouslySetInnerHTML={{ __html: content }} />
                </h4>
            </div>
        </div>
    )
}

export default ArticleParagraph
