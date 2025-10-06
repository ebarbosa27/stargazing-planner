import { useEffect, useState } from "react";
import useQuery from "../api/useQuery";
import "./schedule.css";

export default function Schedule() {
  const [upcomingEvents, setUpcomingEvents] = useState(null);

  const { data: rsvpEvents, loading, error } = useQuery("/users/rsvps", "events");

  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
      <h2>Schedule Page</h2>
      <div className="eventsListed">
        <h3>RSVPs</h3>
        {upcomingEvents ? (
          <ol>
            {upcomingEvents.map((event) => {
              const [long, lat] = event.coordinates.split(",");
              const eventDate = new Date(event.date);
              const day = dayOfWeek[eventDate.getDay()];
              const [date, time] = eventDate.toLocaleString().split(",");
              const dateString = `${day} ${date} @ ${time}`;
              return (
                <li key={event.id}>
                  <div className="eventDate">{dateString}</div>
                  <div className="eventContent">
                    <div className="eventImage">
                      <img src={event.image_urls[0]} alt="" />
                    </div>
                    <div className="eventDetails">
                      <div className="eventName">
                        {event.name}{" "}
                        <a href={`https://maps.google.com/?q=${lat},${long}`}>
                          [{event.coordinates}]
                        </a>
                      </div>
                      <div className="eventDescription">{event.description}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <p>No RSVPs listed</p>
        )}
      </div>
    </div>
  );
}
