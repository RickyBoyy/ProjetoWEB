import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const navigate = useNavigate();

  const previewImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      document.getElementById("post_image_preview").src = reader.result;
    };
    
    if (file) {
      reader.readAsDataURL(file);
      setPostImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("postTitle", postTitle);
    formData.append("postDescription", postDescription);
    formData.append("postImage", postImage);
    formData.append("userId", 1); // Assuming you have userId available
    formData.append("communityId", 1); // Assuming you have communityId available

    try {
      const response = await fetch("http://localhost:4000/create-post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/community");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="CreatePost" className="createpost_mainDisplay">
      <form onSubmit={handleSubmit}>
        <div className="createpost_textEssentials">
          <h1>Create your post</h1>
          <div className="title">
            <label htmlFor="title">First, the title...</label>
            <input
              type="text"
              name="postTitle"
              placeholder="Write your title here!!"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
          <div className="description">
            <label htmlFor="description">Second, your description...</label>
            <input
              type="text"
              name="postDescription"
              placeholder="Description here!!!"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="createpost_content">
          <label htmlFor="post_content">Lastly, share with us...</label>
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
            src="https://via.placeholder.com/550x550"
            alt="create_post"
          />
        </div>
        <button type="submit" className="createpost_button">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
