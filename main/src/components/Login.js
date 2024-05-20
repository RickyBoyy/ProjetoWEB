import React from "react";
import "../App.css";


const Login = () => {
  const redirectToHome = () => {
    window.location.href = "/";
  };
  const redirectToRegister = () => {
    window.location.href = "/register";
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
          src="../Login_animation2.svg"
          className="left-login-image"
          alt="Gaming"
        />
      </div>
      <div className="right-login">
        <form className="card-login" action="/Login" method="post">
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
          <button className="btn-login" type="submit">Login</button>
          
          <div className="reference_signin">
            <p>If you don't have an account,</p>
            <a onClick={redirectToRegister} style={{ cursor: "pointer" }}>
              register.
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
