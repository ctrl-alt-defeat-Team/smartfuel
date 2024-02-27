import React from "react";
import "../styles/Auth.css";
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState(false)


  
  const LoginUser = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    console.log(response);
    if (response.ok) {
        const data = await response.json();
        const { token } = data;
        setLoginState(true);
        localStorage.setItem('token', token);
        console.log('Login successful');
      //  setIsLoggedIn(true);
    } else {    
        console.error('Login failed');
        console.log(response);
    }
    } catch (error) {
    console.error('Error during login:', error);
    }
    };


  return (
    <div>
      <h3>Login with your Smartfuel account</h3>
      <form className="auth-form">
        <div className="form-group">
          <input
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn-submit" onClick={LoginUser}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
