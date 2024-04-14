import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import LoginPage from './components/LoginSignup/LoginPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar/><HomePage/></>
    },
    {
      path: '/aboutPage',
      element: <><Navbar/><AboutPage/></>
    },
  ])

  const handleLogin = async () => {};

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <RouterProvider router={router}/>
        </>
      ) : (
        <LoginPage username={username} password={password} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} setIsLoggedIn={setIsLoggedIn}/>
      )}  
    </div>
  );
}

export default App;
