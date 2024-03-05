import React from 'react'
import ViewProfileSidebar from './ViewProfileSidebar'
import { Outlet } from 'react-router-dom'

function ViewProfileLayout() {
    return (
        <>

            <div style={{ display: 'flex', flex: 1 }}>
                <ViewProfileSidebar />

                <Outlet />
            </div>
            
        </>
    )
}

export default ViewProfileLayout
