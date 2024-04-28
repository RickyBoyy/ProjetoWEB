import React from "react";
import "../styles/home.css";

const Home = () => {
  return (
    <div>
      {/* Games Section */}
      <section className="home-section">
        <h1 className="section-title">Games</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(7).keys()].map((index) => (
              <img
                key={index}
                src={`https://via.placeholder.com/300x550?text=Game-${
                  index + 1
                }`}
                alt={`Game-${index + 1}`}
                className="image-item"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="home-section">
        <h1 className="section-title">Communities</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(7).keys()].map((index) => (
              <img
                key={index}
                src={`https://via.placeholder.com/300x550?text=Community-${
                  index + 1
                }`}
                alt={`Community-${index + 1}`}
                className="image-item"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
