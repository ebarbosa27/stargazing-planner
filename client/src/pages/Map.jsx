import { useEffect } from "react";

import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import "./map.css";

export default function MapPage() {
  useEffect(() => {}, []);

  return (
    <div>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
        initialViewState={{
          longitude: -87.6324,
          latitude: 41.8832,
          zoom: 11,
        }}
        style={{ width: 800, height: 500 }}
        mapStyle="mapbox://styles/ebarbosa2/cmg374otl00s901qs83ihbmy4
"
      />
    </div>
  );
}
