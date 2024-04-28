import React from "react";
import logo from "../images/LogoHorizontal.png";
import "../App.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="login-container">
        <button className="login-button">Login</button>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-button">Search</button>
      </div>
    </header>
  );
};

export default Header;
