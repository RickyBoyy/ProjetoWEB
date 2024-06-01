import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import GlobalApi from "../Services/GlobalApi";
import profilePic from "../images/1547006.jpg";
import "../App.css";
import "../styles/reviews_slider.css";

const Game = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await GlobalApi.getGameDetailsById(id);
        setGameDetails(response);
      } catch (error) {
        setError('Error fetching game details');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const redirectToReviewsFromGames = () => {
    window.location.href = "/reviews";
  };

  const redirectToVideosFromGames = () => {
    window.location.href = "/videos";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gameDetails) return <div>No game details found</div>;

  return (
    <div className="Game_Page">
      <div className="game_main_details">
        <div className="game_img">
          <img
            className="game-cover"
            src={gameDetails.background_image}
            alt="game_cover"
          />
          <h2 className="game_name">{gameDetails.name}</h2>
        </div>
        <div className="game_main_reference">
          <div className="game_profile">
            <div className="upper_game">
              <h2 className="name_overall">Overall Rating:</h2>
              <span className="rating">{gameDetails.rating}/5</span>
            </div>
            <div className="description">
              <p>{gameDetails.description_raw}</p>
            </div>
          </div>
        </div>
      </div>
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
            <h5 className="score">8/10</h5>
          </div>
        </div>
        <div className="button_for_more">
          <button
            className="the_button"
            onClick={redirectToReviewsFromGames}
          >
            See more
          </button>
        </div>
      </div>
      <div className="linha-horizontal"></div>
    </div>
  );
};

export default Game;
