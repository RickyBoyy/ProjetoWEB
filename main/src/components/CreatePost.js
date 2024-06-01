import React from "react";
import "../App.css";

const CreatePost = () => {
  // Função para pré-visualizar a imagem
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

  return (
    <div id="CreatePost" className="createpost_mainDisplay">
      <div className="createpost_textEssentials">
        <h1>Create your post</h1>
        <div className="title">
          <label htmlFor="title">First, the title...</label>
          <input
            type="text"
            name="postTitle"
            placeholder="Write your title here!!"
          />
        </div>
        <div className="description">
          <label htmlFor="description">Second, your description...</label>
          <input
            type="text"
            name="postDescription"
            placeholder="Description here!!!"
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
      <button type="submit" className="createpost_button">Submit Post</button>
    </div>
  );
};

export default CreatePost;
