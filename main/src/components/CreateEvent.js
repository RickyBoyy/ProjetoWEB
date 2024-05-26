import React, { useState } from "react";
import "../App.css";

import MapContainer from "./Maps";
import DateTimePicker from "react-datetime-picker";

const CreateEvent = () => {
  const [value, setValue] = useState(new Date());
  const [locationName, setLocationName] = useState(""); // Declare the state variable for location name
  const [showMap, setShowMap] = useState(false);

  const redirectToMaps = () => {
    window.location.href = "/maps";
  };
  const redirectToHome = () => {
    window.location.href = "/";
  };

  const previewImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      document.getElementById("event_image_preview").src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleLocationSelect = (name) => {
    setLocationName(name);
    setShowMap(false); // Hide the map after selecting a location
  };

  const openMap = () => {
    setShowMap(true);
  };

  return (
    <div className="createEvent_mainDisplay">
      <div className="title_container">
        <div class="heading">Create your event</div>
      </div>
      <div className="create_event_body">
        <div className="all_it">
          <div className="upper_elements">
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
                id="event_image_preview"
                src="https://via.placeholder.com/550x300"
                alt="create_event"
              />
            </div>
          </div>
          <div className="createEvent_mainDetails">
            <div className="actual_details">
              <div className="location">
                <label htmlFor="event_location">
                  Show us the event location:
                </label>

                <button onClick={redirectToMaps} className="location_button">
                  Open Google Maps
                </button>
                <p>Selected Location: {locationName}</p>
              </div>

              <div className="time">
                <div className="card-event-details">
                  <div className="textEssentials">
                    <div className="date_stat">
                      <label htmlFor="date" className="date_label">
                        Date:
                      </label>
                      <input type="date"></input>
                    </div>
                    <div className="time_stat">
                      <label htmlFor="time" className="date_label">
                        Time:
                      </label>
                      <input type="time"></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="any_description">
          <label htmlFor="eventDescription">Event Description:</label>
          <textarea
            name="eventDescription"
            placeholder="Describe your event here"
            rows="5"
            cols="50"
          ></textarea>
          <div className="create_event_buttons">
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
  );
};

export default CreateEvent;
