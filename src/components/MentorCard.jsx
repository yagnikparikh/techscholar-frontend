import React from 'react'
import { Card } from 'react-bootstrap'



function MentorCard() {
    return (
        <div className='row justify-content-between '>
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card m-3 h-auto max-w-xs" style={{ backgroundImage: "url(https://gstatic.com/classroom/themes/Chemistry.jpg)", backgroundSize: 'cover', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
                    <div className="card-body text-white text-left" style={{ flex: '1' }}>
                        <h1 className="text-2xl pr-24 pt-24">Yagnik Parikh</h1>
                        {/* <p className="card-text">Some quick example text to build card's content. Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Button</a> */}
                    </div>
                    <div className="card-footer flex justify-between">
                        <div className="space-x-2">
                            <button className="btn">B1</button>
                            <button className="btn">B2</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card m-3 h-auto max-w-xs" style={{ backgroundImage: "url(https://gstatic.com/classroom/themes/Chemistry.jpg)", backgroundSize: 'cover', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
                    <div className="card-body text-white text-left" style={{ flex: '1' }}>
                        <h1 className="text-2xl pr-24 pt-24">Yagnik Parikh</h1>
                        {/* <p className="card-text">Some quick example text to build card's content. Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Button</a> */}
                    </div>
                    <div className="card-footer flex justify-between">
                        <div className="space-x-2">
                            <button className="btn">B1</button>
                            <button className="btn">B2</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card m-3 h-auto max-w-xs" style={{ backgroundImage: "url(https://gstatic.com/classroom/themes/Chemistry.jpg)", backgroundSize: 'cover', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
                    <div className="card-body text-white text-left" style={{ flex: '1' }}>
                        <h1 className="text-2xl pr-24 pt-24">Yagnik Parikh</h1>
                        {/* <p className="card-text">Some quick example text to build card's content. Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Button</a> */}
                    </div>
                    <div className="card-footer flex justify-between">
                        <div className="space-x-2">
                            <button className="btn">B1</button>
                            <button className="btn">B2</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >







    )
}

export default MentorCard
