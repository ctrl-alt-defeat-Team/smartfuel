import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import {
  BoxArrowInRight,
  Dash,
  DatabaseFillDash,
  DatabaseFillLock,
} from "react-bootstrap-icons";
import Dashboard from "./dashboard";

function Navbar({
  onLogin,
  onLogout,
  loggedIn,
  showLogin,
  onProfileClick,
  showProfile,
  onCartClick,
  showCart,
  isAdmin,
  onDashboardClick,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     window.location.reload();
  //   };

  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Smartfuel
      </a>
      <div className="nav-links">
        {window.innerWidth >= 420 && (
          <>
            {!showCart && (
              <button className="nav-btn nolog" onClick={onCartClick}>
                <div className="box">
                  Cart
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-basket basket"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
                  </svg>
                </div>
              </button>
            )}
            {!showProfile && loggedIn && (
              <button className="nav-btn nolog" onClick={onProfileClick}>
                <div className="box">
                  Profile
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-circle prof"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </div>
              </button>
            )}
            {!loggedIn && !showLogin && (
              <button className="nav-btn" onClick={onLogin}>
                <div className="box">
                  Login
                  <BoxArrowInRight id="arrow" size={15} />
                </div>
              </button>
            )}
            {loggedIn && (
              <button className="nav-btn" onClick={onLogout}>
                <div className="box">
                  Logout
                  <BoxArrowInRight id="arrow" size={15} />
                </div>
              </button>
            )}
            {isAdmin && (
              <button className="nav-btn" onClick={onDashboardClick}>
                Dashboard <DatabaseFillLock size={15} />
              </button>
            )}
          </>
        )}

        {showDropdown && (
          <div className="dropdown">
            {!showCart && (
              <button className="nav-btn nolog" onClick={onCartClick}>
                <div className="box">
                  Cart
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-basket basket"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
                  </svg>
                </div>
              </button>
            )}

            {!showProfile && (
              <button className="nav-btn nolog" onClick={onProfileClick}>
                <div className="box">
                  Profile
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-circle prof"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </div>
              </button>
            )}

            {!loggedIn && !showLogin && (
              <button className="nav-btn" onClick={onLogin}>
                <div className="box">
                  Login
                  <BoxArrowInRight id="arrow" size={15} />
                </div>
              </button>
            )}
          </div>
        )}
        {window.innerWidth < 420 && (
          <>
            <button
              className="nav-btn dropdown-btn"
              onClick={handleDropdownClick}
            >
              <div className="box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
