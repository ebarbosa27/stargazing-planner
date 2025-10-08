import { useState } from "react";
import useQuery from "../api/useQuery";
import EventCatalogue from "../components/EventCatalogue";
import CreateEventDisplay from "../components/CreateEventDisplay";
import UserEventsList from "../components/UserEventsList";
import "./account.css";

export default function Account() {
  const [showEvent, setShowEvent] = useState(false);

  const { data, loading, error } = useQuery("/users/accountPage", "accountPage");

  if (error) {
    console.error(error);
    return <div>ERROR</div>;
  }
  if (loading || !data) return <div>Loading . . .</div>;

  return (
    <div id="accountPage">
      <div className="accountInfo">
        <div>
          <h3>Hello {data.username}!</h3>
          <p>{data.email}</p>
          <button onClick={() => setShowEvent(true)}>Create Event</button>
          {/* <button>Create Hotspot</button> */}
        </div>
        <div className="userActivities">
          <h3>My Events</h3>
          <UserEventsList />
        </div>
      </div>
      <div className="eventInteractions">
        <EventCatalogue events={data.rsvp_events} componentName="rsvp" />
        <EventCatalogue events={data.favorite_events} componentName="favorite" />
      </div>
      {showEvent && <CreateEventDisplay setShowEvent={setShowEvent} />}
    </div>
  );
}
