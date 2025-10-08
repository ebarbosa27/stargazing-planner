import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import EventsMapComponent from "../components/EventsMapComponent";
import EventListings from "../components/EventListings";
import "./events.css";
import { useEffect, useState } from "react";

export default function Events() {
  const defaultEvents = useQuery("/events", "events");
  const searchEvents = useMutation("POST", "/events/search", ["nearbyEvents"]);

  const [markerEvents, setMarkerEvents] = useState();

  useEffect(() => {
    if (searchEvents.data) {
      setMarkerEvents(searchEvents.data);
    } else if (defaultEvents.data) {
      setMarkerEvents(defaultEvents.data);
    }
  }, [defaultEvents, searchEvents]);

  if (defaultEvents.loading || !markerEvents?.events) return <div>Loading . . . </div>;

  if (defaultEvents.error) return <div>ERROR</div>;

  function handleSearchArea(searchBound) {
    searchEvents.mutate(searchBound);
  }

  return (
    <div id="eventsPage">
      <h2>Events </h2>
      {defaultEvents.data?.events && (
        <EventsMapComponent
          refetchData={handleSearchArea}
          searchEvents={searchEvents.data?.events}
        />
      )}
      <EventListings events={markerEvents.events} />
    </div>
  );
}
