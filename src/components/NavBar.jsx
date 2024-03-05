import React, { useContext, useEffect, useState } from 'react';
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

  const { username, jwtToken } = useContext(AuthContext);

  const [uname, setUname] = useState(username);

  useEffect(() => {
    console.log("helloiwww" + username);
    setUname(username);
    
    console.log("    "+uname);
  }, [username]);







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
          <li
            className="nav-item dropdown"
            onMouseEnter={() => setTutorialDropdownVisible(true)}
            onMouseLeave={() => setTutorialDropdownVisible(false)}
          >
            <a
              className={`nav-link active dropdown-toggle`}
              href="#"
              id="navbarDropdown1"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Tutorials
            </a>
            <div
              className={`dropdown-menu ${tutorialDropdownVisible ? 'show' : ''}`}
              aria-labelledby="navbarDropdown1"
            >
              {tutorials.map((item, index) => (
                <a className="dropdown-item" href="#" key={index}>
                  {item}
                </a>
              ))}
            </div>
          </li>
          <li
            className="nav-item dropdown"
            onMouseEnter={() => setExerciseDropdownVisible(true)}
            onMouseLeave={() => setExerciseDropdownVisible(false)}
          >
            <a
              className={`nav-link active dropdown-toggle`}
              href="#"
              id="navbarDropdown2"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Exercise
            </a>
            <div
              className={`dropdown-menu ${exerciseDropdownVisible ? 'show' : ''}`}
              aria-labelledby="navbarDropdown2"
            >
              {tutorials.map((item, index) => (
                <a className="dropdown-item" href="#" key={index}>
                  {item}
                </a>
              ))}
            </div>
          </li>
          <li
            className="nav-item dropdown"
            onMouseEnter={() => setMentorDropdownVisible(true)}
            onMouseLeave={() => setMentorDropdownVisible(false)}
          >
            <a
              className={`nav-link active  dropdown-toggle`}
              href="#"
              id="navbarDropdown3"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Mentors
            </a>
            <div
              className={`dropdown-menu ${mentorDropdownVisible ? 'show' : ''}`}
              aria-labelledby="navbarDropdown3"
            >
              {mentors.map((item, index) => (
                <a className="dropdown-item" href="#" key={index}>
                  {item}
                </a>
              ))}
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link active " href="#">
              Courses
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <div className='nav-item'>
          {uname===null ?
            <a className="nav-link active" href='/login'>

              <button className="btn btn-success  my-2 my-sm-0" data-toggle="modal" ata-toggle="modal" data-target="#exampleModalCenter">
                login 
              </button>
            </a>
            :
            <a className="nav-link active" href={`/${uname}/manage-account/my-profile`}>

              <button className="btn btn-success  my-2 my-sm-0" data-toggle="modal" ata-toggle="modal" data-target="#exampleModalCenter">
                Profile
              </button>
            </a>



          }
        </div>

      </div>



    </nav >
  );
}

export default NavBar;
