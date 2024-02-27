import React, { useEffect, useState } from "react";
import "./styles/App.css";
import AuthContainer from "./components/authContainer";
import Navbar from "./components/navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="screen-body">
      <Navbar onLogin={handleLogin} loggedIn={loggedIn} />
      <div className="main-container">
        {loggedIn ? <AuthContainer /> : null}
      </div>
    </div>
  );
}

export default App;
