import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Account() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <h2>Account Page</h2>
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
