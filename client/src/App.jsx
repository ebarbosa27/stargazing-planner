import { Routes, Route } from "react-router";
import "./App.css";

import Layout from "./layout/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
