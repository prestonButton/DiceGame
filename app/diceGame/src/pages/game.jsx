import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dice from "../components/Dice.jsx";
import UserCard from "../components/UserCard.jsx";
import axios from "axios";
import io from "socket.io-client";

const Game = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [dice, setDice] = useState(Array(6).fill(1)); // Initial value of all dice set to 1
  const [socket, setSocket] = useState(null);

  // Replace the users array with a state variable that can be updated
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);

    // TODO: Fetch initial users and dice state from the server
    // setUsers(...)
    // setDice(...)

    return () => newSocket.close();
  }, [API_URL]);

  const rollDice = () => {
    if (!socket) return;
    socket.emit(
      "rollDice",
      /* gameId, */ (response) => {
        if (response.status === 200) {
          setDice(response.game.lastRoll);
        } else {
          console.error(response.message);
        }
      }
    );
  };

  const holdDice = (diceIndex) => {
    if (!socket) return;
    socket.emit("holdDice", { /* gameId, */ diceIndex }, (response) => {
      if (response.status === 200) {
        // TODO: Update dice holding status
      } else {
        console.error(response.message);
      }
    });
  };

const handleLeaveGame = () => {
  if (!socket) return;

  const userId = window.localStorage.getItem("userID");
  const gameId = window.localStorage.getItem("GameID");

  if (!userId || !gameId) {
    console.error("User ID or Game ID not found in localStorage");
    return;
  }

  socket.emit("leaveGame", { gameId, userId }, (response) => {
    if (response.status === 200) {
      console.log(response.message);
      window.localStorage.removeItem("GameID");
      navigate("/");
    } else {
      console.error("Error leaving game:", response.message);
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
