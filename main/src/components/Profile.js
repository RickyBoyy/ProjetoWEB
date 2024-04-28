import React from "react";
import "../App.css";

const Profile = () => {
  return (
    <div className="profile_main">
      <div className="profile_pic">
        <img
          src="https://avatars.githubusercontent.com/u/1547006?v=4"
          className="profile_pic"
          alt="DefaultPic"
        />
      </div>
      <div className="textfield_username">
        <h1>Display Name</h1>
      </div>
      <div className="description-profile">
        <label className="label-profile" htmlFor="description">
          About Myself:
        </label>
        <input
          className="input-profile"
          type="text"
          id="bio"
          name="bio"
          placeholder="Tell us something about yourself"
        />
      </div>
      <div id="buttons-profile">
        <button id="changeBackgroundButtonPrev">{"<"}</button>
        <button id="changeBackgroundButton">{">"}</button>
      </div>
      {/* You might need to include your script logic here */}
      <div className="vertical-line"></div>
    </div>
  );
};

export default Profile;
