import React, { useEffect, useState } from "react";
import "./styles/App.css";
import AuthContainer from "./components/authContainer";
import Navbar from "./components/navbar";
import Profile from "./components/profile";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  }

  return (
    <div className="screen-body">
      <Navbar onLogin={handleLogin} loggedIn={loggedIn} onProfileClick={handleProfileClick} showProfile={showProfile}/>
      <div className="container">
        {loggedIn ? <AuthContainer /> : null}
        {showProfile ? <Profile /> : null}</div>
    </div>
  );
}

export default App;
