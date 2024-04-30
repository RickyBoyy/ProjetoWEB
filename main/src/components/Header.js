import React from "react";
import logo from "../images/LogoHorizontal.png";
import "../App.css";

const Header = () => {
  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const redirectToHome = () => {
    window.location.href = "/";
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" className="logo-button" onClick={redirectToHome}>
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>
      <div className="login-container">
        <button className="login-button" onClick={redirectToLogin}>
          Login
        </button>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-button">Search</button>
      </div>
    </header>
  );
};

export default Header;
