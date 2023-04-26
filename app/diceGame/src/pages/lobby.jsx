import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../tailwind.css";
import UserCard from "../components/UserCard";
import axios from "axios"

const Lobby = () => {
  const handleLeaveLobby = async () => {
    //remove user from the lobby,
    //navigate to home page

    const userID = window.localStorage.getItem("userID");
    const LobbyID = window.localStorage.getItem("LobbyID");
    const response = await axios.get(API_URL + `/lobby/leave/${LobbyID}`, {
      lobbyId: LobbyID,
      userId: userID
    });
    console.log(`${userID} left lobby`)
  };

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