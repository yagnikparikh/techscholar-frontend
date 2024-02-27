import {React} from 'react'
import NavBar from './NavBar'
import TopicCerosoal from './TopicCerosoal'
import ArticleContent from './ArticleContent'
import Sidebar from './SideBar'
import CreateNewArticle from './CreateNewArticle'
import MaterialUpload from './MaterialUpload'

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' ,overflowX:'hidden'}}>

        <NavBar />

        <TopicCerosoal />   
      
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        {/* <ArticleContent /> */}
        <CreateNewArticle />
        {/* <MaterialUpload/> */}
      </div>
    </div>
  )
}

export default HomePage
