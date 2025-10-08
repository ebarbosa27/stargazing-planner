import { useNavigate } from "react-router";
import "./eventListings.css";

export default function EventListings({ events }) {
  const navigate = useNavigate();

  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  if (!events) return <div>Error no events</div>;
  if (events.length === 0) return <div>No events in this area</div>;

  return (
    <ol className="eventsListing">
      {events && events.length > 0 ? (
        events.map((event) => {
          const [long, lat] = event.coordinates;

          const eventDate = new Date(event.date);
          const day = dayOfWeek[eventDate.getDay()];
          const [date, time] = eventDate.toLocaleString().split(",");
          const dateString = `${day} ${date} @ ${time}`;

          const dateDifference = eventDate - Date.now();
          const daysAway = dateDifference / (1000 * 60 * 60 * 24);

          return (
            <li
              key={event.id}
              onClick={(e) => {
                if (e.target.id === "googleNavigation") return;
                navigate(`/events/${event.id}`);
              }}
            >
              <div className="eventImage">
                <img src={event.image_urls[0]} alt="" />
              </div>
              <div className="eventContent">
                <div className="eventHeader">
                  <div className="eventDate">{dateString}</div>
                  <div className="eventCountdown">
                    {daysAway > 0 ? `${Math.floor(daysAway)} days away` : "passed"}
                  </div>
                </div>
                <div className="eventDetails">
                  <div className="eventName">
                    {event.name}
                    <a id="googleNavigation" href={`https://maps.google.com/?q=${lat},${long}`}>
                      [{event.coordinates}]
                    </a>
                  </div>
                  <div className="eventDescription">{event.description}</div>
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <p>No RSVPs listed</p>
      )}
    </ol>
  );
}
