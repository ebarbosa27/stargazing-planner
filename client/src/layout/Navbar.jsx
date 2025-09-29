import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div id="navbar">
      <div className="pageName">
        <NavLink to="/">Star Gazing</NavLink>
      </div>
      <div className="navLinks">
        <div className="navPages">
          <NavLink to="/posts" className={({ isActive }) => (isActive ? "activeSite" : "")}>
            Posts
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => (isActive ? "activeSite" : "")}>
            Events
          </NavLink>
          <NavLink to="/schedule" className={({ isActive }) => (isActive ? "activeSite" : "")}>
            Schedule
          </NavLink>
          <NavLink to="/map" className={({ isActive }) => (isActive ? "activeSite" : "")}>
            Map
          </NavLink>
        </div>

        <div className="accountContainer">
          {token ? (
            <>
              <NavLink to="/account" className={({ isActive }) => (isActive ? "activeSite" : "")}>
                Account
              </NavLink>
              <button
                style={{ height: "2rem" }}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "activeSite" : "")}>
                Login
              </NavLink>
              <span>{"/"}</span>
              <NavLink to="/register" className={({ isActive }) => (isActive ? "activeSite" : "")}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
