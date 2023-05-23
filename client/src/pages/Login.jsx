import React from "react";
import "./Login.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="login-content">
      <h1 className="loginTitle">Welcome to trip planner</h1>
      <button onClick={() => loginWithRedirect()} className="loginButton">
        Login
      </button>
    </div>
  );
}
