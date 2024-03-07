import React from 'react'

function ViewArticleHeading({ content, mentorusername, articleGroup, renderNextButton, renderPrevButton, prevArticleHeading, nextArticleHeading }) {
    return (

        <div className='container m-2 '>
            <div className=' bg-inherit'>
                <h1 className='text-left text-4xl'>
                    {content}
                </h1>

                <hr className='mt-2 bg-white' />
                <div className='m-2 flex justify-between'>
                    {renderPrevButton ?
                        <a href={`/${mentorusername}/${articleGroup}/${prevArticleHeading}`}><button className='btn btn-success '>Prev</button></a>
                        :
                        <a><button className='btn btn-success disabled '>Prev</button></a>
                    }
                    {renderNextButton ?
                        <a href={`/${mentorusername}/${articleGroup}/${nextArticleHeading}`}><button className='btn btn-success '>Next</button></a>
                        :
                        <a><button className='btn btn-success disabled '>Next</button></a>
                    }
                </div>
                <hr className='mt-2 bg-white' />
            </div>
        </div>
    )
}

export default ViewArticleHeading
