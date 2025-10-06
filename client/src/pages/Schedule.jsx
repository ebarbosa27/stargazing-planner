import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useQuery from "../api/useQuery";
import "./schedule.css";

export default function Schedule() {
  const navigate = useNavigate();

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
      <h2>RSVP'd Events</h2>
      <div className="eventsListed">
        {upcomingEvents ? (
          <ol>
            {upcomingEvents.map((event) => {
              const [long, lat] = event.coordinates.split(",");

              const eventDate = new Date(event.date);
              const day = dayOfWeek[eventDate.getDay()];
              const [date, time] = eventDate.toLocaleString().split(",");
              const dateString = `${day} ${date} @ ${time}`;

              const dateDifference = eventDate - Date.now();
              const daysAway = dateDifference / (1000 * 60 * 60 * 24);

              return (
                <li key={event.id} onClick={() => navigate(`/events/${event.id}`)}>
                  <div className="eventHeader">
                    <div className="eventDate">{dateString}</div>
                    <div className="eventCountdown">
                      {daysAway > 1 ? `${Math.floor(daysAway)} days away` : "today"}
                    </div>
                  </div>
                  <div className="eventContent">
                    <div className="eventImage">
                      <img src={event.image_urls[0]} alt="" />
                    </div>
                    <div className="eventDetails">
                      <div className="eventName">
                        {event.name}
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
