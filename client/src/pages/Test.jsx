import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";

export default function TestPage() {
  const [latitude, setLatitude] = useState(38.78);
  const [longitude, setLongitude] = useState(-98.45);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const clientPos = position.coords;
      setLatitude(clientPos.latitude);
      setLongitude(clientPos.longitude);
    },
    (error) => {
      console.error("Error getting geolocation:", error);
    },
    {
      enableHighAccuracy: true, // Request high accuracy (may use more power)
      timeout: 5000, // Maximum time to wait for a position (in milliseconds)
      maximumAge: 0, // Don't use a cached position
    }
  );
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Map
        style={{ width: "50vw", height: "50vh" }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={4}
        gestureHandling="greedy"
      />
    </APIProvider>
  );
}
