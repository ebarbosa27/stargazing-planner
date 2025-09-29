import useQuery from "../api/useQuery";

export default function Account() {
  const { data, loading, error } = useQuery("/users/accountPage", "accountPage");

  if (loading) return <div>Loading . . .</div>;

  if (error) {
    console.log(error);
    return <div>ERROR</div>;
  }

  if (data) console.log(data);

  return (
    <>
      <h2>Account Page</h2>
      <div>
        {data ? (
          <div>
            <p>Hello {data.username}!</p>
            <div>
              <h3>RSVPs</h3>
              {data.rsvp_events ? (
                <ul>
                  {data.rsvpEvents.map((event) => {
                    return <li key={event.id}>{event.name}</li>;
                  })}
                </ul>
              ) : (
                "No events rsvp'd"
              )}
            </div>
            <div>
              <h3>Favorites</h3>
              {data.rsvp_events ? (
                <ul>
                  {data.favoriteEvents.map((event) => {
                    return <li key={event.id}>{event.name}</li>;
                  })}
                </ul>
              ) : (
                "No events favorited"
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
