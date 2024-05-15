import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapContainer = () => {
  // Google Maps API Key
  const apiKey = "AIzaSyAVcNMQUzkUOyrTdetXMPQ7jKqA6BnEMrQ"; // Replace with your API key

  // Map options
  const mapOptions = {
    zoom: 10,
    center: { lat: 38.722252, lng: -9.139337 }, // Set your desired initial center coordinates
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "740px" }}
        center={mapOptions.center}
        zoom={mapOptions.zoom}
      />
    </LoadScript>
  );
};

export default MapContainer;
