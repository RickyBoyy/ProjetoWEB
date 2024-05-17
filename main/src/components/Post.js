import React from 'react';
import "../App.css";
import profilePic from "../images/1547006.jpg";

const Post = () => {
  return (
    <div className="post-container">
      <div className="post2">
        <div className="post-content2">
          <img src="https://via.placeholder.com/700x350" alt="Post Image" className="post-image2" />
          <div className="user-info right-aligned">
            <img
              src={profilePic}
              alt="user_profile_picture"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h5 style={{ color: "white" }}>User Display Name</h5>
          </div>
          <div className="post-description2">Descrição do post 1</div>
        </div>
      </div>

      <div className="post2">
        <div className="post-content2">
          <img src="https://via.placeholder.com/700x350" alt="Post Image" className="post-image2" />
          <div className="user-info right-aligned">
            <img
              src={profilePic}
              alt="user_profile_picture"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h5 style={{ color: "white" }}>User Display Name 2</h5>
          </div>
          <div className="post-description2">Descrição do post 2</div>
        </div>
      </div>

      <div className="post2">
        <div className="post-content2">
          <img src="https://via.placeholder.com/700x350" alt="Post Image" className="post-image2" />
          <div className="user-info right-aligned">
            <img
              src={profilePic}
              alt="user_profile_picture"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h5 style={{ color: "white" }}>User Display Name 3</h5>
          </div>
          <div className="post-description2">Descrição do post 3</div>
        </div>
      </div>

      <div className="post2">
        <div className="post-content2">
          <img src="https://via.placeholder.com/700x350" alt="Post Image" className="post-image2" />
          <div className="user-info right-aligned">
            <img
              src={profilePic}
              alt="user_profile_picture"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h5 style={{ color: "white" }}>User Display Name 4</h5>
          </div>
          <div className="post-description2">Descrição do post 4</div>
        </div>
      </div>

      <div className="post2">
        <div className="post-content2">
          <img src="https://via.placeholder.com/700x350" alt="Post Image" className="post-image2" />
          <div className="user-info right-aligned">
            <img
              src={profilePic}
              alt="user_profile_picture"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h5 style={{ color: "white" }}>User Display Name 5</h5>
          </div>
          <div className="post-description2">Descrição do post 5</div>
        </div>
      </div>

      <div className="post2">
        <div className="post-content2">
          <img src="https://via.placeholder.com/700x350" alt="Post Image" className="post-image2" />
          <div className="user-info right-aligned">
            <img
              src={profilePic}
              alt="user_profile_picture"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h5 style={{ color: "white" }}>User Display Name 6</h5>
          </div>
          <div className="post-description2">Descrição do post 6</div>
        </div>
      </div>

    </div>
  );
};

export default Post;

