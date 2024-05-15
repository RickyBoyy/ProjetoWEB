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
      <div className="game_main_details">
        <div className="game_img">
          <img
            src="https://via.placeholder.com/300x550?text=Game"
            alt="game_cover"
          ></img>
          <h2 className="game_name">Game</h2>
        </div>
        <div className="game_main_reference">
          <div className="game_profile">
            <div className="upper_game">
              <h2 className="name_overall">Overall Rating:</h2>

              <span className="rating">0/10</span>
            </div>
            <div className="description">
              <p>The game description will be here</p>
            </div>
          </div>
        </div>
      </div>
      <div className="linha-horizontal"></div>
      <h1 className="Videos-title">Guides and Tutorials</h1>
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

      <button
        className="button-more-videos"
        onClick={redirectToVideosFromGames}
      >
        See more
      </button>

      <div className="linha-horizontal"></div>

      <h1 className="Reviews-title">Reviews</h1>
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
            <div className="review_part">
              <p>
                The review will go here and occupy the middle space between the
                rating and the user-info.
              </p>
            </div>
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
            <div className="review_part">
              <p>
                The review will go here and occupy the middle space between the
                rating and the user-info.
              </p>
            </div>
          </div>
          <h5 className="score">8/10</h5>
        </div>
        <button
          className="button-more-reviews"
          onClick={redirectToReviewsFromGames}
        >
          See more
        </button>
      </div>

      <div className="linha-horizontal"></div>
    </div>
  );
};

export default Game;
