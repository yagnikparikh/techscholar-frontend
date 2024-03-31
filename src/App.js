import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AuthContextProvider from './context/AuthContextProvider';
import Profile from './components/Profile';
import Courses from './components/Courses';
import Materials from './components/Materials';
import UserProfile from './components/UserProfile';
import ArticleGroup from './components/MyArticleGroup';
import CreateNewArticleGroup from './components/CreateNewArticleGroup';
import ArticleList from './components/MyArticleList';
import { Article } from '@mui/icons-material';
import ArticleDisplay from './components/ArticleDisplay';
import CreateNewArticle from './components/CreateNewArticle';
import MentorDisplay from './components/MentorDisplay';
import ViewProfile from './components/ViewProfile';
import MyArticleGroup from './components/MyArticleGroup';
import MyMaterials from './components/MyMaterials';
import MyCourses from './components/MyCourses';
import MyProfile from './components/MyProfile';
import ManageAccount from './components/ManageAccount';
import ViewProfileLayout from './components/ViewProfileLayout';
import ViewArticleGroup from './components/ViewArticleGroup';
import ViewArticleList from './components/ViewArticleList';
import ViewArticleDisplay from './components/ViewArticleDisplay';
import ViewArticle from './components/ViewArticle';
import AdminMyArticleGroup from './components/GuidedPathArticleGroup';
import MyArticleList from './components/MyArticleList';
import GuidedPathArticleList from './components/GuidedPathArticleList';
import GuidedPathArticleDisplay from './components/GuidedPathArticleDisplay';
import CreateNewGuidedPathArticle from './components/CreateNewGuidedPathArticle';
import GuidedPathArticleGroup from './components/GuidedPathArticleGroup';
import MaterialUpload from './components/MaterialUpload';
import VideoPlayer from './components/VideoPlayer';
import Course from './components/MyCourse';
import CreateNewCourse from './components/CreateNewCourse';
import MyCourseVideoList from './components/MyCourseVideoList';
import MyCourseMaterial from './components/MyCourseMaterial';
import MyCourseUsers from './components/MyCourseUsers';
import MyCourseDetails from './components/MyCourseDetails';
import AddNewCourseData from './components/AddNewCourseData';
import PlayVideo from './components/PlayVideo';
import CourseDisplay from './components/CourseDisplay';
import PaymentSuccssfull from './components/PaymentSuccssfull';
import ViewCourse from './components/ViewCourse';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" Component={HomePage} />

          <Route path='/video' Component={VideoPlayer}></Route>
          

          <Route path='/admin' Component={ManageAccount}>

            <Route path='my-profile' Component={MyProfile} />
            <Route path='my-courses' Component={MyCourses} />
            <Route path='my-materials' Component={MyMaterials} />
            <Route path='my-articlegroups' Component={GuidedPathArticleGroup} />
            <Route path=":guidedPathTitle/articles" Component={GuidedPathArticleList} />
            <Route path=":guidedPathTitle/create-new-guidedpath-article" Component={CreateNewGuidedPathArticle} />
            <Route path=":guidedPathTitle/:articleHeading" Component={GuidedPathArticleDisplay} />


          </Route>

          <Route path="/:username" Component={Profile}  >



            <Route path="manage-account" Component={ManageAccount}  >
              <Route index Component={MyProfile} />
              <Route path='my-profile' Component={MyProfile} />
              <Route path='my-courses/create-new-course' Component={CreateNewCourse} />

              <Route path='my-courses/:courseTitle' Component={Course} >
                <Route index Component={MyCourseVideoList} />
                <Route path='add-new-video' Component={AddNewCourseData} />
                <Route path='course-videos' Component={MyCourseVideoList} />

                <Route path='course-material' Component={MyCourseMaterial} />
                <Route path='course-users' Component={MyCourseUsers} />
                <Route path='course-details' Component={MyCourseDetails} />
              </Route>
              <Route path='my-courses/:courseTitle/course-video/:courseDataTitle' Component={PlayVideo} />
              <Route path='my-courses' Component={MyCourses} />

              <Route path='my-materials/upload-material' Component={MaterialUpload} />

              <Route path='my-materials' Component={MyMaterials} />
              <Route path='my-articlegroups' Component={MyArticleGroup} />
              <Route path='create-new-articlegroup' Component={CreateNewArticleGroup} />
              <Route path=":articleGroup/articles" Component={MyArticleList} />
              <Route path=":articleGroup/create-new-article" Component={CreateNewArticle} />
              <Route path=":articleGroup/:articleHeading" Component={ArticleDisplay} />
            </Route>



          </Route>
          <Route path="/:mentorusername" Component={Profile}  >
            <Route path="" Component={ViewProfileLayout}  >
              <Route index Component={UserProfile} />
              <Route path='profile' Component={UserProfile} />
              <Route path='courses' Component={Courses} />
              <Route path='materials' Component={Materials} />
              <Route path='articlegroups' Component={ViewArticleGroup} />

            </Route>
          </Route>

          <Route path="/:mentorusername/:articleGroup" Component={ViewArticle}  >

            {/* <Route path=":articleGroup/articles" Component={ViewArticleList} /> */}
            <Route path=":articleHeading" Component={ViewArticleDisplay} />

          </Route>
          <Route path="/signup" Component={SignUp} />
          <Route path="/login" Component={Login} />
          <Route path='/mentors' Component={MentorDisplay} />
          <Route path='/courses' Component={CourseDisplay} />
          <Route path='/courses/:courseTitle/:courseDataTitle' Component={ViewCourse} />
          {/* <Route path='/payment/:courseId' Component={PaymentSuccssfull} /> */}
          
        </Routes>

      </div>
    </AuthContextProvider>
  );
}

export default App;
