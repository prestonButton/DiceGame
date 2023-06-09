import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";
import Lobby from "./pages/lobby";
import Login from "./pages/Login";
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id/*" element={<Game />} />
        <Route path="/lobby/:id/*" element={<Lobby />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
