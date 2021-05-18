import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Content from "./components/Content";
import "./App.css";
function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

export default App;
