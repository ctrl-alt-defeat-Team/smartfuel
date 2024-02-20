import React from "react";
import "../styles/Navbar.css";

function Navbar({ onLogin, loggedIn }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Smartfuel
      </a>
      <div className="nav-links">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        {!loggedIn ? (
          <button className="nav-btn" onClick={onLogin}>
            Login
          </button>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
