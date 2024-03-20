import React, { useEffect, useState } from "react";
import "./styles/App.css";
import AuthContainer from "./components/authContainer";
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Profile from "./components/profile";
import Cart from "./components/cart";
import Dashboard from "./components/dashboard";

import isValidToken from "./functions/isValidToken";

function App() {
  const [showLogin, setshowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLogin = () => {
    setshowLogin(true);
    setShowProfile(false);
    setShowCart(false);
    setShowDashboard(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowCart(false);
    setshowLogin(false);
    setShowDashboard(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setShowProfile(false);
    setshowLogin(false);
    setShowDashboard(false);
  };

  const handleDashboardClick = () => {
    setShowDashboard(true);
    setShowCart(false);
    setShowProfile(false);
    setshowLogin(false);
  };

  useEffect(() => {
    const verify = async () => {
      try {
        console.log(process.env.REACT_APP_API_URL);
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
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/getUser`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const User = await response.json();
        setUser(User);
        setIsAdmin(User.admin);
        console.log(User.admin);
        if (User.isCompleted !== true) {
          setShowProfile(true);
        }
      } catch (error) {
        console.error("Error getting user", error);
      }
    };

    verify();
    getUser();
    if(loggedIn === false) {
      setShowProfile(false);
      setShowCart(false);
      setshowLogin(false);
      setShowDashboard(false);
    }
  }, []);

  return (
    <div className="screen-body">
      <Navbar
        onLogin={handleLogin}
        onLogout={handleLogout}
        loggedIn={loggedIn}
        showLogin={showLogin}
        onProfileClick={handleProfileClick}
        showProfile={showProfile}
        onCartClick={handleCartClick}
        showCart={showCart}
        isAdmin={isAdmin}
        onDashboardClick={handleDashboardClick}
      />
      <div className="main-container">
        {showLogin && <AuthContainer loggedIn={loggedIn} />}
        {showProfile && <Profile user={user} />}
        {showCart && <Cart setShowCart={setShowCart} isAdmin={showDashboard} />}
        {showDashboard && <Dashboard />}
        {showCart === false &&
          showLogin === false &&
          showProfile === false &&
          showDashboard === false && <Landing />}
      </div>
    </div>
  );
}

export default App;
