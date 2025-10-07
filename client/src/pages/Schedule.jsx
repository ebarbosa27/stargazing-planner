import { useEffect, useState } from "react";
import useQuery from "../api/useQuery";
import EventListings from "../components/EventListings";
import "./schedule.css";

export default function Schedule() {
  const { data: rsvpEvents, loading, error } = useQuery("/users/rsvps", "events");

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    if (!rsvpEvents?.events) return;
    const upcoming = rsvpEvents.events.filter((event) => {
      const eventDate = new Date(event.date);
      if (eventDate > Date.now()) return true;
    });
    setUpcomingEvents(upcoming);
  }, [rsvpEvents]);

  useEffect(() => {
    if (!rsvpEvents || upcomingEvents) return;
    const upcoming = rsvpEvents.events.filter((event) => {
      const eventDate = new Date(event.date);
      if (eventDate > Date.now()) return true;
    });
    setUpcomingEvents(upcoming);
  }, [rsvpEvents, upcomingEvents]);

  if (loading) return <div>Loading . . .</div>;
  if (error) {
    console.log(error);
    return <div>{error}</div>;
  }

  return (
    <div id="schedulePage">
      <h2>RSVP'd Events</h2>
      <div className="eventsListed">
        {upcomingEvents ? <EventListings events={upcomingEvents} /> : <p>No RSVPs listed</p>}
      </div>
    </div>
  );
}
