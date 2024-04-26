import React from "react";
import "./Style.css";

const Login = () => {
  const redirectToNav = () => {
    // Implement redirection logic here
  };

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/x-icon"
          href="C:\Users\Asus FX516P 9775\Downloads\LogoOnlySymbol.png"
        />
        <title>Login</title>
      </head>
      <body id="LoginBody">
        <div className="main-login">
          <div className="left-login">
            <h1>
              Gamers don't die.
              <br />
              They respawn.
            </h1>
            <img src="Gaming.svg" className="left-login-image" alt="Gaming" />
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
              <button className="btn-login" onClick={redirectToNav}>
                Login
              </button>
              <div className="reference_signin">
                <p>If you don't have an account,</p>
                <a href="SignIn.html">register</a>
              </div>
            </div>
          </div>
        </div>
        <script src="script.js"></script>
      </body>
    </html>
  );
};

export default Login;
