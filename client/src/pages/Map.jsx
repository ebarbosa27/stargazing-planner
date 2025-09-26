import { APIProvider, Map, AdvancedMarker  } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export default function MapPage() {

  const [mapCenter, setMapCenter] = useState({ lat: 41.8832, lng: -87.6324 })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, [])

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Map
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        style={{ width: "1000px", height: "600px" }}
        colorScheme="DARK"
        
        center={mapCenter}
        onCenterChanged={(event) => {
          setMapCenter(event.detail.center)
        }}
        
        defaultZoom={12}
        gestureHandling="greedy"
        disableDefaultUI
      >
      </Map>
    </APIProvider>
  );
}
