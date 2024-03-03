import React, { useEffect, useState } from "react";
import "./styles/App.css";
import AuthContainer from "./components/authContainer";
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Profile from "./components/profile";
import Cart from "./components/cart";

function App() {
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleLogin = () => {
    setLogin(true);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  }

  const handleCartClick = () => {
    setShowCart(!showCart);
  }

  return (
    <div className="screen-body">
      <Navbar onLogin={handleLogin} loggedIn={login} onProfileClick={handleProfileClick} showProfile={showProfile} onCartClick={handleCartClick} showCart={showCart} />
      <div className="main-container">
        {login ? <AuthContainer /> : showProfile ? <Profile /> : showCart ? <Cart /> : <Landing />} 
      </div>
    </div>
  );
}

export default App;
