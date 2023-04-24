import React from "react";
import Dice from "../components/Dice.jsx";
import UserCard from "../components/UserCard.jsx";

const Game = () => {
  const dots = 3; // Set all dice to 3 dots for now

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-600 to-pink-500 relative">
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded absolute top-4 right-4">
        Leave Game
      </button>

      <div className="flex flex-col items-center justify-center pt-16">
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(6)].map((_, idx) => (
            <Dice key={idx} dots={dots} />
          ))}
        </div>

        <div className="flex flex-wrap w-full justify-center my-8">
          <UserCard name="Tom Brady" />
          <UserCard name="LeBum James" />
          <UserCard name="Lionel Messi" />
          <UserCard name="Christiano Ronaldo" />
          <UserCard name="Aaron Judge" />
          <UserCard name="Connor McGregor" />
        </div>

        <div className="flex items-center justify-center">
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
