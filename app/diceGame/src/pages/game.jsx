import React from "react";
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
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded absolute top-4 right-4">
        Leave Game
      </button>

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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mr-4">
            Roll Dice
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mr-4">
            Hold Dice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
