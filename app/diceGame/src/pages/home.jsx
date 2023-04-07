import React from "react";
import { Link } from "react-router-dom";
import SpinningDice from "../components/SpinningDice";

const HomePage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-600 to-pink-500 relative">
      <div className="absolute top-6 right-6 text-white">
        <Link
          to="/signup"
          className="m-2 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="m-2 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md"
        >
          Log In
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div>
          <h1 className="text-5xl sm:text-9xl font-bold text-white mb-4">
            10,000
          </h1>
          <h2 className="text-3xl lg:text-5xl text-white">
            Multiplayer Dice Game
          </h2>
        </div>
        <SpinningDice />
      </div>
    </div>
  );
};

export default HomePage;
