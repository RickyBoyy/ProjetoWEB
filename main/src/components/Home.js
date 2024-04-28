import React from "react";
import "../styles/slider.css";
import "../App.css";

const Home = () => {
  return (
    <div id="indexBody" className="bg-primÃ¡rio-sutil">
      <h1 className="secondTitle">Games</h1>
      <iframe className="Index-iframe" src="Games.html" title="Games"></iframe>

      <div className="container">
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(7).keys()].map((index) => (
              <img
                key={index}
                src={`https://via.placeholder.com/300x550?text=Item-${
                  index + 1
                }`}
                alt={`item-${index + 1}`}
                className="image-item"
              />
            ))}
          </div>
        </div>
        <div className="slider-scrollbar">
          <div className="scrollbar-track">
            <div className="scrollbar-thumb"></div>
          </div>
        </div>
      </div>

      <h1 className="secondTitle">Communities</h1>
      <iframe
        className="Index-iframe"
        src="Comunidades.html"
        title="Communities"
      ></iframe>

      <div className="container">
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(7).keys()].map((index) => (
              <img
                key={index}
                src={`https://via.placeholder.com/150x150?text=Item-${
                  index + 1
                }`}
                alt={`item-${index + 1}`}
                className="image-item"
              />
            ))}
          </div>
        </div>
        <div className="slider-scrollbar">
          <div className="scrollbar-track">
            <div className="scrollbar-thumb"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
