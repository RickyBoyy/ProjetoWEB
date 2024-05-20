import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = ({ onLocationSelect }) => {
  // Google Maps API Key
  const apiKey = "AIzaSyAVcNMQUzkUOyrTdetXMPQ7jKqA6BnEMrQ"; // Replace with your API key

  // Map options
  const mapOptions = {
    zoom: 10,
    center: { lat: 38.722252, lng: -9.139337 }, // Set your desired initial center coordinates
  };

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationName, setLocationName] = useState("");

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

    // Fetch location name using Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results[0]) {
      setLocationName(data.results[0].formatted_address);
      onLocationSelect(data.results[0].formatted_address);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        center={mapOptions.center}
        zoom={mapOptions.zoom}
      />
      {selectedLocation && <Marker position={selectedLocation} />}
    </LoadScript>
  );
};

export default MapContainer;
