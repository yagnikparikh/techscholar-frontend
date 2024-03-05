import React from 'react'
import { Card } from 'react-bootstrap'
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';



function MentorCard({mentorData}) {
    return (
        
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card m-3 h-auto w-100 border border-black-300" style={{  height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
                    <div className='card-header h-20' style={{backgroundImage: "url(https://gstatic.com/classroom/themes/Chemistry.jpg)", backgroundSize: 'cover'}}>

                    </div>
                    <div className="card-body text-left" style={{ flex: '1' }}>
                        <a href={`${mentorData.username}/profile`} className="text-2xl pr-24 pt-20 text-fw-bold" >{mentorData.firstName} {mentorData.lastName}</a>
                        <p className='text-xs'>Dharmsinh Desai University</p>
                        {/* <p className="card-text">Some quick example text to build card's content. Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Button</a> */}
                    </div>
                    <div className="card-footer flex justify-end mr-0 ">
                        
                            <a href={`/${mentorData.username}/articlegroups`} className="btn mx-2 p-0"><ArticleIcon/></a>
                            <a href={`/${mentorData.username}/materials`} className="btn ml-2 p-0"><FolderIcon/></a>
                        
                    </div>
                </div>
            </div>
            








    )
}

export default MentorCard
