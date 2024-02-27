import React, { useEffect, useState } from "react";
import "./styles/App.css";
import AuthContainer from "./components/authContainer";
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Profile from "./components/profile";

function App() {
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogin = () => {
    setLogin(true);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  }

  return (
    <div className="screen-body">
      <Navbar onLogin={handleLogin} loggedIn={login} />
      <div className="main-container">
        {login ? <AuthContainer /> : <Landing />}
      </div>
    </div>
  );
}

export default App;
