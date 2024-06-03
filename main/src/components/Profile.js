import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import "../App.css";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import profilePicPlaceholder from "../images/1547006.jpg";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    user_displayname: '',
    profile_pic: '',
    user_description: ''
  });
  const [formData, setFormData] = useState({
    user_displayname: '',
    profile_pic: '',
    user_description: ''
  });
  const [preview, setPreview] = useState(profilePicPlaceholder);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/profile/${user.user_id}`);
        setProfile(response.data);
        setFormData(response.data);
        if (response.data.profile_pic) {
          setPreview(`/${response.data.profile_pic}`);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_pic: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append('user_displayname', formData.user_displayname);
    updateData.append('user_description', formData.user_description);
    if (formData.profile_pic instanceof File) {
      updateData.append('profilePic', formData.profile_pic);
    }

    try {
      const response = await axios.put(`/profile/${user.user_id}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(response.data);
      if (response.data.profile_pic) {
        setPreview(`/${response.data.profile_pic}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="main-profile">
      <form onSubmit={handleSubmit}>
        <div className="left-profile">
          <div className="profile-header">
            <img
              src={preview}
              alt="user_profile_picture"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div className="profile-text">
              <h2>{profile.user_displayname || 'Display Name'}</h2>
              <div className="tags">
                <span className="tag">RPG</span>
                <span className="tag">FPS</span>
                <span className="tag">Ação</span>
              </div>
            </div>
          </div>
          <div className="profile-details">
            <textarea
              name="user_description"
              placeholder="Describe your profile here"
              rows="5"
              cols="50"
              className="profile-textarea"
              value={formData.user_description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="right-profile">
          <input
            type="file"
            name="profile_pic"
            accept="image/*"
            className="create_post"
            id="profile_image_input"
            onChange={handleImageChange}
          />
          <img
            id="profile_image_preview"
            className="right-profile-image"
            src={preview}
            alt="Imagem à direita"
          />
          <button type="submit">Save Profile</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
