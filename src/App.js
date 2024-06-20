import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForms from "./components/LoginForms";
import HomePage from "./Pages/HomePage";
import ListingPages from "./Pages/ListingPages";
import DetailPages from "./Pages/DetailPages";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForms />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/listagem" element={<ListingPages />} />
          <Route path="/details/:id" element={<DetailPages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
