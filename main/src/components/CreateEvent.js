import React from "react";
import "../App.css";

const CreateEvent = () => {
  // Function to handle image preview
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
    <div className="createEvent_mainDisplay">
      <h1>Create your event</h1>
      <div className="upper_part">
        <div className="Event_Title">
          <label htmlFor="eventTitle">Title</label>
          <input
            type="text"
            name="eventTitle"
            placeholder="Write your title here!!"
          />
        </div>
        <div className="Event_img">
          <label htmlFor="event_img">Your event image...</label>
          <input
            type="file"
            name="eventImage"
            accept="image/*"
            className="create_event"
            id="event_image_input"
            onChange={previewImage}
          />
          <img
            id="post_image_preview"
            src="https://via.placeholder.com/550x300"
            alt="create_event"
          />
        </div>
      </div>
      <div className="createEvent_mainDetails">
        <h2>Now tell us the details:</h2>
        <div className="location">
          <label htmlFor="event_location">Show us the event location:</label>
          {/* Google Maps input */}
        </div>
        <div className="time">
          <label htmlFor="event_time">Tell us the time:</label>
          {/* Clock input for time */}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
