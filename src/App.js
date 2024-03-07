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

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" Component={HomePage} />

          {/* <Route path='/admin' Component={}>

          <Route path='my-profile' Component={MyProfile} />
              <Route path='my-courses' Component={MyCourses} />
              <Route path='my-materials' Component={MyMaterials} />
              <Route path='my-articlegroups' Component={MyArticleGroup} />

          </Route> */}

          <Route path="/:username" Component={Profile}  >



            <Route path="manage-account" Component={ManageAccount}  >
              <Route index Component={MyProfile} />
              <Route path='my-profile' Component={MyProfile} />
              <Route path='my-courses' Component={MyCourses} />
              <Route path='my-materials' Component={MyMaterials} />
              <Route path='my-articlegroups' Component={MyArticleGroup} />
              <Route path='create-new-articlegroup' Component={CreateNewArticleGroup} />
              <Route path=":articleGroup/articles" Component={ArticleList} />
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
        </Routes>

      </div>
    </AuthContextProvider>
  );
}

export default App;
