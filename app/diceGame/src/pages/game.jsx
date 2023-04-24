import React from "react";
import { Link } from "react-router-dom";
import Dice from "../components/Dice.jsx";
import UserCard from "../components/UserCard.jsx";

const Game = () => {
  const dots = 3; // Set all dice to 3 dots for now
  const users = [
    { name: "Tom Brady", score: 0 },
    { name: "LeBum James", score: 0 },
    { name: "Lionel Messi", score: 0 },
    { name: "Christiano Ronaldo", score: 0 },
    { name: "Aaron Judge", score: 0 },
    { name: "Connor McGregor", score: 0 },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-600 to-pink-500 relative">
      <Link
        to="/"
        className="absolute top-4 right-4 m-2 py-2 px-4 bg-red-500 text-white font-semibold rounded-md"
      >
        Leave Game
      </Link>

      <div className="flex flex-col items-center justify-center pt-16">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {users.map((user, idx) => (
            <UserCard key={idx} name={user.name} score={user.score} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(6)].map((_, idx) => (
            <Dice key={idx} dots={dots} />
          ))}
        </div>

        <div className="flex items-center justify-center mt-8">
          <button className="m-2 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md">
            Roll Dice
          </button>
          <button className="m-2 py-2 px-4 bg-white bg-opacity-40 text-white border border-2 border-white font-semibold rounded-md">
            Hold Dice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
