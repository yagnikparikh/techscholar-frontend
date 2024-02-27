import React, { useContext, useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';



function Login() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMentor, setIsMentor] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {setLoginData} = useContext(AuthContext);
  const backendEndpoint = 'http://localhost:8080/login';


  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleCheckboxChange = (event) => {
    setIsMentor(event.target.checked);
    console.log(isMentor);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();

    setFormErrors({});

    // Validation check
    const errors = {};
   
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
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
      email,
      password,
      isMentor
    };

    console.log(formData);

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
        console.log('hello');
        console.error('Error:', error);
        // Handle error
      });
  };

  return (
    <div className='vh-100 vw-100 bg-gray-500  align-middle'>
      <div className="flex justify-center text-white ">
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
              {/* <!-- Login Form --> */}
              <form onSubmit={handleSubmit}>
                
                  
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

                <div class="mb-2 justify-start">
                      <input type="checkbox" class=" form-check-input" id="remember" checked={isMentor} 
                      onChange={handleCheckboxChange}
                       />
                      <label class="form-check-label" for="remember">Mentor Account?</label>
                </div>
                
                
                <div className="mb-2">
                  <button type="submit" className="w-full px-3 py-3 btn bg-success text-white align-middle text-2xl fw-bold">
                    Login
                  </button>
                </div>
              </form>
              {/* <!-- End Login Form --> */}
              {/* <!-- Additional Options: Login and Forget Password --> */}
              <div className="mt-3 justify-center fw-semibold ">
                <p className="mb-1">
                  Don't have account ? <a href="/signup">Create New Account</a>
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

export default Login;

