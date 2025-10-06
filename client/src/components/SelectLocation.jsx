import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./selectMap.css";

export default function SelectLocation({ selectedLocation, setSelectedLocation }) {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markerRef = useRef();

  // const [center, setCenter] = useState({ lng: -98.5556199, lat: 39.8097343 });
  const [lng, setLng] = useState(-98.5556199);
  const [lat, setLat] = useState(39.8097343);
  const [zoom, setZoom] = useState(3.5);

  const MAPBOX_KEY = import.meta.env.VITE_MAPBOX_API_KEY;

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_KEY;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: { lat, lng },
      zoom: zoom,
    });

    markerRef.current = new mapboxgl.Marker();

    map.on("move", () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      setLng(mapCenter.lng);
      setLat(mapCenter.lat);
      setZoom(mapZoom);
    });

    map.addControl(
      new mapboxgl.GeolocateControl({ showUserHeading: true, fitBoundsOptions: { maxZoom: 9 } })
    );

    mapRef.current = map;

    return () => {
      mapRef.current.remove();
    };
  }, []);

  function handleSelector(e) {
    e.preventDefault();
    markerRef.current.setLngLat({ lat, lng }).addTo(mapRef.current);
    setSelectedLocation({ latitude: lat, longitude: lng });
  }

  return (
    <>
      <div className="selectMap" ref={mapContainerRef}>
        <img id="mapCrosshair" src="map-crosshair.svg" alt="Center Marker" />
      </div>
      <div className="locationContainer">
        {lng && lat && (
          <>
            {selectedLocation && <input type="hidden" value={selectedLocation} name="location" />}
            <div className="locationInput">Lat: {lat.toFixed(6)}</div>
            <div className="locationInput">Lng: {lng.toFixed(6)}</div>
          </>
        )}
        <button onClick={handleSelector}>Select</button>
      </div>
    </>
  );
}
