import React from "react";
import "../styles/reviews_slider.css";
import profilePic from "../images/1547006.jpg";

const Reviews = () => {
  return (
    <div className="container">
      <div className="slider-inner">
        <div className="carousel">
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
                  The review will go here and occupy the middle space between
                  the rating and the user-info.
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
                  The review will go here and occupy the middle space between
                  the rating and the user-info.
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
                  The review will go here and occupy the middle space between
                  the rating and the user-info.
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
                  The review will go here and occupy the middle space between
                  the rating and the user-info.
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
                  The review will go here and occupy the middle space between
                  the rating and the user-info.
                </p>
              </div>
            </div>
            <h5 className="score">8/10</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
