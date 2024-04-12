import React from 'react'

function ImpNote({content}) {
    return (
        <div>
            <div className='container m-2 my-2'>
                <div className='bg-gray-700 rounded'>

                    <div className="card">
                        <div className="card-body bg-gray-700 rounded">
                            <p className="text-white text-xs font-bold mb-2 text-left mt-0">Important Note</p>
                            <hr className="bg-white" />


                            <div className='flex align-middle mt-2'>
                                <h4 className='text-white mt-1 text-left' dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ImpNote
