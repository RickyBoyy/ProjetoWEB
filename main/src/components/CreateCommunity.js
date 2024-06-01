import React, { useRef, useEffect } from "react";
import "../App.css";

const CreateCommunity = () => {
  const textareaRef = useRef(null);

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
  const redirectToHome = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  const handleTextareaChange = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <div id="Create Community" className="createCommunity">
      <div className="createEvent_mainDisplay">
        <div className="title_container">
          <div className="heading">Create your Community</div>
        </div>

        <div className="create_community_essentials">
          <div className="imag_community">
            <label htmlFor="community_img">Your community profile...</label>
            <input
              type="file"
              name="communityImage"
              accept="image/*"
              className="create_community"
              id="community_image_input"
              onChange={previewImage}
            ></input>
            <img
              id="community_image_preview"
              src="https://via.placeholder.com/550x300"
              alt="community_profile"
            />
          </div>
          <div className="createCommunity_textEssentials">
            <div className="card_create_community">
              <h2>Essentials</h2>
              <div className="community_name_essential">
                <label
                  className="community_name"
                  htmlFor="createCommunity_name"
                >
                  Give us the name!!
                </label>
                <input
                  type="text"
                  name="createCommunity_textName"
                  placeholder="Here!!"
                ></input>
              </div>
              <div className="community_description_essential">
                <label
                  className="community_description"
                  htmlFor="createCommunity_description"
                >
                  Maybe a motto...
                </label>
                <textarea
                  ref={textareaRef}
                  name="createCommunity_textDescription"
                  placeholder="Here!!"
                  onChange={handleTextareaChange}
                ></textarea>
              </div>
            </div>
            <div className="create_community_buttons">
              <button type="submit" onClick={redirectToHome}>
                Save Event
              </button>
              <button type="reset" onClick={redirectToHome}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateCommunity;
