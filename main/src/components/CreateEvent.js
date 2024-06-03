import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date().toISOString().split("T")[0]);
  const [eventTime, setEventTime] = useState("");
  const [locationName, setLocationName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const savedLocationName = localStorage.getItem("locationName");
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocationName) {
      setLocationName(savedLocationName);
    }
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const handleDateChange = (event) => {
    setEventDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setEventTime(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const previewImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      document.getElementById("event_image_preview").src = reader.result;
      setImage(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("time", `${eventDate}T${eventTime}:00`);
    formData.append("description", description);
    formData.append("userId", 1); // Replace with the actual user ID
    if (image) {
      formData.append("eventImage", image);
    }

    try {
      const response = await axios.post("http://localhost:4000/create-event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Event created with ID:", response.data.eventId);
      redirectToHome();
    } catch (error) {
      console.error("There was an error creating the event!", error);
    }
  };

  return (
    <div className="createEvent_mainDisplay">
      <div className="title_container">
        <div className="heading">Create your event</div>
      </div>
      <form onSubmit={handleSubmit} className="create_event_body">
        <div className="all_it">
          <div className="upper_elements">
            <div className="Event_Title">
              <label htmlFor="eventTitle">Title</label>
              <input
                type="text"
                id="eventTitle"
                name="eventTitle"
                placeholder="Write your title here!!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="Event_img">
              <label htmlFor="eventImage">Your event image...</label>
              <input
                type="file"
                id="eventImage"
                name="eventImage"
                accept="image/*"
                className="create_event"
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
                <label htmlFor="event_location">Show us the event location:</label>
                <button type="button" onClick={redirectToMaps} className="location_button">
                  Open Google Maps
                </button>
                <p>Selected Location: {locationName}</p>
              </div>
              <div className="time">
                <div className="card-event-details">
                  <div className="textEssentials">
                    <div className="date_stat">
                      <label htmlFor="date" className="date_label">Date:</label>
                      <input
                        type="date"
                        id="date"
                        value={eventDate}
                        onChange={handleDateChange}
                        required
                      />
                    </div>
                    <div className="time_stat">
                      <label htmlFor="time" className="date_label">Time:</label>
                      <input
                        type="time"
                        id="time"
                        value={eventTime}
                        onChange={handleTimeChange}
                        required
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
            <button type="submit" onClick={handleSubmit}>
              Save Event
            </button>
            <button type="reset" onClick={redirectToHome}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
