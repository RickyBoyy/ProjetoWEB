import React, { useState } from "react";
import "../App.css";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import DateTimePicker from "react-datetime-picker";

const CreateEvent = () => {
  const [value, setValue] = useState(new Date());
  const [mapLoaded, setMapLoaded] = useState(false);

  // Function to handle image preview
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

  // Function to handle selection of a place from Autocomplete
  const handlePlaceSelect = (place) => {
    console.log(place);
  };

  return (
    <div className="createEvent_mainDisplay">
      <div className="title_container">
        <h1>Create your event</h1>
      </div>
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
              id="post_image_preview"
              src="https://via.placeholder.com/550x300"
              alt="create_event"
            />
          </div>
        </div>
        <div className="createEvent_mainDetails">
          <h2>Now tell us the details:</h2>
          <div className="actual_details">
            <div className="location">
              <label htmlFor="event_location">
                Show us the event location:
              </label>
              <LoadScript
                googleMapsApiKey="AIzaSyAVcNMQUzkUOyrTdetXMPQ7jKqA6BnEMrQ"
                libraries={["places"]}
                onLoad={() => setMapLoaded(true)} // Set mapLoaded to true when the map is loaded
              >
                {!mapLoaded ? ( // Display a loading indicator if the map is not yet loaded
                  <div>Loading...</div>
                ) : (
                  <GoogleMap
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                    center={{ lat: -34.397, lng: 150.644 }}
                    zoom={8}
                  >
                    <Autocomplete
                      onLoad={handlePlaceSelect}
                      onPlaceChanged={() => {}}
                    >
                      <input
                        type="text"
                        placeholder="Enter a location"
                        style={{
                          boxSizing: `border-box`,
                          border: `1px solid transparent`,
                          width: `240px`,
                          height: `32px`,
                          padding: `0 12px`,
                          borderRadius: `3px`,
                          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                          position: "absolute",
                          left: "50%",
                          marginLeft: "-120px",
                        }}
                      />
                    </Autocomplete>
                  </GoogleMap>
                )}
              </LoadScript>
            </div>
            <div className="time">
              <label htmlFor="event_time">Tell us the time:</label>
              <DateTimePicker onChange={setValue} value={value} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
