
import React from 'react';
import "../App.css";
import profilePic from "../images/1547006.jpg";



const Post = () => {
  return (
    <div>
      <div className="post2">
        <div className="user-info">
          <img
            src={profilePic}
            alt="user_profile_picture"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
            }}
          />
           <h5 style={{ color: "white" }}>User Display Name</h5>
        </div>
        <div className="post-content2">
          <img src="https://via.placeholder.com/150x150" alt="Post Image" className="post-image2" />
          <div className="post-description2">Descrição do post 1</div>
        </div>
      </div>

      <div className="post2">
        <div className="user-info">
          <img
            src={profilePic}
            alt="user_profile_picture"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
            }}
          />
          <h5 style={{ color: "white" }}>User Display Name 2</h5>
        </div>
        <div className="post-content2">
          <img src="https://via.placeholder.com/150x150" alt="Post Image" className="post-image2" />
          <div className="post-description2">Descrição do post 2</div>
        </div>
      </div>

      <div className="post2">
        <div className="user-info">
          <img
            src={profilePic}
            alt="user_profile_picture"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
            }}
          />
           <h5 style={{ color: "white" }}>User Display Name 3</h5>
        </div>
        <div className="post-content2">
          <img src="https://via.placeholder.com/150x150" alt="Post Image" className="post-image2" />
          <div className="post-description2">Descrição do post 3</div>
        </div>
      </div>

      <div className="post2">
        <div className="user-info">
          <img
            src={profilePic}
            alt="user_profile_picture"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
            }}
          />
          <h5 style={{ color: "white" }}>User Display Name 4</h5>
        </div>
        <div className="post-content2">
          <img src="https://via.placeholder.com/150x150" alt="Post Image" className="post-image2" />
          <div className="post-description2">Descrição do post 4</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
