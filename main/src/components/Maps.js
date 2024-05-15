import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapContainer = () => {
  return (
    <iframe
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAVcNMQUzkUOyrTdetXMPQ7jKqA6BnEMrQ&q&libraries=places"
      className="maps_frame"
      width="100%"
      height="100%"
      loading="lazy"
      allowFullScreen
    ></iframe>
  );
};

export default MapContainer;
