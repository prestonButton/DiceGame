import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dice from "../components/Dice.jsx";
import UserCard from "../components/UserCard.jsx";
import axios from "axios";


const Game = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [dice, setDice] = useState(rollDice); // Initial value of all dice set to 3
  const users = [
    //TODO - replace with websocket call to server to get users
    { name: "Tom Brady", score: 0 },
    { name: "LeBum James", score: 0 },
    { name: "Lionel Messi", score: 0 },
    { name: "Christiano Ronaldo", score: 0 },
    { name: "Aaron Judge", score: 0 },
    { name: "Connor McGregor", score: 0 },
  ];

  const rollDice = () => {
    //an array of 6 random numbers between 1 and 6 make this a websocket call so all users
    //get the same dice roll
    
  };


  const handleLeaveGame = async() => {
    const userId = window.localStorage.getItem("userID");
    const lobbyId = window.localStorage.getItem("LobbyID");

    if (!userId || !lobbyId) {
      console.error("User ID or Lobby ID not found in localStorage");
      return;
    }

    try {
      const leaveGameResponse = await axios.post(`${API_URL}/game/leave/${lobbyId}`, {
        data: { userId },
      });

      const leaveLobbyResponse = await axios.delete(`${API_URL}/lobby/leave/${lobbyId}`, {
        data: { userId },
      });

      console.log(response.data.message);
      window.localStorage.removeItem("LobbyID");
      navigate("/");
    } catch (error) {
      console.error(
        "Error leaving lobby:",
        error.response?.data?.message || error.message
      );
    }
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



export default  Game
