import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { token } = useAuth();

  return (
    <div id="navbar">
      <div className="pageName">
        <NavLink to="/">Star Gazing</NavLink>
      </div>
      <div className="navLinks">
        <NavLink to="/map" className={({ isActive }) => (isActive ? "activeSite" : "")}>
          Map
        </NavLink>
        <NavLink to="/posts" className={({ isActive }) => (isActive ? "activeSite" : "")}>
          Posts
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => (isActive ? "activeSite" : "")}>
          Events
        </NavLink>
        <NavLink to="/schedule" className={({ isActive }) => (isActive ? "activeSite" : "")}>
          Schedule
        </NavLink>
        <div className="accountContainer">
          {token ? (
            <NavLink to="/account" className={({ isActive }) => (isActive ? "activeSite" : "")}>
              Account
            </NavLink>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "activeSite" : "")}>
                Login
              </NavLink>
              {"/"}
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
