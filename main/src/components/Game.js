import React from "react";
import "../App.css";

const Game = () => {
  return (
    <div>
      <h1 className="Game-title">Game</h1>
      <div id="Game-desc">
        <img src="https://via.placeholder.com/300x550" alt="" />
        <div id="GameRating-desc">
          <h2>Rating</h2>
          <h3>0/10</h3>
          <p>Description here...</p>
        </div>
      </div>
      <div className="linha-horizontal"></div>
      <h1 className="Game-title">Guides and Tutorials</h1>
      <div className="vid-game">
        <iframe
          className="video1-game"
          width="250"
          height="150"
          src="https://www.youtube.com/embed/xvFZjo5PgG0?si=JqesFoL8jh9RpUX2"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <iframe
          className="video2-game"
          width="250"
          height="150"
          src="https://www.youtube.com/embed/xvFZjo5PgG0?si=JqesFoL8jh9RpUX2"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="vid-game">
        <iframe
          className="video1-game"
          width="250"
          height="150"
          src="https://www.youtube.com/embed/xvFZjo5PgG0?si=JqesFoL8jh9RpUX2"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <iframe
          className="video2-game"
          width="250"
          height="150"
          src="https://www.youtube.com/embed/xvFZjo5PgG0?si=JqesFoL8jh9RpUX2"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <button className="button-more">See more</button>

      <div className="linha-horizontal"></div>

      <h1 className="Game-title">Reviews</h1>
      <div className="review">
        <img
          className="GameRev-profile"
          src="https://via.placeholder.com/150"
          alt=""
        />
        <p className="GameRev-desc">Review here</p>
        <p className="GameRev-grade">0/10</p>
      </div>
      <div className="Game-review">
        <img
          className="GameRev-profile"
          src="https://via.placeholder.com/150"
          alt=""
        />
        <p className="GameRev-desc">Review here</p>
        <p className="GameRev-grade">0/10</p>
      </div>
      <div className="Game-review">
        <img
          className="GameRev-profile"
          src="https://via.placeholder.com/150"
          alt=""
        />
        <p className="GameRev-desc">Review here</p>
        <p className="GameRev-grade">0/10</p>
      </div>

      <button className="button-more">See more</button>

      <div className="linha-horizontal"></div>

      <iframe src="GamesComunity.html" frameBorder="0"></iframe>
    </div>
  );
};

export default Game;
