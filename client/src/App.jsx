import { Routes, Route } from "react-router";
import "./App.css";

import Home from "./pages/Home";

function App() {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
