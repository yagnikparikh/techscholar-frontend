import React, { useContext, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AuthContext from '../context/AuthContext';

function NavBar() {
  const tutorials = ['HTML', 'CSS', 'JS', 'Java', 'CP'];
  const mentors = ['SRS', 'AKP', 'DCV', 'ABC', 'XYZ'];

  // State to manage the visibility of each dropdown
  const [tutorialDropdownVisible, setTutorialDropdownVisible] = useState(false);
  const [exerciseDropdownVisible, setExerciseDropdownVisible] = useState(false);
  const [mentorDropdownVisible, setMentorDropdownVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const { username, jwtToken, userrole } = useContext(AuthContext);

  const [uname, setUname] = useState(username);
  const isLoggedIn = username !== null;


  useEffect(() => {
    console.log("helloiwww" + username);
    setUname(username);
    console.log("userrole " + userrole);
    console.log("isLoggedIn " + userrole);

    console.log("    " + uname);
  }, [username]);

  useEffect(() => {
    const setDropdownWidth = () => {
      const inputField = document.querySelector('.form-control');
      if (inputField) {
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        const inputWidth = inputField.offsetWidth + 'px';
        dropdownItems.forEach(item => {
          item.style.width = inputWidth;
        });
      }
    };

    setDropdownWidth(); // Call the function once after the component mounts
  }, []);

  const getSearchResult = (e) => {
    e.preventDefault();
    const storedToken = jwtToken;
    console.log("jwtToken " + storedToken)

   
    fetch(`http://localhost:8080/public/search-result`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchTerm),
    })
      .then(response => response.json())
      .then(data => {
        // Update the state with the fetched data
        console.log('Search Data' + data);
        console.log(data);
        setSearchResults(data.list);
        inputRef.current.focus();
        // setCourseSubscibers(data.courseSubscibers.map);
      })
      .catch(error => console.error('hello Error:', error));
  }



  return (
    <nav className="p-4 navbar navbar-expand-lg navbar-dark bg-gray-900 ">
      <a className="navbar-brand" href="#">
        TechScholar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
         
          <li className="nav-item">
            <a className="nav-link active " href="/guided-paths">
              GuidedPaths
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active " href="/mentors">
              Mentors
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active " href="/courses">
              Courses
            </a>
          </li>
        </ul>
        <div style={{ position: 'relative' }}>
          <form  className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              ref={inputRef}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => setSearchResults([])}
            />

            <button onClick={getSearchResult} className="btn btn-primary bg-transparent  my-2 my-sm-0" >
              Search
            </button>

          </form>
          <div
            className={`dropdown-menu ${searchResults.length != 0 ? 'show' : ''}`}
            style={{ position: 'absolute', top: '100%', left: 0 }}
            aria-labelledby="Search"
          >
            {searchResults.map((item, index) => (
              <a className="dropdown-item " href={item.link} key={index}>
                <strong>{item.title}</strong>
                <br></br>
                <small className='mt-0'>{item.type}</small>
              </a>
            ))}
          </div>

        </div>

        <div className='nav-item'>
          {
            userrole === "[ADMIN]" ? <a className="nav-link active" href='/admin/my-profile'>

              <button className="btn btn-success  my-2 my-sm-0" data-toggle="modal" ata-toggle="modal" data-target="#exampleModalCenter">
                Admin Panel
              </button>
            </a>
              :
              uname !== null ?

                <a className="nav-link active" href={`/${username}/manage-account/my-profile`}>

                  <button className="btn btn-success  my-2 my-sm-0" data-toggle="modal" ata-toggle="modal" data-target="#exampleModalCenter">
                    Profile
                  </button>
                </a>
                :
                <a className="nav-link active" href='/login'>

                  <button className="btn btn-success  my-2 my-sm-0" data-toggle="modal" ata-toggle="modal" data-target="#exampleModalCenter">
                    login
                  </button>
                </a>
          }
        </div>

      </div>



    </nav >
  );
}

export default NavBar;
