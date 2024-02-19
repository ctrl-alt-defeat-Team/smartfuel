import React from "react";
import "../styles/Auth.css";

function Login() {
  return (
    <div>
      <h3>Login with your Smartfuel account</h3>
      <form className="auth-form">
        <div className="form-group">
          <input
            placeholder="Username"
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
