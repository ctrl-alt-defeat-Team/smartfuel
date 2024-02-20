import React, { useEffect, useState } from "react";
import "./styles/App.css";
import AuthContainer from "./components/authContainer";
import Navbar from "./components/navbar";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setBackendData(data));
  }, []);

  return (
    <div className="screen-body">
      <Navbar />
      <div className="container">
        <AuthContainer />
      </div>
    </div>
  );
}

export default App;
