import React from "react";
import "../App.css";

const Event = () => {
  return (
    <div className="event_landing_page">
      <div className="info">
        <h2>
          Event<br></br>
          <span>Name</span>
        </h2>
        <p>
          Magna sint amet duis consectetur enim aute. Excepteur magna minim
          tempor laborum laboris ipsum Lorem pariatur et pariatur. Anim nostrud
          laborum ipsum ipsum ipsum adipisicing. Laboris irure quis incididunt
          laborum sint excepteur nostrud est officia veniam laboris cupidatat
          voluptate aliqua. Et cillum amet ex ipsum sint aliquip excepteur velit
          mollit sint.
        </p>
        <p>
          Date:
          <br></br>
          Location:
          <br></br>
          Creator:
        </p>
      </div>
      <div className="image-container">
        <img
          src="https://via.placeholder.com/550x300"
          alt="Event Image"
          className="event-image"
        />
      </div>
    </div>
  );
};

export default Event;
