import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import "./AuthForm.css";

export default function AuthForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState(""); // New state for first name
  const [lastName, setLastName] = useState(""); // New state for last name
  const [email, setEmail] = useState(""); // New state for email

  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin
    ? "Need an account? Register here."
    : "Already have an account? Login here.";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();
  const [register, { isLoading: registerLoading, error: registerError }] =
    useRegisterMutation();

  const attemptAuth = async (evt) => {
    evt.preventDefault();

    const authMethod = isLogin ? login : register;
    //const credentials = { username, password, firstName, lastName, email };
    const LoginCredentials = { username, password };
    const RegisterCredential = {
      username,
      password,
      firstName,
      lastName,
      email,
    };

    try {
      let credentials = {}; // create an empty credential
      // when login, we only need to send in username and password
      // while register, we send in username, password along with other info
      isLogin
        ? (credentials = LoginCredentials)
        : (credentials = RegisterCredential);
      await authMethod(credentials).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="login-div">
      <h1>{authAction}</h1>
      <form onSubmit={attemptAuth} id="loginForm">
        <label className="username-label">
          Username
          <input
            className="loginInput"
            id="usernameInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label className="password-label">
          Password
          <input
            className="loginInput"
            id="passwordInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        {/* Display additional fields for registration */}
        {!isLogin && (
          <div className="otherFields">
            <label className="firstname-label">
              First Name
              <input
                className="loginInput"
                id="firstnameInput"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="lastname-label" id="lastname">
              Last Name
              <input
                className="loginInput"
                id="lastnameInput"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="email-label">
              Email
              <input
                className="loginInput"
                id="emailInput"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
          </div>
        )}

        <button className="loginBtn">{authAction}</button>
      </form>
      <a className="needAccount-text" onClick={() => setIsLogin(!isLogin)}>
        {altCopy}
      </a>

      {(loginLoading || registerLoading) && <p>Please wait...</p>}
      {loginError && <p role="alert">{loginError}</p>}
      {registerError && <p role="alert">{registerError}</p>}
    </div>
  );
}
