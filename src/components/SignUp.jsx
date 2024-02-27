import React, { useContext, useState } from 'react';

import { Tooltip } from 'react-tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';



function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const {setLoginData} = useContext(AuthContext);
  const navigate = useNavigate();
  const backendEndpoint = 'http://localhost:8080/signup';


  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormErrors({});

    // Validation check
    const errors = {};
    if (!firstName) {
      errors.firstName = 'First name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    }
    if (!userType) {
      errors.userType = 'User type is required';
    }

    // Password matching check
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Additional validation checks (e.g., password strength) can be added here

    if (Object.keys(errors).length > 0) {
      // There are errors, update state to show them
      setFormErrors(errors);
      return;
    }
    // Placeholder for making a POST request to the backend
    // Use the actual API endpoint and library for your application
    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      userType,
    };

    // Make a POST request to the backend API with formData
    // Example using Fetch API
    fetch(backendEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoginData(data);
        console.log('Success:', data);
        navigate("/");
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  return (
    <div>
      <div className="flex justify-center text-white bg-gray-500">
        <div className="w-2/5 my-5" role="document">
          <div className="">
            <div className="bg-gray-900 align-middle flex justify-between py-3 px-4">
              <h5 className="modal-title text-center text-2xl text-fw-semibold " id="exampleModalLongTitle">
                Sign-Up
              </h5>
              <a href="/">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">X</span>
                </button>
              </a>
            </div>
            <div className="modal-body bg-gray-700">
              {/* <!-- Signup Form --> */}
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  {formErrors.firstName && <div className="text-white-500 text-left mx-1  font-bold ">{formErrors.firstName}</div>}
                  <input
                    type="text"
                    className={`form-control w-full px-3 py-4 ${formErrors.firstName ? 'border-red-500 bg-red-300' : ''}`}
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  {formErrors.lastName && <div className="text-white-500 text-left mx-1  font-bold ">{formErrors.lastName}</div>}
                  <input
                    type="text"
                    className={`form-control w-full px-3 py-4 ${formErrors.lastName ? 'border-red-500 bg-red-300' : ''}`}
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  {formErrors.email && <div className="text-white-500 text-left mx-1  font-bold ">{formErrors.email}</div>}
                  <input
                    type="email"
                    className={`form-control w-full px-3 py-4 ${formErrors.email ? 'border-red-500 bg-red-300' : ''}`}
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  {formErrors.password && <div className="text-white-500 text-left mx-1  font-bold ">{formErrors.password}</div>}
                  <div className='flex justify-between items-center m-0'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control w-11/12 px-3 py-4 mr-2 ${formErrors.password ? 'border-red-500 bg-red-300' : ''}`}
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className='w-1/12'>
                  <button
                    className="button border-none"
                    
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <VisibilityIcon className=''/> : <VisibilityOffIcon/>}
                  </button>
                  </div>
                  </div>
                </div>
                <div className="mb-2">
                  {formErrors.confirmPassword && <div className="text-white-500 text-left mx-1  font-bold ">{formErrors.confirmPassword}</div>}
                  <input
                    type="password"
                    className={`form-control w-full px-3 py-4 ${formErrors.confirmPassword ? 'border-red-500 bg-red-300' : ''}`}
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                {formErrors.userType && <div className="text-white-500 text-left mx-1  font-bold ">{formErrors.userType}</div>}
                  <select
                    className={`form-control w-full px-3 py-2 align-middle ${formErrors.userType ? 'border-red-500 bg-red-300' : ''}`}
                    id="userType"
                    onChange={handleUserTypeChange}
                    value={userType}
                  >
                    <option value="" disabled hidden>
                      Select User Type
                    </option>
                    <option value="User">User</option>
                    <option value="Mentor">Mentor</option>
                  </select>
                  
                </div>
                <div className="mb-2">
                  <button type="submit" className="w-full px-3 py-3 btn bg-success text-white align-middle text-2xl fw-bold">
                    Sign Up
                  </button>
                </div>
              </form>
              {/* <!-- End Signup Form --> */}
              {/* <!-- Additional Options: Signup and Forget Password --> */}
              <div className="mt-3 justify-center fw-semibold ">
                <p className="mb-1">
                  Already have an account? <a href="/">Log in</a>
                </p>
                <p className="mb-0">
                  <a href="#">Forgot password?</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;




     


