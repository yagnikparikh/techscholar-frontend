import React from 'react'
import ProfileSidebar from './ProfileSidebar'
import { Outlet } from 'react-router-dom'

function ManageAccount() {
    return (
        <>

            <div style={{ display: 'flex', flex: 1 }}>
                <ProfileSidebar />

                <Outlet />
            </div>

        </>

    )
}

export default ManageAccount
