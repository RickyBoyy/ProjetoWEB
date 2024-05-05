import React from "react";
import "../App.css";
import profilePic from "../images/1547006.jpg";
import "../styles/reviews_slider.css";

const Game = () => {
  const redirectToReviewsFromGames = () => {
    window.location.href = "/reviews";
  };
  const redirectToVideosFromGames = () => {
    window.location.href = "/videos";
  };
  return (
    <div className="Game_Page">
      <div id="Game-desc">
        <img src="https://via.placeholder.com/300x550" alt="" />
        <div id="GameRating-desc">
          <h3>Overall Rating:</h3>
          <h3>0/10</h3>
        </div>
        <p>Description here...</p>
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

      <button className="button-more" onClick={redirectToVideosFromGames}>
        See more
      </button>

      <div className="linha-horizontal"></div>

      <h1 className="Game-title">Reviews</h1>
      <div className="container">
        <div className="card_review">
          <div className="user-info">
            <img
              src={profilePic}
              alt="user_profile_picture"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h4>User Display Name</h4>
          </div>
          <div className="review_content">
            <p>
              The review will go here and occupy the middle space between the
              rating and the user-info.
            </p>
          </div>
          <h5 className="score">8/10</h5>
        </div>
        <div className="card_review">
          <div className="user-info">
            <img
              src={profilePic}
              alt="user_profile_picture"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h4>User Display Name</h4>
          </div>
          <div className="review_content">
            <p>
              The review will go here and occupy the middle space between the
              rating and the user-info.
            </p>
          </div>
          <h5 className="score">8/10</h5>
        </div>
        <button className="button-more" onClick={redirectToReviewsFromGames}>
          See more
        </button>
      </div>

      <div className="linha-horizontal"></div>
    </div>
  );
};

export default Game;
