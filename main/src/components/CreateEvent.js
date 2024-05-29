import React, { useState, useEffect } from "react";
import "../App.css";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [eventTime, setEventTime] = useState("");
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    const savedLocationName = localStorage.getItem("locationName");
    console.log("Fetched from localStorage:", savedLocationName);
    if (savedLocationName) {
      setLocationName(savedLocationName);
    }
  }, []);

  const handleDateChange = (date) => {
    setEventDate(date);
  };

  const handleTimeChange = (event) => {
    setEventTime(event.target.value);
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
  const redirectToMaps = () => {
    window.location.href = "/maps";
  };

  const redirectToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="createEvent_mainDisplay">
      <div className="title_container">
        <div className="heading">Create your event</div>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

                      <input
                        type="date"
                        value={eventDate}
                        onChange={handleDateChange}
                      ></input>
                    </div>
                    <div className="time_stat">
                      <label htmlFor="time" className="date_label">
                        Time:
                      </label>
                      <input
                        type="time"
                        value={eventTime}
                        onChange={handleTimeChange}
                      />
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
