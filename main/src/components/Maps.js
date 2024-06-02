import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const MapContainer = ({ handleLocationSelection }) => {
  const apiKey = "AIzaSyAVcNMQUzkUOyrTdetXMPQ7jKqA6BnEMrQ";
  const navigate = useNavigate();

  const mapOptions = {
    zoom: 10,
    center: { lat: 38.722252, lng: -9.139337 },
  };

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationName, setLocationName] = useState("");

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const location = { lat, lng };
    setSelectedLocation(location);
    await fetchLocationName(location);

    // Perform any necessary operations with location data here

    // Navigate to /create_event
  };

  const fetchLocationName = async (location) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`;
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setLocationName(data.results[0].formatted_address);
        console.log("Fetched location name:", data.results[0].formatted_address); // Debugging log
      } else {
        setLocationName("Unknown location");
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Error fetching location name");
    }
  };

  const handleDoneClick = () => {
    if (selectedLocation) {
      console.log("Done click - location selected:", selectedLocation, locationName); // Debugging log
      const wktLocation = `POINT(${selectedLocation.lng} ${selectedLocation.lat})`;
      localStorage.setItem("selectedLocation", wktLocation);
      localStorage.setItem("locationName", locationName);
      window.location.href = "/create_event"; // Navigate back to CreateEvent
    } else {
      alert("Please select a location on the map first.");
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        center={mapOptions.center}
        zoom={mapOptions.zoom}
        onClick={handleMapClick}
      >
        {selectedLocation && (
          <>
            <Marker position={selectedLocation} />
            <InfoWindow position={selectedLocation}>
              <div>
                <h4>Selected Location</h4>
                <p>Name: {locationName}</p>
              </div>
            </InfoWindow>
          </>
        )}
      </GoogleMap>
      <button
        onClick={handleDoneClick}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          padding: "10px 20px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Done
      </button>
    </LoadScript>
  );
};

export default MapContainer;
