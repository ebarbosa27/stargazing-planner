import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import GalleryCatalogue from "../layout/GalleryCatalogue";
import "./eventItem.css";
import FavoriteAction from "../layout/FavoriteAction";
import { useAuth } from "../auth/AuthContext";

export default function EventItem() {
  const { eventId } = useParams();
  const { token: userToken } = useAuth();

  const { data, loading, error } = useQuery(`/events/details/${eventId}`, "events");

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
        <div>
          <FavoriteAction eventId={eventId} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
