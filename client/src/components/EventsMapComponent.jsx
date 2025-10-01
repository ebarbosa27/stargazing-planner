import { useEffect, useRef, useState } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";

export default function EventsMapComponent({ eventsData }) {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  const [center, setCenter] = useState([-98.5556199, 39.8097343]);
  const [zoom, setZoom] = useState(3.5);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      style: "mapbox://styles/ebarbosa2/cmg374otl00s901qs83ihbmy4/draft",
    });

    map.on("move", () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      setCenter(mapCenter);
      setZoom(mapZoom);

      if (mapZoom > 10) {
        // get events nearby
      }
    });

    map.addControl(
      new mapboxgl.GeolocateControl({ showUserHeading: true, fitBoundsOptions: { maxZoom: 9 } })
    );

    mapRef.current = map;

    return () => {
      mapRef.current.remove();
    };
  }, []);

  if (eventsData) {
    // eventsData.forEach((event) => {
    //   new mapboxgl.Marker({
    //     color: "#FFFFFF",
    //   })
    //     .setLngLat(event.coordinates)
    //     .addTo(mapRef.current);
    // });
  }

  return (
    <>
      <div className="eventMapContainer" ref={mapContainerRef} />
    </>
  );
}
