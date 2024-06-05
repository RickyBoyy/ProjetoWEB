import React, { useEffect, useState, useRef } from "react";
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
  const [reviews, setReviews] = useState([]);
  const textareaRef = useRef(null);
  const [score, setScore] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");

  const redirectToReviewsFromGames = () => {
    window.location.href = `/reviews/${id}`;
  };

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
  
    const fetchReviews = async () => {
      try {
        const response = await GlobalApi.getReviewsByGameId(id);
        setReviews(response);
      } catch (error) {
        setError('Error fetching reviews');
      }
    };
  
    fetchGameDetails();
    fetchReviews();
  }, [id]);
  
  const calculateAverageRating = () => {
    if (reviews.length === 0) return "?";
    const totalRating = reviews.reduce((acc, review) => acc + review.review_rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Rounded to one decimal place
  };

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  const handleReviewDescriptionChange = (event) => {
    setReviewDescription(event.target.value);
  };

  const handleReset = () => {
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    setScore("");
    setReviewDescription("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = 1; // Replace with actual user ID
      const newReview = {
        review_description: reviewDescription,
        review_rating: parseInt(score),
        user_id: userId,
        game_id: parseInt(id)
      };
      await GlobalApi.createReview(newReview);
      handleReset();
      // Fetch updated reviews
      const response = await GlobalApi.getReviewsByGameId(id);
      setReviews(response);
    } catch (error) {
      setError('Error saving review');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gameDetails) return <div>No game details found</div>;

  const averageRating = calculateAverageRating();

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
              <span className="rating">{averageRating}/10</span>
            </div>
            <div className="description">
              <p>{gameDetails.description_raw}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="linha-horizontal"></div>
      <h1 className="Reviews-title">Reviews</h1>
      <div className="any_description" style={{ marginLeft: "160px" }}>
        <label htmlFor="eventDescription">Write your review:</label>
        <select id="score" value={score} onChange={handleScoreChange}>
          <option value="">Select a score</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <textarea
          ref={textareaRef}
          name="eventDescription"
          value={reviewDescription}
          onChange={handleReviewDescriptionChange}
          placeholder="Tell us your review!!"
          rows="5"
          cols="50"
          style={{ width: "83vw" }}
        ></textarea>
        <div className="create_event_buttons">
          <button type="submit" onClick={handleSubmit}>
            Save Review
          </button>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      <div className="container">
        {reviews.slice(0, 2).map((review) => ( // Displaying only the first two reviews
          <div className="card_review" key={review.review_id}>
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
                <p>{review.review_description}</p>
              </div>
            </div>
            <h5 className="score">{review.review_rating}/10</h5>
          </div>
        ))}
        {/* Button for navigation */}
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
