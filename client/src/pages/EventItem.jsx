import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import GalleryCatalogue from "../layout/GalleryCatalogue";
import "./eventItem.css";

export default function EventItem() {
  const { eventId } = useParams();

  const { data, loading, error } = useQuery(`/events/${eventId}`, "events");

  if (loading) return <div>Loading . . .</div>;
  if (error) {
    console.log(error);
    return <div>Encounterd error</div>;
  }

  return (
    <div id="eventItemPage">
      {data ? (
        <div>
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <GalleryCatalogue data={data} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
