import React from "react";
import Dice from "../components/Dice.jsx";
import UserCard from "../components/UserCard.jsx";

const Game = () => {
  const dots = 3; // Set all dice to 3 dots for now

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-600 to-pink-500 relative">
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap w-full justify-center">
        <Dice key={0} dots={dots} />
        <Dice key={2} dots={dots} />
        <Dice key={3} dots={dots} />
        <Dice key={4} dots={dots} />
        <Dice key={5} dots={dots} />
        <Dice key={6} dots={dots} />
      </div>

      <div className="flex flex-wrap w-full justify-center my-8">
        <UserCard name="Tom Brady" />
        <UserCard name="LeBum James" />
        <UserCard name="Lionel Messi" />
        <UserCard name="Christiano Ronaldo" />
        <UserCard name="Aaron Judge" />
        <UserCard name="Connor McGregor" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap w-full justify-around mb-8">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4"
            >
              <div className="font-bold text-2xl">User {idx + 1}</div>
              <div className="text-gray-600">Score: 0</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mr-4">
            Roll Dice
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mr-4">
            Hold Dice
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded">
            Leave Game
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Game;
