import React, { useEffect, useState } from "react";
import "./styles/App.css";
import AuthContainer from "./components/authContainer";
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Profile from "./components/profile";
import Cart from "./components/cart";

import isValidToken from "./functions/isValidToken";

function App() {
  const [showLogin, setshowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState({});

  const handleLogin = () => {
    setshowLogin(true);
    setShowProfile(false);
    setShowCart(false);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowCart(false);
    setshowLogin(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setShowProfile(false);
    setshowLogin(false);
  };

  useEffect(() => {
    const verify = async () => {
      try {
        const token = localStorage.getItem("token");
        const isValid = await isValidToken(token);
        if (isValid) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }

      } catch (error) {
        setLoggedIn(false);
        console.error("Not logged in", error);
      }
    };

    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/getUser",{
          method: "GET",
          headers: {
          'Authorization': `Bearer ${token}`
          },
        });
        const User = await response.json();
        setUser(User);  
        if(User.isCompleted != true){
          setShowProfile(true);
        }
      } catch (error) {
        console.error("Error getting user", error);
      }
      
    }

    verify();
    getUser();
  }, []);

  return (
    <div className="screen-body">
      <Navbar
        onLogin={handleLogin}
        loggedIn={loggedIn}
        showLogin={showLogin}
        onProfileClick={handleProfileClick}
        showProfile={showProfile}
        onCartClick={handleCartClick}
        showCart={showCart}
      />
      <div className="main-container">
        {showLogin && <AuthContainer loggedIn={loggedIn} />}
        {showProfile && <Profile user = {user} />}
        {showCart && <Cart setShowCart={setShowCart} />}
        {showCart === false && showLogin === false && showProfile === false && (
          <Landing />
        )}
      </div>
    </div>
  );
}

export default App;
