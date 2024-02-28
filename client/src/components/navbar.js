import React from "react";
import "../styles/Navbar.css";
import { BoxArrowInRight } from 'react-bootstrap-icons';

function Navbar({ onLogin, loggedIn, onProfileClick, showProfile}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Smartfuel
      </a>
      <div className="nav-links">
        <button className="nav-btn nolog" onClick={onProfileClick}>Cart</button>
        {!showProfile ? (
          <button className="nav-btn nolog" onClick={onProfileClick}>
            Profile
          </button>
        ) : null}
        {!loggedIn ? (
          <button className="nav-btn" onClick={onLogin}>
            <div className="box">
              Login
              <BoxArrowInRight id="arrow" size={15} />
              </div>
          </button>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
