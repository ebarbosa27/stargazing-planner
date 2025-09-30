import useQuery from "../api/useQuery";
import EventCatalogue from "../components/EventCatalogue";
import "./account.css";

export default function Account() {
  const { data, loading, error } = useQuery("/users/accountPage", "accountPage");

  if (loading) return <div>Loading . . .</div>;

  if (error) {
    console.log(error);
    return <div>ERROR</div>;
  }

  return (
    <div id="accountPage">
      <h2>Account Page</h2>
      <div>
        {data ? (
          <div>
            <p>Hello {data.username}!</p>
            <div className="eventInteractions">
              <div>
                <h3>RSVPs</h3>
                <EventCatalogue events={data.rsvp_events} componentName="rsvp" />
              </div>
              <div>
                <h3>Favorites</h3>
                <EventCatalogue events={data.favorite_events} componentName="favorite" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
