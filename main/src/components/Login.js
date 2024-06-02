import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import "../App.css";
import Lottie from "lottie-react";
import animationData from "../images/GhostyLogin.json";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext); // Add this line

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: username,
          user_password: password,
        }),
      });

      if (response.ok) {
        const userData = await response.json(); // Assuming server responds with user data
        alert("Login successful!");
        loginUser(userData); // Update user state in context
        window.location.href = "/"; // Redirect to home page
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
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
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: 400, height: 400 }}
        />
      </div>
      <div className="right-login">
        <form className="card-login" onSubmit={handleSubmit}>
          <h1>Welcome back!!</h1>
          <div className="textfield-login">
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              name="Username"
              placeholder="Username"
              maxLength="15"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="textfield-login">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn-login" type="submit">
            Login
          </button>

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
