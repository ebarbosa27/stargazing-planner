import { Routes, Route } from "react-router";
import "./App.css";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import TestPage from "./pages/Test";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div id="app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
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
