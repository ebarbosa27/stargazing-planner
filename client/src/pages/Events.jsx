import { useEffect } from "react";
import useQuery from "../api/useQuery";

export default function Events() {
  const { data, loading, error } = useQuery("/events", "events");

  useEffect(() => {}, []);

  if (loading) return <div>Loading . . . </div>;

  if (error) return <div>ERROR</div>;

  return (
    <>
      <h2>Events Page</h2>
      <ol>
        {data?.events
          ? data.events.map((event) => {
              // console.log(event);
              const eventDate = new Date(event.date);
              const createdDate = new Date(event.created_at);
              return (
                <li key={event.id}>
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <p>[{event.coordinates}]</p>
                  <p>EVENT DATE: {eventDate.toLocaleString()}</p>
                  <p>CREATED AT: {createdDate.toLocaleString()}</p>
                </li>
              );
            })
          : ""}
      </ol>
    </>
  );
}
