import React from "react";

import "../App.css";

const CreateCommunity = () => {
  const previewImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      document.getElementById("community_image_preview").src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div id="Create Community" className="createCommunity">
      <div className="createcommunity_visuals">
        <div className="createcommunity_visualizers">
          <h1>Create your community</h1>
          <label htmlFor="community_img">Your community profile...</label>
          <input
            type="file"
            name="communityImage"
            accept="image/*"
            className="create_community"
            id="community_image_input"
            onChange={previewImage}
          ></input>
          <div />
        </div>
        <div className="createCommunity_textEssentials">
          <label className="community_name" htmlFor="createCommunity_name">
            Give us the name!!
          </label>
          <input
            type="text"
            name="createCommunity_textName"
            placeholder="Here!!"
          ></input>
          <label
            className="community_description"
            htmlFor="createCommunity_description"
          >
            Maybe a motto...
          </label>
          <input
            type="text"
            name="createCommunity_textDescription"
            placeholder="Here!!"
          ></input>
        </div>
      </div>
    </div>
  );
};
export default CreateCommunity;
