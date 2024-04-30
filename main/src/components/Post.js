import React from "react";
import "../App.css";

const Post = () => {
  return (
    <div>
      <div className="upper_post">
        <h1>Post Title</h1>
        <div className="tag_4placement" id="tag_4placement"></div>
        <img
          src="https://via.placeholder.com/550x550"
          className="post"
          alt="post"
        />
        <h3>User</h3>
        <h3>Date</h3>
        <h3>Description</h3>
      </div>
      {/* You may need to include your JavaScript logic here */}
      <script src="tag.js"></script>
    </div>
  );
};

export default Post;
