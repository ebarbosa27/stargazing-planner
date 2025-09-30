import useQuery from "../api/useQuery";
import { useNavigate } from "react-router";
import "./events.css";

export default function Events() {
  const { data, loading, error } = useQuery("/events", "events");

  const navigate = useNavigate();

  if (loading) return <div>Loading . . . </div>;

  if (error) return <div>ERROR</div>;

  return (
    <div id="eventsPage">
      <h2>Events Page</h2>
      <ol>
        {data?.events
          ? data.events.map((event) => {
              const eventDate = new Date(event.date);
              // const createdDate = new Date(event.created_at);
              return (
                <li key={event.id} onClick={() => navigate(`/events/${event.id}`)}>
                  <div className="listImageContainer">
                    <img src={event.image_urls[0]} alt="View of Location" />
                  </div>
                  <div className="listContentContainer">
                    <h3>{event.name}</h3>
                    <div className="listContent">
                      <p>{event.description}</p>
                      <p>[{event.coordinates}]</p>
                      <p> {eventDate.toLocaleString().split(",")[0]}</p>
                      {/* <p>CREATED AT: {createdDate.toLocaleString().split(",")[0]}</p> */}
                    </div>
                  </div>
                </li>
              );
            })
          : ""}
      </ol>
    </div>
  );
}
