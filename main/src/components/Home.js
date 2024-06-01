import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GlobalApi from "../Services/GlobalApi";
import { AuthContext } from "../Contexts/AuthContext";

import "../styles/home.css";
import "../styles/footer.css";

const Home = () => {
  const [genreList, setGenreList] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

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
    const fetchCommunities = async () => {
      try {
        const response = await fetch('http://localhost:4000/community');
        if (!response.ok) {
          throw new Error('Failed to fetch communities');
        }
        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };

    fetchCommunities();
  }, []);

  useEffect(() => {
    const fetchGamesList = async () => {
      try {
        const response = await GlobalApi.getGames({ page_size: 2000 });
        setGamesList(response.results);
      } catch (error) {
        setError("Error fetching games: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGamesList();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const response = await GlobalApi.searchGames(searchQuery);
          setSearchResults(response.results);
        } catch (error) {
          setError("Error searching for games: " + error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const redirectToGameList = (genreId) => {
    navigate(`/gamelist/${genreId}`);
  };

  const redirectToCommunity = (communityId) => {
    navigate(`/community/${communityId}`);
  };

  const redirectToEvent = () => {
    window.location.href = "/event";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="header-home">
        <h1 className="page-heading">
          <span className="page-heading-primary">THE HOUSE</span>
          <span className="page-heading-secondary">
            Your Games, Your Communities, YOUR HOUSE!!
          </span>
        </h1>
      </div>
      {searchResults.length > 0 && (
        <section className="search-results">
          <h1 className="section-title">Search Results</h1>
          <div className="slider-wrapper">
            <div className="image-list">
              {searchResults.map((item) => (
                <div className="image-item-wrapper" key={item.id}>
                  <Link to={`/games/${item.id}`}>
                    <img
                      src={item.background_image}
                      className="image-item"
                      alt={item.name}
                    />
                    <p className="item-name">{item.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="genres">
        <h1 className="section-title">Genres</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {genreList.map((item) => (
              <div
                className="image-item-wrapper"
                key={item.id}
                onClick={() => redirectToGameList(item.id)}
              >
                <img
                  src={item.image_background}
                  className="image-item"
                  alt={item.name}
                />
                <p className="item-name">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="games">
        <h1 className="section-title">Games</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {gamesList.length > 0 &&
              gamesList.map((item) => (
                <div className="image-item-wrapper" key={item.id}>
                  <Link to={`/games/${item.id}`}>
                    <img
                      src={item.background_image}
                      className="image-item"
                      alt={item.name}
                    />
                    <p className="item-name">{item.name}</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="button_for_more">
          <button className="the_button" onClick={redirectToGameList}>
            See more
          </button>
          </div>
      </section>

      <section className="home-section">
        <h1 className="section-title">Communities</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {communities && communities.map((community) => {
              // Construct the image URL
              const imageUrl = `http://localhost:4000/${community.community_image}`;
              
              // Log the URL to the console for debugging
              console.log('Community Image URL:', imageUrl);

              return (
                <div
                  key={community.community_id}
                  className="image-item-wrapper"
                  onClick={() => redirectToCommunity(community.community_id)}
                >
                  <img
                    src={imageUrl}
                    alt={community.community_name}
                    className="image-item"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/200x300?text=Image+Not+Available";
                    }}
                  />
                  <p className="item-name">{community.community_name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="button_for_more">
          <button className="the_button" onClick={redirectToCommunity}>
            See more
          </button>
          </div>
      </section>

      <section className="home-section">
        <h1 className="section-title">Events</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(11).keys()].map((index) => (
              <div
                key={index}
                className="image-item-wrapper"
                onClick={redirectToEvent}
              >
                <img
                  src={`https://via.placeholder.com/200x300?text=Event-${index + 1}`}
                  alt={`Event-${index + 1}`}
                  className="image-item"
                />
                <p className="item-name">Date {index + 1} Event</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
