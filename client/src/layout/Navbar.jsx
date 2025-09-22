import { NavLink } from "react-router";
import "./navbar.css";

export default function Navbar() {
  return (
    <div id="navbar">
      <div>Star Gazing</div>
      <div className="navLinks">
        <NavLink>Posts</NavLink>
        <NavLink>Events</NavLink>
        <NavLink>Schedule</NavLink>
      </div>
      <div>Login</div>
    </div>
  );
}
