import React from "react";
import Login from "./login";
import Register from "./register";
import "../styles/Auth.css";
import { useState } from "react";

function AuthContainer({loggedIn}) {
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(true);

  const handleClickLogin = () => {
    setLogin(true);
    setRegister(false);
  };

  const handleClickRegister = () => {
    setRegister(true);
    setLogin(false);
  };

  return (
    <div className="authContainer">
      <div className="btn-container">
        <button
          className={showLogin ? "btn btn-left btn-active" : "btn btn-left"}
          onClick={handleClickLogin}
        >
          Login
        </button>
        <button
          className={
            showRegister ? "btn btn-right btn-active" : "btn btn-right"
          }
          onClick={handleClickRegister}
        >
          Register
        </button>
      </div>
      <div className="form-container">
        {showLogin && <Login loggedIn={loggedIn}/>}
        {showRegister && <Register />}
      </div>
    </div>
  );
}

export default AuthContainer;
