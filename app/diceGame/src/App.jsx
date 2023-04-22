

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";
import Lobby from "./pages/lobby";
import Login from './pages/login'
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<Game />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
