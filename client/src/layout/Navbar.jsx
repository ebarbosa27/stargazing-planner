import { NavLink } from "react-router";
import "./navbar.css";

export default function Navbar() {
  return (
    <div id="navbar">
      <div className="pageName">
        <NavLink to="/">Star Gazing</NavLink>
      </div>
      <div className="navLinks">
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
          <NavLink>Login / Sign Up</NavLink>
          {/* change to switch to account button when logged in */}
        </div>
      </div>
    </div>
  );
}
