import React, { useEffect, useState } from "react";
import "./styles/App.css";
import AuthContainer from "./components/authContainer";
import Navbar from "./components/navbar";
import Contact from "./components/contact";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleContactClick = () => {
    setShowContact(!showContact);
  }

  return (
    <div className="screen-body">
      <Navbar onLogin={handleLogin} loggedIn={loggedIn} onContactClick={handleContactClick} showContact={showContact}/>
      <div className="container">
        {loggedIn ? <AuthContainer /> : null}
        {showContact ? <Contact /> : null}</div>
    </div>
  );
}

export default App;
