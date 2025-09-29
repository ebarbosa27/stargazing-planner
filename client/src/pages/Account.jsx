import { useNavigate } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";

export default function Account() {
  const { data, loading, error } = useQuery("/users", "loggedInUser");

  const navigate = useNavigate();
  const { logout } = useAuth();

  if (loading) return <div>Loading . . .</div>;

  if (error) {
    console.log(error);
    return <div>ERROR</div>;
  }

  return (
    <>
      <h2>Account Page</h2>
      {data ? (
        <div>
          <p>Hello {data.username}!</p>
        </div>
      ) : (
        ""
      )}
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Sign Out
      </button>
    </>
  );
}
