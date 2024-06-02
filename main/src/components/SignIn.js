import React, { useState } from "react";
import "../App.css";
import Lottie from "lottie-react";
import animationData from "../images/SignUpAnimation.json";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayname, setDisplayName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      try {
        const response = await fetch("http://localhost:4000/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name: username,
            user_email: email,
            user_password: password,
            user_displayname: displayname,
          }),
        });

        if (response.ok) {
          alert("Registration successful!");
          window.location.href = "/tags";
        } else {
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.error}`);
        }
      } catch (error) {
        alert(`Registration failed: ${error.message}`);
      }
    }
  };

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="main_register">
      <div className="left_register">
        <div className="card_register">
          <h1>Dive in!!</h1>
          <form onSubmit={handleSubmit}>
            <div className="textfield_register_username">
              <label htmlFor="Username">Username</label>
              <input
                type="text"
                name="Username"
                placeholder="Username"
                maxLength="12"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="textfield_email">
              <label htmlFor="Email">E-mail</label>
              <input
                type="email"
                name="Email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="textfield_displayname">
              <label htmlFor="DisplayName">Display Name</label>
              <input
                type="text"
                name="DisplayName"
                placeholder="Display Name"
                value={displayname}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="textfield_register_password">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                name="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="textfield_confirm_password">
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <input
                type="password"
                name="ConfirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn_register">
              Register
            </button>
          </form>
          <div className="reference_signin">
            <p>If you already have an account,</p>
            <a onClick={redirectToLogin} style={{ cursor: "pointer" }}>
              login.
            </a>
          </div>
        </div>
      </div>
      <div className="right_register">
        <h1>Join and talk about your favorite game!</h1>
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: 450, height: 450 }}
        />
      </div>
    </div>
  );
};

export default SignIn;
