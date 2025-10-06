import { useNavigate } from "react-router";
import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";

export default function UserEventsList() {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery("/users/events", "events");
  const { mutate: deleteEvent } = useMutation("DELETE", "/events", ["events"]);

  if (loading) return <div>Loading. . .</div>;
  if (error) {
    console.error(error);
    return <div>{error}</div>;
  }

  async function handleDeleteEvent(eventId) {
    await deleteEvent({ eventId });
  }

  return (
    <ul>
      {data?.events &&
        data.events.map((event) => {
          const eventDate = new Date(event.date);
          return (
            <li key={event.id}>
              <div>{eventDate.toLocaleString().split(",")[0]}</div>
              <a className="eventName" onClick={() => navigate(`/events/${event.id}`)}>
                {event.name}
              </a>
              <button
                onClick={() => {
                  handleDeleteEvent(event.id);
                }}
              >
                delete
              </button>
            </li>
          );
        })}
    </ul>
  );
}
