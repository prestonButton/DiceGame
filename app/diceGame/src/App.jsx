// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";
import Account from "./pages/account";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/game/:gameId" component={Game} />
        <Route path="/account" component={Account} />
      </Routes>
    </Router>
  );
}

export default App;
