import React from "react";
import "../App.css";

const Community = () => {
  return (
    <div>
      <h1>Communities</h1>
      <div className="community">
        <div className="community-content">
          <div className="community-description-section">
            <img src="https://via.placeholder.com/150x150" alt="" />
            <textarea
              className="community-description"
              placeholder="Descrição da primeira comunidade"
            ></textarea>
          </div>
          <div className="community-name">Nome da primeira comunidade</div>
        </div>
        <button className="btn">Entrar</button>
      </div>

      <div className="community">
        <div className="community-content">
          <div className="community-description-section">
            <img src="https://via.placeholder.com/150x150" alt="" />
            <textarea
              className="community-description"
              placeholder="Descrição da segunda comunidade"
            ></textarea>
          </div>
          <div className="community-name">Nome da segunda comunidade</div>
        </div>
        <button className="btn">Entrar</button>
      </div>
    </div>
  );
};

export default Community;
