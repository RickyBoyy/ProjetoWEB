import React from "react";
import logo from "../images/LogoHorizontal.png";
import "../styles/header.css";

const Header = () => {
  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const redirectToHome = () => {
    window.location.href = "/";
  };
  const redirectToCreateCommunity = () => {
    window.location.href = "/create_community";
  };
  const redirectToCreateEvent = () => {
    window.location.href = "/create_event";
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" className="logo-button" onClick={redirectToHome}>
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>

      <div className="create-community-container">
        <button
          className="create-community-button"
          onClick={redirectToCreateCommunity}
        >
          Create Community
        </button>
      </div>
      <div className="create-event-container">
        <button className="create-event-button" onClick={redirectToCreateEvent}>
          Create Event
        </button>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-button">Search</button>
      </div>
      <div className="login-container">
        <button className="login-button" onClick={redirectToLogin}>
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
