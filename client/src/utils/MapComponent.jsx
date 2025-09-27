import { useApiIsLoaded, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export default function MapComponent() {
  const [mapCenter, setMapCenter] = useState({ lat: 41.8832, lng: -87.6324 });
  const [userPosition, setUserPosition] = useState(null);

  const apiIsLoaded = useApiIsLoaded();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, [apiIsLoaded]);

  return (
    <>
      <Map
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        style={{ width: "1000px", height: "600px" }}
        colorScheme="DARK"
        center={mapCenter}
        onCenterChanged={(event) => {
          setMapCenter(event.detail.center);
        }}
        defaultZoom={12}
        gestureHandling="greedy"
        disableDefaultUI
      >
        {userPosition ? <AdvancedMarker position={userPosition}></AdvancedMarker> : ""}
      </Map>
    </>
  );
}
