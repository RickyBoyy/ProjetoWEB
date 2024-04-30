import React from "react";
import "../App.css"; // Import your CSS file here

const Event = () => {
  return (
    <div>
      <div className="upper_events">
        <h1>Events</h1>
        <div>
          <img
            src="https://via.placeholder.com/550x300"
            className="event_pic"
            alt="EventPic"
          />
          <h2>Event Name</h2>
        </div>
      </div>
      <div className="lower_events">
        <h2>Details</h2>
        <div className="textfield_location">
          <h3>Location:</h3>
          <h3>location</h3>
        </div>
        <div className="textfield_time">
          <h3>Time:</h3>
          <h3>time</h3>
        </div>
        <div className="textfield_creator">
          <h3>Creator Name:</h3>
          <h3>creator name</h3>
        </div>
      </div>
    </div>
  );
};

export default Event;
