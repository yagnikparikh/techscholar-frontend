
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const navLinkStyle = {
    base: {
        textDecoration: 'none',
        transition: 'font-weight 0.3s ease, z-index 0.3s ease',
    },
    hover: {
        fontWeight: 'bold',
        zIndex: 1010,
    },
};

function ProfileSidebar() {
    let sidebarItems;

    const { username, userrole, jwtToken, setLoginData } = useContext(AuthContext);

    const [uname, setUname] = useState(username);

    const navigate = useNavigate();


    useEffect(() => {
        console.log("helloiwww"+username);
        setUname(username);
        console.log("    "+uname);
    }, [username]);


    if (uname) {
        if (userrole == "user")
            sidebarItems = ["Liked Articles", "My Courses", "", "4"];
        else
            sidebarItems = ['My Courses', 'My ArticleGroups', 'My Materials'];
    }

    const handelLogout = () => {
        setLoginData({});
        localStorage.clear();
        navigate('/');

    }


    return (
        <div className='bg-gray-900' style={{ flex: '0 0 20%', overflowY: 'scroll', height: '100vh' }}>
            {/* Your sidebar content */}
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-gray-900" style={{}}>
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg class="bi me-2" width="40" height="32"></svg>

                </a>
                <hr />
                <ul class="nav nav-pills flex-column mb-auto">
                    {sidebarItems.map((item, index) => (
                        <li className='nav-item' key={index}>
                            <a href={`/${username}/${item.substring(3).toLowerCase()}`} class="nav-link text-left" aria-current="page" style={navLinkStyle.base}
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

                    <li className='nav-item'>
                        <button class="nav-link text-left" aria-current="page" style={navLinkStyle.base}
                            onMouseOver={(e) => {
                                e.target.style.fontWeight = navLinkStyle.hover.fontWeight;
                                e.target.style.zIndex = navLinkStyle.hover.zIndex;
                            }}
                            onMouseOut={(e) => {
                                e.target.style.fontWeight = 'normal';
                                e.target.style.zIndex = 1000;
                            }}
                            onClick={handelLogout}
                        >
                            Logout
                        </button>
                        <hr className="bg-white" />
                    </li>




                </ul>
                <hr />

            </div>

        </div>
    );
}

export default ProfileSidebar;
