import React, {useState} from 'react';
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import './LoginSignup.css';

function LoginPage({ username, password, setUsername, setPassword, setEmail, handleLogin, setIsLoggedIn }) {

  const [action, setAction] = useState('Login');

  console.log(username, " ", password);

  const handleLoginButtonClicked = async () => {

    setAction("Login");

    if(action === 'Login'){
      handleLogin();
      console.log("Login performed");
      const url = 'http://localhost:8080/api/v1/public/auth/validate';
    const data = {
      username: username,
      password: password
    };

    try {
      const response = await fetch(url, {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if(response.ok){
        const responseData = await response.json();
        if(responseData.status === "Success"){
          console.log("Login Successful")
          setIsLoggedIn(true);
        }
        if(responseData.status === "Fail"){
          console.log("Login Failed");
          alert("Login Failed. Please enter correct username or password");
        }
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
    }
  }

  const handleSignUpButtonClicked = () => {
    setAction("Sign Up");

    if(action === 'Sign Up'){
      console.log("Sign Up performed")
    }
  }

  return(
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src = {user_icon} alt="" />
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        </div>

        {action === "Login" ? <div></div> : <div className="input">
          <img src={email_icon} alt=""/>
          <input type="email" placeholder="Email Id" onChange={(e) => setEmail(e.target.value)}/>
        </div>}

        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
      </div>
      {action === "Sign Up" ? <div></div> : <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray":"submit"} onClick={handleSignUpButtonClicked}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray":"submit"} onClick={handleLoginButtonClicked}>Login</div>
      </div>
    </div>
  )
}

export default LoginPage;
