import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setBackendData(data));
  }, []);

  return (
    <div>
      <h1>Backend Data</h1>
      <ul>
        {backendData.users &&
          backendData.users.map((user, i) => <li key={i}>{user}</li>)}
      </ul>
    </div>
  );
}

export default App;
