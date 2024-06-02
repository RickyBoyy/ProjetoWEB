import React from "react";
import "../App.css";
import profilePic from "../images/1547006.jpg";


const previewImage = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    document.getElementById("post_image_preview").src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};



const Profile = () => {
  return (
    <div className="main-profile">
      <div className="left-profile">
        <div className="profile-header">
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
          <div className="profile-text">
            <h2>Display Name</h2>
            <div className="tags">
              <span className="tag">RPG</span>
              <span className="tag">FPS</span>
              <span className="tag">Ação</span>
            </div>
          </div>
        </div>
        <div className="profile-details">
        <textarea
            name="eventDescription"
            placeholder="Describe your profile here"
            rows="5"
            cols="50"
            className="profile-textarea"
          ></textarea>
        </div>
      </div>
      <div className="right-profile">
        <input
          type="file"
          name="postImage"
          accept="image/*"
          className="create_post"
          id="post_image_input"
          onChange={previewImage}
        />
        <img
          id="post_image_preview"
          className="right-profile-image"
          src="https://via.placeholder.com/550x550"
          alt="Imagem à direita"
        />
      </div>
    </div>
  );
}

export default Profile;
