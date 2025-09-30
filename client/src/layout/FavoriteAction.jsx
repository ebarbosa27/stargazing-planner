import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";

export default function FavoriteAction({ eventId }) {
  const { data: favoriteEvent } = useQuery(`/events/favorite/${eventId}`, "clientFavorites");
  const addFavorite = useMutation("POST", "/events/favorite", ["clientFavorites"]);
  const removeFavorite = useMutation("DELETE", "/events/favorite", ["clientFavorites"]);

  if (addFavorite.error || removeFavorite.error) {
    addFavorite.error && console.log("addFavorite", addFavorite.error);
    removeFavorite.error && console.log("removeFavorite", removeFavorite.error);
  }

  if (!favoriteEvent) return <div></div>;

  function handleEventAction() {
    if (favoriteEvent.exists) {
      removeFavorite.mutate({ eventId });
    } else {
      addFavorite.mutate({ eventId });
    }
  }

  if (favoriteEvent.exists) {
    return <button onClick={handleEventAction}>Unfavorite</button>;
  } else {
    return <button onClick={handleEventAction}>Favorite</button>;
  }
}
