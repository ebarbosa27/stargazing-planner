import useMutation from "../api/useMutation";

export default function InterestedButton({ eventId, rsvpEvent: { data, loading, error } }) {
  const addRsvp = useMutation("POST", "/events/rsvp", ["clientRsvp"]);
  const removeRsvp = useMutation("DELETE", "/events/rsvp", ["clientRsvp"]);
  const changeRsvp = useMutation("PATCH", "/events/rsvp", ["clientRsvp"]);

  if (loading) return <button>Loading...</button>;
  if (error) {
    console.log(error);
    return <button />;
  }

  if (!data) return <button disabled>Interested</button>;

  function handleAttendingButton() {
    if (data.status === "interested") {
      removeRsvp.mutate({ eventId });
    } else if (data.status === "attending") {
      changeRsvp.mutate({ eventId, status: "interested" });
    } else {
      addRsvp.mutate({ eventId, status: "interested" });
    }
  }

  if (data.status === "interested") {
    return <button onClick={handleAttendingButton}>Not Interested</button>;
  }

  if (data.status === "attending") {
    return <button onClick={handleAttendingButton}>Switch to Interested</button>;
  }

  return <button onClick={handleAttendingButton}>Interested</button>;
}
