import React from "react";
import "../tailwind.css";
import "./home.css";
import SpinningDice from "../components/spinningDice";

const Homepage = () => {
  return (
    <div className="container mx-auto px-4">
      <SpinningDice />
    </div>
  );
};

export default Homepage;
