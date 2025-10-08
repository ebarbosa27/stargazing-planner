import { NavLink, useParams } from "react-router";
import useQuery from "../api/useQuery";
import GalleryCatalogue from "../components/GalleryCatalogue";
import "./eventItem.css";
import { useAuth } from "../auth/AuthContext";
import UserEventActions from "../components/UserEventActions";
import { useEffect, useState } from "react";

export default function EventItem() {
  const { eventId } = useParams();
  const { token: userToken } = useAuth();

  const { data, loading, error } = useQuery(`/events/details/${eventId}`, "events");

  const [eventDate, setEventDate] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(null);

  useEffect(() => {
    if (!data) return;
    const newDate = new Date(data.date);
    const dateArray = newDate.toLocaleString().split(",");
    setEventDate(dateArray);
  }, [data]);

  if (loading) return <div>Loading . . .</div>;
  if (error) {
    return <div>Encounterd error</div>;
  }
  if (!data) return <div id="eventItemPage" />;

  return (
    <div id="eventItemPage">
      <div className="eventItemHeader">
        <h2>{data.name}</h2>
        {eventDate && (
          <span>
            Event Date: {eventDate[0]} @ {eventDate[1]}
          </span>
        )}
      </div>
      <div className="eventItemSubheader">
        <div className="eventLocation">
          <h3>Location:</h3>
          <a href={`https://maps.google.com/?q=${data.coordinates[1]},${data.coordinates[0]}`}>
            [{data.coordinates[0]}, {data.coordinates[1]}]
          </a>
        </div>
        {rsvpStatus && (
          <div className="eventStatus">
            <h3>Status: </h3>
            {rsvpStatus?.exists ? <span>{rsvpStatus.status}</span> : <span>Not attending</span>}
          </div>
        )}
      </div>
      <div>
        <h3>About This Event</h3>
        <p>{data.description}</p>
      </div>

      <div>
        <h3>Gallery</h3>
        {data?.image_urls ? (
          <GalleryCatalogue data={data} />
        ) : (
          <div style={{ height: "100px" }}>[No images]</div>
        )}
      </div>
      {userToken ? (
        <UserEventActions eventId={eventId} setRsvpStatus={setRsvpStatus} />
      ) : (
        <NavLink to="/register">Interested in attending? Sign up here!</NavLink>
      )}
    </div>
  );
}
