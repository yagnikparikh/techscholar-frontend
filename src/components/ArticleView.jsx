import React from 'react'
import DriverSidebar from './DriverSidebar'
import ViewArticleDisplay from './ViewArticleDisplay'

function ViewArticle() {

    

    
    return (
        <>

            <div style={{ display: 'flex', flex: 1 }}>
                <DriverSidebar  />

                <ViewArticleDisplay />
            </div>

        </>
    )
}

export default ViewArticle
