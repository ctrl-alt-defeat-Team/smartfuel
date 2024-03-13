import React from "react";
import "../styles/Auth.css";
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const RegisterUser = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, confirmPassword }),
        });

        if (response.ok) {
          console.log("OK");
          window.location.reload(false);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.error("Error is:", error);
      }
    }
  };

  return (
    <div>
      <h3>Register to gain access to Smartfuel</h3>
      <form onSubmit={RegisterUser} className="auth-form">
        <div className="form-gr">
          <input
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-gr">
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-gr">
          <input
            placeholder="Confirm Password"
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
