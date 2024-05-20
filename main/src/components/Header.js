import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import GlobalApi from "../Services/GlobalApi";
import logo from "../images/LogoHorizontal.png";
import "../styles/header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchQuery}`);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery) {
        try {
          const response = await GlobalApi.searchSuggestions(searchQuery);
          if (response && response.results) {
            setSuggestions(response.results);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

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
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => {
                  setSearchQuery(suggestion.name);
                  setShowSuggestions(false);
                  navigate(`/?search=${suggestion.name}`);
                }}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
