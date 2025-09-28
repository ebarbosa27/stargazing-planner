import { useEffect } from "react";
import useQuery from "../api/useQuery";
import "./events.css";

export default function Events() {
  const { data, loading, error } = useQuery("/events", "events");

  useEffect(() => {}, []);

  if (loading) return <div>Loading . . . </div>;

  if (error) return <div>ERROR</div>;

  return (
    <div id="eventsPage">
      <h2>Events Page</h2>
      <ol>
        {data?.events
          ? data.events.map((event) => {
              const eventDate = new Date(event.date);
              const createdDate = new Date(event.created_at);
              return (
                <li key={event.id}>
                  <div className="listImageContainer">
                    <img src={event.image_urls[0]} alt="View of Location" />
                  </div>
                  <div className="listContentContainer">
                    <h3>{event.name}</h3>
                    <div className="listContent">
                      <p>{event.description}</p>
                      <p>[{event.coordinates}]</p>
                      <p>EVENT DATE: {eventDate.toLocaleString()}</p>
                      <p>CREATED AT: {createdDate.toLocaleString()}</p>
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
