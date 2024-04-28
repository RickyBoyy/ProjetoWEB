import React from "react";
import "../App.css";

const Login = () => {
  const redirectToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="main-login">
      <div className="left-login">
        <h1>
          Gamers don't die.
          <br />
          They respawn.
        </h1>
        <img
          src="../animations/Login_animation.svg"
          className="left-login-image"
          alt="Gaming"
        />
      </div>
      <div className="right-login">
        <div className="card-login">
          <h1>Welcome back!!</h1>
          <div className="textfield-login">
            <label htmlFor="usuario">Username</label>
            <input
              type="text"
              name="Username"
              placeholder="Username"
              maxLength="15"
            />
          </div>
          <div className="textfield-login">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <button className="btn-login" onClick={redirectToHome}>
            Login
          </button>
          <div className="reference_signin">
            <p>If you don't have an account,</p>
            <a href="SignIn.html">register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
