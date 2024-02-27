
import React from 'react';
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

function Sidebar() {
    const sidebarItems = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 1',
        'Item 2',
        'Item 3', 'Item 1',
        'Item 2',
        'Item 3',
        'Item 1',
        'Item 2',
        'Item 3', , 'Item 1',
        'Item 2',
        'Item 3',
        'Item 1',
        'Item 2',
        'Item 3', 'Item 1',
        'Item 2',
        'Item 3',
        'Item 1',
        'Item 2',
        'Item 3'
        // Add more items as needed
    ];
    return (
        <div className='bg-gray-900' style={{ flex: '0 0 20%', overflowY: 'scroll', height: '100vh' }}>
            {/* Your sidebar content */}
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-gray-900" style={{}}>
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg class="bi me-2" width="40" height="32"></svg>
                    <span class="fs-4">Sidebar</span>
                </a>
                <hr />
                <ul class="nav nav-pills flex-column mb-auto">
                    {sidebarItems.map((item, index) => (
                        <li className='nav-item' key={index}>
                            <a href="#" class="nav-link text-left" aria-current="page" style={navLinkStyle.base}
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
    );
}

export default Sidebar;
