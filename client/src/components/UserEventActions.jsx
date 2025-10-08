import FavoriteAction from "./FavoriteAction";
import AttendingButton from "./AttendingButton";
import InterestedButton from "./InterestedButton";

export default function UserEventActions({ eventId, rsvpEvent }) {
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
