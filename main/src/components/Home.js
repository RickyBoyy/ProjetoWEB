import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GlobalApi from "../Services/GlobalApi";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Root, color, themes } from "@amcharts/amcharts5";
import {
  ColumnSeries,
  XYChart,
  CategoryAxis,
  ValueAxis,
} from "@amcharts/amcharts5/xy";
import AnimatedTheme from "@amcharts/amcharts5/themes/Animated";
import { Tooltip } from "@amcharts/amcharts5";

import "../styles/home.css";
import "../styles/footer.css";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [genreList, setGenreList] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);
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
        if (response && response.results) {
          setGenreList(response.results);
        } else {
          setError("Invalid response");
        }
      } catch (error) {
        setError("Error fetching genre list");
      } finally {
        setLoading(false);
      }
    };

    fetchGenreList();
  }, []);

  useEffect(() => {
    const fetchGamesList = async () => {
      try {
        const response = await GlobalApi.getGames({ page_size: 2000 });
        if (response && response.results) {
          setGamesList(response.results);
        } else {
          setError("Invalid response");
        }
      } catch (error) {
        setError("Error fetching games");
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
          if (response && response.results) {
            setSearchResults(response.results);
          } else {
            setError("Invalid response");
          }
        } catch (error) {
          setError("Error searching for games");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  // Inside the useEffect block where you create the chart

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const redirectToGameList = (genreId) => {
    navigate(`/gamelist/${genreId}`);
  };

  const redirectToCommunity = () => {
    navigate("/community");
  };

  const redirectTCommunities = () => {
    navigate("/communities");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const redirectToEvent = () => {
    window.location.href = "/event";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div class="header-home">
        <h1 class="page-heading">
          <span class="page-heading-primary">THE HOUSE</span>
          <span class="page-heading-secondary">
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
            {[...Array(7).keys()].map((index) => (
              <div
                key={index}
                className="image-item-wrapper"
                onClick={redirectToCommunity}
              >
                <img
                  src={`https://via.placeholder.com/300x550?text=Community-${
                    index + 1
                  }`}
                  alt={`Community-${index + 1}`}
                  className="image-item"
                />
                <p className="item-name">Community {index + 1} Name</p>
              </div>
            ))}
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
                  src={`https://via.placeholder.com/200x300?text=Event-${
                    index + 1
                  }`}
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
