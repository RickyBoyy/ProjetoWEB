import React from "react";
import "../App.css";
import profilePic from "../images/1547006.jpg";

function Profile() {
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
            <h2>Nome do Jogador</h2>
            <div className="tags">
              <span className="tag">RPG</span>
              <span className="tag">FPS</span>
              <span className="tag">Ação</span>
            </div>
          </div>
        </div>
        <div className="profile-details">
          <p>Detalhes do perfil Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit risus vitae nibh aliquet, eget scelerisque justo dapibus.</p>
        </div>
      </div>
      <div className="right-profile">
        <img src="image2.jpg" className="right-profile-image" alt="Imagem à direita" />
      </div>
    </div>
  );
}

export default Profile;
