import React from "react";
import "../App.css";

const Tags = () => {
  const redirectToHome = () => {
    // Implement redirection logic here
  };

  return (
    <div className="choose_tags">
      <div className="card_tags">
        <h1>
          What type of gamer are you?
          <br />
          Choose four tags:
        </h1>
        <div className="tag_placement" id="tag_placement"></div>
        <button className="btn_done" onClick={redirectToNav}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Tags;
