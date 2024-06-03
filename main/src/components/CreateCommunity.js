import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import "../App.css";

const CreateCommunity = () => {
  const textareaRef = useRef(null);
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [communityImage, setCommunityImage] = useState(null);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('https://via.placeholder.com/550x300');

  const previewImage = (event) => {
    const file = event.target.files[0];

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File size exceeds 5MB.');
      return;
    }

    setError('');
    setCommunityImage(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewUrl(reader.result);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (error) {
      return;
    }

    const formData = new FormData();
    formData.append('communityName', communityName);
    formData.append('communityDescription', communityDescription);
    formData.append('communityUserId', '1'); // Example user ID
    formData.append('communityImage', communityImage);

    try {
      const response = await axios.post('http://localhost:4000/create-community', formData);
      console.log(response.data);

      // Assuming response.data contains the saved community data including the image path
      if (response.data.communityImage) {
        setPreviewUrl(`http://localhost:4000/uploads/${response.data.communityImage}`);
      }
    } catch (err) {
      console.error('Error uploading the form:', err);
      setError('Failed to create community. Please try again.');
    }
  };

  return (
    <div id="Create Community" className="createCommunity">
      <div className="createEvent_mainDisplay">
        <div className="title_container">
          <div className="heading">Create your Community</div>
        </div>

        <div className="create_community_essentials">
          <form className="imag_community" onSubmit={handleFormSubmit}>
            
              <label htmlFor="community_img">Your community profile...</label>
              <input
                type="file"
                name="communityImage"
                accept="image/*"
                className="create_community"
                id="community_image_input"
                onChange={previewImage}
              />
              <img
                id="community_image_preview"
                src={previewUrl}
                alt="community_profile"
              />
            
            {error && <div className="error_message">{error}</div>}
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
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    required
                  />
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
                    value={communityDescription}
                    onChange={(e) => {
                      setCommunityDescription(e.target.value);
                      handleTextareaChange();
                    }}
                    required
                  />
                </div>
              </div>
              <div className="create_community_buttons">
                <button type="submit">Save Community</button>
                <button type="button" onClick={redirectToHome}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;
