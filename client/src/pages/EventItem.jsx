import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import GalleryCatalogue from "../components/GalleryCatalogue";
import "./eventItem.css";
import FavoriteAction from "../components/FavoriteAction";
import { useAuth } from "../auth/AuthContext";
import RsvpAction from "../components/RsvpAction";
import EventRsvpDisplay from "../components/EventRsvpDisplay";
import AttendingButton from "../components/AttendingButton";
import InterestedButton from "../components/InterestedButton";

export default function EventItem() {
  const { eventId } = useParams();
  const { token: userToken } = useAuth();

  const { data, loading, error } = useQuery(`/events/details/${eventId}`, "events");
  const rsvpEvent = useQuery(`/events/rsvp/${eventId}`, "clientRsvp");

  if (loading) return <div>Loading . . .</div>;
  if (error) {
    console.log(error);
    return <div>Encounterd error</div>;
  }
  if (!data) return <div id="eventItemPage" />;

  return (
    <div id="eventItemPage">
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <GalleryCatalogue data={data} />
      {userToken ? (
        <div className="eventActionContainer">
          <FavoriteAction eventId={eventId} />
          <div>
            <AttendingButton eventId={eventId} rsvpEvent={rsvpEvent} />
            <InterestedButton eventId={eventId} rsvpEvent={rsvpEvent} />
          </div>
          {/* <RsvpAction eventId /> */}
        </div>
      ) : (
        <div />
      )}
      <div>{/* <EventRsvpDisplay eventId={eventId} rsvpEvent={rsvpEvent} /> */}</div>
    </div>
  );
}
