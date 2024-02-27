import React from "react";
import "../styles/Auth.css";

function Register() {
  return (
    <div>
      <h3>Register to gain access to Smartfuel</h3>
      <form className="auth-form">
        <div className="form-gr">
          <input
            placeholder="Username"
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div className="form-gr">
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <div className="form-gr">
          <input
            placeholder="Confirm Password"
            type="password"
            id="confirm-password"
            name="confirm-password"
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
