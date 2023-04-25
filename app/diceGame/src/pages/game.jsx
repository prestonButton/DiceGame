import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dice from "../components/Dice.jsx";
import UserCard from "../components/UserCard.jsx";

const Game = () => {
  const [dice, setDice] = useState([3, 3, 3, 3, 3, 3]); // Initial value of all dice set to 3
  const users = [
    { name: "Tom Brady", score: 0 },
    { name: "LeBum James", score: 0 },
    { name: "Lionel Messi", score: 0 },
    { name: "Christiano Ronaldo", score: 0 },
    { name: "Aaron Judge", score: 0 },
    { name: "Connor McGregor", score: 0 },
  ];

  const rollDice = () => {
    const newDice = dice.map(() => {
      return Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    });
    setDice(newDice);
  };

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
          {dice.map((dots, idx) => (
            <Dice key={idx + 1} dots={dots} />
          ))}
        </div>

        <div className="flex items-center justify-center mt-8">
          <button
            className="m-2 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md"
            onClick={rollDice}
          >
            Roll Dice
          </button>
          <button className="m-2 py-2 px-4 bg-white bg-opacity-40 text-white border-2 border-white font-semibold rounded-md">
            Hold Dice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
