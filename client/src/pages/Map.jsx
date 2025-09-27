import { APIProvider } from "@vis.gl/react-google-maps";
import MapComponent from "../utils/MapComponent";

export default function MapPage() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <MapComponent />
    </APIProvider>
  );
}
