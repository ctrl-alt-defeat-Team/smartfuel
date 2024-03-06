import React, { useEffect, useState } from "react";
import "./styles/App.css";
import AuthContainer from "./components/authContainer";
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Profile from "./components/profile";
import Cart from "./components/cart";

function App() {
  const [showLogin, setshowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleLogin = () => {
    setshowLogin(true);
    setShowProfile(false);
    setShowCart(false); 
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowCart(false);
    setshowLogin(false);
  }

  const handleCartClick = () => {
    setShowCart(true);
    setShowProfile(false);
    setshowLogin(false); 
  }

  return (
    <div className="screen-body">
      <Navbar onLogin={handleLogin} loggedIn={loggedIn} showLogin={showLogin} onProfileClick={handleProfileClick} showProfile={showProfile} onCartClick={handleCartClick} showCart={showCart} />
      <div className="main-container">
        {(showLogin) && <AuthContainer />}
        {(showProfile) && <Profile /> }
        {(showCart) && <Cart />}
        {(showCart == false && showLogin == false && showProfile == false) 
        && <Landing />} 
      </div>
    </div>
  );
}

export default App;
