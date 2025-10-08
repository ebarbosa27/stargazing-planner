import FavoriteAction from "./FavoriteAction";
import AttendingButton from "./AttendingButton";
import InterestedButton from "./InterestedButton";
import useQuery from "../api/useQuery";
import { useEffect } from "react";

export default function UserEventActions({ eventId, setRsvpStatus }) {
  const rsvpEvent = useQuery(`/events/rsvp/${eventId}`, "clientRsvp");

  useEffect(() => {
    if (rsvpEvent?.data?.exists) {
      setRsvpStatus(rsvpEvent.data);
    }
  }, [rsvpEvent]);

  return (
    <div className="eventActionContainer">
      <FavoriteAction eventId={eventId} />
      <div>
        <AttendingButton eventId={eventId} rsvpEvent={rsvpEvent} />
        <InterestedButton eventId={eventId} rsvpEvent={rsvpEvent} />
      </div>
    </div>
  );
}
