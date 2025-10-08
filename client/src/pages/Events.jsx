import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import EventsMapComponent from "../components/EventsMapComponent";
import EventListings from "../components/EventListings";
import "./events.css";
import { useEffect, useState } from "react";

export default function Events() {
  const defaultEvents = useQuery("/events/upcoming?limit=10", "events");
  const searchEvents = useMutation("POST", "/events/upcoming/search?limit=10", ["nearbyEvents"]);

  const [markerEvents, setMarkerEvents] = useState();

  useEffect(() => {
    if (searchEvents.data) {
      setMarkerEvents(searchEvents.data.events);
    } else if (defaultEvents.data) {
      setMarkerEvents(defaultEvents.data.events);
    }
  }, [defaultEvents, searchEvents]);

  if (defaultEvents.loading) return <div>Loading . . . </div>;

  if (defaultEvents.error) return <div>ERROR</div>;

  function handleSearchArea(searchBound) {
    console.log(searchBound);
    searchEvents.mutate(searchBound);
  }

  return (
    <div id="eventsPage">
      <h2>Events </h2>
      {defaultEvents?.data && (
        <EventsMapComponent refetchData={handleSearchArea} searchEvents={markerEvents} />
      )}
      <EventListings events={markerEvents} />
    </div>
  );
}
