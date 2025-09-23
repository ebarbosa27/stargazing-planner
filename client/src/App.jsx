import { Routes, Route } from "react-router";
import "./App.css";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import TestPage from "./pages/Test";
import Register from "./pages/Register";

function App() {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
