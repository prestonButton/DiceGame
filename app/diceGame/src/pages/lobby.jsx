import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../tailwind.css";
import UserCard from "../components/UserCard";
import axios from "axios";

const Lobby = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleLeaveLobby = async () => {
    const userId = window.localStorage.getItem("userID");
    const lobbyId = window.localStorage.getItem("LobbyID");

    if (!userId || !lobbyId) {
      console.error("User ID or Lobby ID not found in localStorage");
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/lobby/leave/${lobbyId}`, {
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
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-600 to-pink-500 flex items-center justify-center text-white">
      <div className="flex flex-col justify-center items-center h-screen">
        <button
          onClick={handleLeaveLobby}
          className="absolute top-4 right-4 m-2 py-2 px-4 bg-red-500 text-white font-semibold rounded-md"
        >
          Leave Lobby
        </button>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <UserCard name="Tom Brady" />
          <UserCard name="LeBum James" />
          <UserCard name="Lionel Messi" />
          <UserCard name="Christiano Ronaldo" />
          <UserCard name="Aaron Judge" />
          <UserCard name="Connor McGregor" />
        </div>
        <Link
          to="/"
          className="m-8 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md"
        >
          Begin Game
        </Link>
      </div>
    </div>
  );
};

export default Lobby;
