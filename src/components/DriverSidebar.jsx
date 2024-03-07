import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const navLinkStyle = {
    base: {
        textDecoration: 'none',
        transition: 'font-weight 0.3s ease, z-index 0.3s ease',
    },
    hover: {
        fontWeight: 'bold',
        zIndex: 1010,
    },
    active: {
        fontWeight: 'bold',
        zIndex: 1010,
        color: 'red', // Add your desired active color here
    }
};


function DriverSidebar({articleList}) {

    const { jwtToken, username } = useContext(AuthContext);
    const { articleGroup, articleHeading, mentorusername } = useParams();
    
    const location = useLocation();

    

    return (
        <div className='bg-gray-900' style={{ flex: '0 0 20%', overflowY: 'scroll', height: '100vh' }}>
            {/* Your sidebar content */}
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-gray-900" >
                <ul class="nav nav-pills flex-column mb-auto">
                    <li className='nav-item '>
                        <a class="text-xl overflow-x-hidden   nav-link text-left" aria-current="page">

                            {articleGroup}
                        </a>
                    </li>
                </ul>
                <hr className='bg-white' />
                <ul class="nav nav-pills flex-column mb-auto">
                    {articleList.map((item, index) => (
                        <li className='nav-item' key={index}>
                            <a href={`/${mentorusername}/${articleGroup}/${item}`} class="nav-link text-left" aria-current="page"
                                style={location.pathname.replace(/%20/g, ' ') === `/${mentorusername}/${articleGroup}/${item}` ?
                                    navLinkStyle.active : navLinkStyle.base}

                                onMouseOver={(e) => {
                                    e.target.style.fontWeight = navLinkStyle.hover.fontWeight;
                                    e.target.style.zIndex = navLinkStyle.hover.zIndex;
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.fontWeight = 'normal';
                                    e.target.style.zIndex = 1000;
                                }}

                            >
                                {item}
                            </a>
                            <hr className="bg-white" />
                        </li>

                    ))}



                </ul>
                <hr />

            </div>

        </div>
    )
}

export default DriverSidebar
