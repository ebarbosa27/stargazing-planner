import useMutation from "../api/useMutation";

export default function AttendingButton({ eventId, rsvpEvent: { data, loading, error } }) {
  const addRsvp = useMutation("POST", "/events/rsvp", ["clientRsvp"]);
  const removeRsvp = useMutation("DELETE", "/events/rsvp", ["clientRsvp"]);
  const changeRsvp = useMutation("PATCH", "/events/rsvp", ["clientRsvp"]);

  if (loading) return <button>Loading...</button>;
  if (error) {
    console.log(error);
    return <button />;
  }
  if (!data) return <button disabled>Attending</button>;

  function handleAttendingButton() {
    if (data.status === "attending") {
      removeRsvp.mutate({ eventId });
    } else if (data.status === "interested") {
      changeRsvp.mutate({ eventId, status: "attending" });
    } else {
      addRsvp.mutate({ eventId, status: "attending" });
    }
  }

  if (data.status === "attending") {
    return <button onClick={handleAttendingButton}>Not Attending</button>;
  }

  if (data.status === "interested") {
    return <button onClick={handleAttendingButton}>Switch To Attending</button>;
  }

  return <button onClick={handleAttendingButton}>Attending</button>;
}
