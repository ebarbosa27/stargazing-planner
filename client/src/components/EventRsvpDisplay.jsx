import useQuery from "../api/useQuery";

export default function EventRsvpDisplay({ eventId }) {
  const { data, loading, error } = useQuery(`/events/rsvp/users/${eventId}`, "clientRsvp");

  if (loading) return <div>Loading . . . </div>;
  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  if (data && data.length > 0) {
    console.log(data);
  }

  return (
    <div className="rsvpDisplay">
      <div></div>
    </div>
  );
}
