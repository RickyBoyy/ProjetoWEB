import React from "react";
import { useParams } from "react-router-dom";
import MapContainer from "../components/Maps";

const MapPage = () => {
  const { apiKey } = useParams();

  return (
    <div>
      <h1>Google Map Page</h1>
      <MapContainer apiKey={apiKey} />
    </div>
  );
};

export default MapPage;
