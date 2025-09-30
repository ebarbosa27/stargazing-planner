import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";

export default function RsvpAction({ eventId }) {
  const { data: rsvpEvent } = useQuery(`/events/rsvp/${eventId}`, "clientRsvp");
  const addRsvp = useMutation("POST", "/events/rsvp", ["clientRsvp"]);
  const removeRsvp = useMutation("DELETE", "/events/rsvp", ["clientRsvp"]);
  const changeRsvp = useMutation("PATCH", "/events/rsvp", ["clientRsvp"]);

  if (addRsvp.error || removeRsvp.error) {
    addRsvp.error && console.log("addRsvp", addRsvp.error);
    removeRsvp.error && console.log("removeRsvp", removeRsvp.error);
  }

  if (!rsvpEvent) return <div></div>;

  if (rsvpEvent.exists) {
    if (rsvpEvent.status === "attending") {
      return (
        <>
          <button
            id="attendingBtn"
            onClick={() => {
              removeRsvp.mutate({ eventId });
            }}
          >
            Not attending
          </button>

          <button
            id="interestedBtn"
            onClick={() => {
              changeRsvp.mutate({ eventId, status: "interested" });
            }}
          >
            Switch to Interest
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            id="attendingBtn"
            onClick={() => {
              changeRsvp.mutate({ eventId, status: "attending" });
            }}
          >
            Switch to attending
          </button>
          <button
            id="interestedBtn"
            onClick={() => {
              removeRsvp.mutate({ eventId });
            }}
          >
            Not interested
          </button>
        </>
      );
    }
  } else {
    return (
      <>
        <button
          id="attendingBtn"
          onClick={() => {
            addRsvp.mutate({ eventId, status: "attending" });
          }}
        >
          Attending
        </button>
        <button
          id="interestedBtn"
          onClick={() => {
            addRsvp.mutate({ eventId, status: "interested" });
          }}
        >
          Interested
        </button>
      </>
    );
  }
}
