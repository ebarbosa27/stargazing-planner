import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import "./events.css";
import EventsMapComponent from "../components/EventsMapComponent";
import EventListings from "../components/EventListings";

export default function Events() {
  const allEvents = useQuery("/events", "events");
  const searchEvents = useMutation("POST", "/events/search", ["nearbyEvents"]);

  if (allEvents.loading) return <div>Loading . . . </div>;

  if (allEvents.error) return <div>ERROR</div>;

  function handleSearchArea(searchBound) {
    searchEvents.mutate(searchBound);
  }

  return (
    <div id="eventsPage">
      <h2>Events Page</h2>
      {allEvents.data?.events && (
        <EventsMapComponent
          refetchData={handleSearchArea}
          searchEvents={searchEvents.data?.events}
        />
      )}
      <ol>
        <EventListings
          events={searchEvents?.data ? searchEvents?.data?.events : allEvents?.data?.events}
        />
      </ol>
    </div>
  );
}
