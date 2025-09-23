import { Routes, Route } from "react-router";
import "./App.css";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import TestPage from "./pages/Test";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Events from "./pages/Events";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <div id="app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/events" element={<Events />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
        <Route element={<Layout disableNavbar />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
