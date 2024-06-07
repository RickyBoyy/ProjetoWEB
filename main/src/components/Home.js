import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GlobalApi from "../Services/GlobalApi";
import { AuthContext } from "../Contexts/AuthContext";
import "../styles/home.css";
import "../styles/footer.css";

const Home = () => {
  const [genreList, setGenreList] = useState([]);
  const [events, setEvents] = useState([]);
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
        const response = await fetch("https://projetoweb-13.onrender.com/community");
        if (!response.ok) {
          throw new Error("Failed to fetch communities");
        }
        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://projetoweb-13.onrender.com/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
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

  const redirectToCommunities = () => {
    navigate(`/communities`);
  };

  const redirectToEvent = (eventId) => {
    navigate(`/events/${eventId}`);
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
          <button className="the_button" onClick={() => redirectToGameList()}>
            See more
          </button>
        </div>
      </section>

      <section className="home-section">
        <h1 className="section-title">Communities</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {communities.map((community) => {
              const imageUrl = `https://projetoweb-13.onrender.com/${community.community_image}`;
              return (
                <div
                  key={community.community_id}
                  className="image-item-wrapper"
                >
                  <Link to={`/community/${community.community_id}`}>
                    <img
                      src={imageUrl}
                      alt={community.community_name}
                      className="image-item"
                    />
                    <p className="item-name">{community.community_name}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="button_for_more">
          <button className="the_button" onClick={redirectToCommunities}>
            See more
          </button>
        </div>
      </section>

      <section className="home-section">
        <h1 className="section-title">Events</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {events.map((event) => {
              const imageUrl = `https://projetoweb-13.onrender.com/${event.event_img}`;
              return (
                <div key={event.event_id} className="image-item-wrapper">
                  <Link to={`/events/${event.event_id}`}>
                    <img
                      src={imageUrl}
                      alt={event.event_name}
                      className="image-item"
                    />
                    <p className="item-name">{event.event_name}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
