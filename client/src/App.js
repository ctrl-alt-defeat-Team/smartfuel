import React, { useEffect, useState } from "react";
import "./styles/App.css";
import AuthContainer from "./components/authContainer";
import Navbar from "./components/navbar";
import Landing from "./components/landing";

function App() {
  const [login, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <div className="screen-body">
      <Navbar onLogin={handleLogin} loggedIn={login} />
      <div className="main-container">
        {login ? <AuthContainer /> : <Landing />}
      </div>
    </div>
  );
}

export default App;
