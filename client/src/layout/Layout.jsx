import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout({ disableNavbar }) {
  return (
    <>
      {disableNavbar ? "" : <Navbar />}
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}
