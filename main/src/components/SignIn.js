import React from "react";
import "./Style.css"; // Import your CSS file here

const SignIn = () => {
  const redirectToTags = () => {
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
        <title>Sign In</title>
      </head>
      <body id="Registerbody">
        <div className="main_register">
          <div className="left_register">
            <div className="card_register">
              <h1>Dive in!!</h1>
              <div className="textfield_register_username">
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  name="Username"
                  placeholder="Username"
                  maxLength="12"
                />
              </div>
              <div className="textfield_email">
                <label htmlFor="E-mail">E-mail</label>
                <input type="text" name="E-mail" placeholder="E-mail" />
              </div>
              <div className="textfield_register_password">
                <label htmlFor="Password">Password</label>
                <input type="password" name="Password" placeholder="Password" />
              </div>
              <div className="textfield_confirm_password">
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <button className="btn_register" onClick={redirectToTags}>
                Register
              </button>
            </div>
          </div>
          <div className="right_register">
            <h1>Join and talk about your favorite game!</h1>
          </div>
        </div>
        <script src="tag.js"></script>
      </body>
    </html>
  );
};

export default SignIn;
