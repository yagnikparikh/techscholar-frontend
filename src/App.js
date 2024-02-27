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
import ArticleGroup from './components/ArticleGroup';
import CreateNewArticleGroup from './components/CreateNewArticleGroup';
import ArticleList from './components/ArticleList';
import { Article } from '@mui/icons-material';
import ArticleDisplay from './components/ArticleDisplay';
import CreateNewArticle from './components/CreateNewArticle';
import MentorDisplay from './components/MentorDisplay';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" Component={HomePage} />

          <Route path="/:username" Component={Profile}  >
            <Route index Component={UserProfile} />
            <Route index path='profile' Component={UserProfile} />
            <Route path='courses' Component={Courses} />
            <Route path='create-new-articlegroup' Component={CreateNewArticleGroup} />
            <Route path='articlegroups' Component={ArticleGroup} /> 
            <Route path='materials' Component={Materials} />
            <Route path=":articleGroup/articles" Component={ArticleList} />
            <Route path=":articleGroup/create-new-article" Component={CreateNewArticle} />
            <Route path=":articleGroup/:articleHeading" Component={ArticleDisplay} />
            
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
