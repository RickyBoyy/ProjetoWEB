import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalApi from '../Services/GlobalApi';
import logo from '../images/LogoHorizontal.png';
import '../styles/header.css';
import { AuthContext } from '../Contexts/AuthContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const response = await GlobalApi.getGenreList();
        setGenreList(response.results);
      } catch (error) {
        setError("Error fetching genre list: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreList();
  }, []);

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
          console.error("Error fetching search suggestions:", error);
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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchQuery}`);
  };

  const redirectTo = (path) => {
    navigate(path);
  };

  const redirectToGameList = (genreId) => {
    navigate(`/gamelist/${genreId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <header className="header">
      <div className="logo-container">
        <button className="logo-button" onClick={() => redirectTo("/")}>
          <img src={logo} alt="Logo" className="logo" />
        </button>
      </div>
      <div className="genre-dropbar">
        <button className="dropbtn">Genres</button>
        <div className="dropdown-content">
          {genreList.map((item) => (
            <div
              className="image-item-wrapper"
              key={item.id}
              onClick={() => redirectToGameList(item.id)}
            >
              <p className="genre-name">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      {user && (
        <div className="create-community-container">
          <button
            className="create-community-button"
            onClick={() => redirectTo("/create_community")}
          >
            Create Community
          </button>
        </div>
      )}
      {user && (
        <div className="create-event-container">
          <button
            className="create-event-button"
            onClick={() => redirectTo("/create_event")}
          >
            Create Event
          </button>
        </div>
      )}
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
          <button type="submit" className="search-button">
            Search
          </button>
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
      <div className="login-container">
  {user ? (
    <>
      <button className="login-button" onClick={() => redirectTo(`/profile/${user.user_id}`)}>
        Profile
      </button>
      <button className="login-button" onClick={logout}>
        Logout
      </button>
    </>
  ) : (
    <button className="login-button" onClick={() => redirectTo("/login")}>
      Login
    </button>
  )}
</div>

    </header>
  );
};

export default Header;
