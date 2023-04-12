// src/App.js

// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";
import Account from "./pages/account";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<Game />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<AuthForm type='login'/>} />
        <Route path="/signup" element={<AuthForm type='signup'/>} />
      </Routes>
    </Router>
  );
}

export default App;
