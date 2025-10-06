import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./selectMap.css";

export default function SelectLocation() {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markerRef = useRef();

  const [center, setCenter] = useState({ lng: -98.5556199, lat: 39.8097343 });
  const [zoom, setZoom] = useState(3.5);

  const MAPBOX_KEY = import.meta.env.VITE_MAPBOX_API_KEY;

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_KEY;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });

    markerRef.current = new mapboxgl.Marker().setLngLat(center).addTo(map);

    map.on("move", () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      setCenter(mapCenter);
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
    markerRef.current.setLngLat(center);
  }

  return (
    <>
      <div className="selectMap" ref={mapContainerRef}>
        <img id="mapCrosshair" src="map-crosshair.svg" alt="Center Marker" />
      </div>
      <div className="locationContainer">
        {center?.lng && center?.lat && (
          <div>
            {center.lng.toFixed(6)}, {center.lat.toFixed(6)}
          </div>
        )}
        <button onClick={handleSelector}>Select</button>
      </div>
    </>
  );
}
