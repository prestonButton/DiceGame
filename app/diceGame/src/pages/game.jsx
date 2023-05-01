import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dice from "../components/Dice.jsx";
import UserCard from "../components/UserCard.jsx";
import io from "socket.io-client";

const Game = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const [gameState, setGameState] = useState(null);
  const [dice, setDice] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io(API_URL);
    // Fetch initial game state
    const gameId = window.localStorage.getItem("GameID");
    socket.emit("getGameState", gameId, (response) => {
      if (response.status === 200) {
        setGameState(response.gameState);
      } else {
        console.error(response.message);
      }
    });

    // Fetch game members
    socket.emit("getGameMembers", gameId, (response) => {
      if (response.status === 200) {
        setUsers(
          response.members.map((member) => ({
            name: member.username,
            score: member.score,
          }))
        );
      } else {
        console.error(response.message);
      }
    });

    // Listen for game state updates
    socket.on("gameStateUpdate", ({ gameState }) => {
      setGameState(gameState);
      setDice(gameState.lastRoll);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const rollDice = () => {
    const gameId = window.localStorage.getItem("GameID");
    socket.emit("rollDice", gameId, (response) => {
      if (response.status !== 200) {
        console.error(response.message);
      }
    });
  };

  const holdDice = (diceIndex) => {
    const gameId = window.localStorage.getItem("GameID");
    socket.emit("holdDice", { gameId, diceIndex }, (response) => {
      if (response.status !== 200) {
        console.error(response.message);
      }
    });
  };

  const handleLeaveGame = () => {
    const gameId = window.localStorage.getItem("GameID");
    const userId = window.localStorage.getItem("UserID");
    socket.emit("leaveGame", { gameId, userId }, (response) => {
      if (response.status === 200) {
        window.localStorage.removeItem("GameID");
        navigate("/");
      } else {
        console.error(response.message);
      }
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-600 to-pink-500 relative">
      <button
        onClick={handleLeaveGame}
        className="absolute top-4 right-4 m-2 py-2 px-4 bg-red-500 text-white font-semibold rounded-md"
      >
        Leave Game
      </button>

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
