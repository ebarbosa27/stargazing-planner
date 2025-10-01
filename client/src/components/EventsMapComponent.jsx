import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";

export default function EventsMapComponent({ refetchData, searchEvents }) {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  const [center, setCenter] = useState([-98.5556199, 39.8097343]);
  const [zoom, setZoom] = useState(3.5);
  const [markers] = useState(new Array());

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
    });

    map.addControl(
      new mapboxgl.GeolocateControl({ showUserHeading: true, fitBoundsOptions: { maxZoom: 9 } })
    );

    mapRef.current = map;

    if (searchEvents) console.log(searchEvents);

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (searchEvents) {
      searchEvents.forEach((event) => {
        const marker = new mapboxgl.Marker().setLngLat(event.coordinates).addTo(mapRef.current);
        markers.push(marker);
      });
    }
  }, [searchEvents]);

  function removeAllMarkers() {
    markers.filter((marker) => {
      marker.remove();
      return false;
    });
  }

  function handleSearchAreaBtn() {
    removeAllMarkers();

    const map = mapRef.current;
    const bounds = map.getBounds();

    const mark1 = [bounds._sw.lng, bounds._sw.lat];
    const mark2 = [bounds._ne.lng, bounds._ne.lat];

    refetchData({
      long1: mark1[0],
      lat1: mark1[1],
      long2: mark2[0],
      lat2: mark2[1],
    });
  }

  return (
    <>
      <div className="eventMapContainer" ref={mapContainerRef} />
      <button onClick={handleSearchAreaBtn}>Search This Area</button>
    </>
  );
}
