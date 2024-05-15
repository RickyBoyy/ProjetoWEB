import React, { useState, useEffect } from "react"; // Import useEffect from 'react'

import "../styles/home.css";
import "../styles/footer.css";
import GlobalApi from "../Services/GlobalApi";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GlobalApi.getGenreList();
        if (response && response.results) {
          setGenreList(response.results);
        } else {
          console.error("Invalid response:", response);
        }
      } catch (error) {
        console.error("Error fetching genre list:", error);
      }
    };

    fetchData();
  }, []);

  const getGenreList = () => {
    GlobalApi.getGenreList()
      .then((response) => {
        console.log(response.data.results);
        setGenreList(response.data.results); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching genre list:", error);
      });
  };

  const redirectToGame = () => {
    window.location.href = "/game";
  };
  const redirectToCommunities = () => {
    window.location.href = "/communities";
  };
  const redirectToEvent = () => {
    window.location.href = "/event";
  };
  return (
    <div>
      {/* Games Section */}
      <section className="genres">
        <h1 className="section-title">Genres</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {genreList &&
              genreList.map((item) => (
                <div className="image-item-wrapper" key={item.id}>
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
      <section className="home-section">
        <h1 className="section-title">Games</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(7).keys()].map((index) => (
              <div
                key={index}
                className="image-item-wrapper"
                onClick={redirectToGame}
              >
                <img
                  src={`https://via.placeholder.com/300x550?text=Game-${
                    index + 1
                  }`}
                  alt={`Community-${index + 1}`}
                  className="image-item"
                />
                <p className="item-name">Game {index + 1} Name</p>
              </div>
            ))}
          </div>
        </div>
        <div className="button_for_more">
          <button className="the_button" onClick={redirectToCommunities}>
            More Games?
          </button>
        </div>
      </section>

      {/* Communities Section */}
      <section className="home-section">
        <h1 className="section-title">Communities</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(7).keys()].map((index) => (
              <div
                key={index}
                className="image-item-wrapper"
                onClick={redirectToCommunities}
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
          <button className="the_button" onClick={redirectToCommunities}>
            More Communities?
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
                  alt={`Community-${index + 1}`}
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
