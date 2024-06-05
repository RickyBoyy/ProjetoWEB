import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "../styles/reviews_slider.css";
import profilePic from "../images/1547006.jpg";
import GlobalApi from "../Services/GlobalApi";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await GlobalApi.getReviewsByGameId(id);
        setReviews(response);
      } catch (error) {
        setError('Error fetching reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      {reviews.map((review) => (
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
    </div>
  );
};

export default Reviews;
