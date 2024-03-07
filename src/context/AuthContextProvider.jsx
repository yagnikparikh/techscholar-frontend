import React, { useEffect, useState } from 'react'
import AuthContext from './AuthContext';

const AuthContextProvider = ({ children }) => {

  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
  const [userrole, setUserrole] = useState(localStorage.getItem('userrole'));

  // useEffect(() => {
  //   // This effect will run when the component mounts and anytime the local storage values change
  //   setUsername(localStorage.getItem('username'));
  //   setJwtToken(localStorage.getItem('jwtToken'));
  //   setUserrole(localStorage.getItem('userrole'));
  // }, []);

  const setLoginData = (data) => {
    // Your authentication logic here
    localStorage.setItem('username', data.username || null);
    localStorage.setItem('userrole', data.userrole || null);
    localStorage.setItem('jwtToken', data.jwtToken || null);
    setUsername(localStorage.getItem('username'));
    setJwtToken(localStorage.getItem('jwtToken'));
    setUserrole(localStorage.getItem('userrole'));

    console.log('from setLoginData : ' + username + jwtToken + userrole);

    // Store data in local storage

  };

  const setLogoutData = () => {


    // Remove data from local storage
    localStorage.removeItem('username');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userrole');

    setUsername(null);
    setJwtToken(null);
    setUserrole(null);
  };



  return (
    <AuthContext.Provider value={{ username, setUsername, jwtToken, setJwtToken, userrole, setUserrole, setLoginData, setLogoutData }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
