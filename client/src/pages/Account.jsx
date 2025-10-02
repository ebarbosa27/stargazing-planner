import useQuery from "../api/useQuery";
import EventCatalogue from "../components/EventCatalogue";
import "./account.css";

export default function Account() {
  const { data, loading, error } = useQuery("/users/accountPage", "accountPage");

  if (error) {
    console.log(error);
    return <div>ERROR</div>;
  }
  if (loading || !data) return <div>Loading . . .</div>;

  console.log(data);

  return (
    <div id="accountPage">
      <div className="accountInfo">
        <h3>Hello {data.username}!</h3>
        <p>{data.email}</p>
        <button>Create Event</button>
        <button>Create Hotspot</button>
      </div>
      <div className="eventInteractions">
        <EventCatalogue events={data.rsvp_events} componentName="rsvp" />
        <EventCatalogue events={data.favorite_events} componentName="favorite" />
      </div>
    </div>
  );
}
