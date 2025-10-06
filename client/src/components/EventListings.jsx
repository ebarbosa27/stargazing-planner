import { useNavigate } from "react-router";

export default function EventListings({ events }) {
  const navigate = useNavigate();

  if (!events) return <div>Loading . . .</div>;

  if (events.length === 0) return <div>No events in this area</div>;

  return (
    <>
      {events.map((event) => {
        const eventDate = new Date(event.date);
        return (
          <li key={event.id} onClick={() => navigate(`/events/${event.id}`)}>
            <div className="listImageContainer">
              <img
                src={event.image_urls ? event.image_urls[0] : undefined}
                alt="View of Location"
              />
            </div>
            <div className="listContentContainer">
              <h3>{event.name}</h3>
              <div className="listContent">
                <p>{event.description}</p>
                <p> {eventDate.toLocaleString().split(",")[0]}</p>
                {/* <p>CREATED AT: {createdDate.toLocaleString().split(",")[0]}</p> */}
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
}
