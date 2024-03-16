import React, { useContext } from 'react'
import ReactPlayer from 'react-player'
import AuthContext from '../context/AuthContext';

function VideoPlayer() {

    const {username,jwtToken} = useContext(AuthContext);
    const backendEndpoint="http://localhost:8080/public/video/video1";
    const thumbnailUrl="https://i.ytimg.com/vi/fRCndnyrmG4/maxresdefault.jpg";
  return (
    <div class="container mt-5">
    <h2>Video streaming</h2>
    {/* <video src="http://localhost:8080/public/video/video1" width="720px" height="480px" controls preload="none"> */}
    
    {/* </video> */}
    <ReactPlayer
        className='react-player'
        url={backendEndpoint}
        light={thumbnailUrl}
        width="720px" height="480px"
        controls={true}
      />



</div> 
  )
}

export default VideoPlayer
