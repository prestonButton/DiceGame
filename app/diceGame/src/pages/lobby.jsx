import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../tailwind.css";
import UserCard from "../components/UserCard";
import axios from "axios";
import socket from "../socket";

const Lobby = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [lobbyMembers, setLobbyMembers] = useState([]);

useEffect(() => {
  if (socket) {
    const lobbyId = window.localStorage.getItem("LobbyID");

    if (!lobbyId) {
      console.error("Lobby ID not found in localStorage");
      return;
    }

    socket.emit("getLobbyMembers", lobbyId, (response) => {
      if (response.status === 200) {
        console.log("Lobby members:", response.usernames);
        setLobbyMembers(response.usernames);
      } else {
        console.error("Error fetching lobby members:", response.message);
      }
    });

    socket.on("lobbyMembersUpdate", (members) => {
      setLobbyMembers(members);
    });

    socket.on("gameStateUpdate", ({ gameId }) => {
      window.localStorage.setItem("GameID", gameId);
      navigate(`/game/${gameId}`);
    });

    return () => {
      socket.off("lobbyMembersUpdate");
      socket.off("gameStateUpdate");
    };
  }
}, [socket, navigate]);


const handleLeaveLobby = () => {
  const userId = window.localStorage.getItem("userID");
  const lobbyId = window.localStorage.getItem("LobbyID");

  if (!userId || !lobbyId) {
    console.error("User ID or Lobby ID not found in localStorage");
    return;
  }

  socket.emit("leaveLobby", { lobbyId, userId }, (response) => {
    if (response.status === 200) {
      console.log(response.message);
      window.localStorage.removeItem("LobbyID");
      navigate("/");
    } else {
      console.error("Error leaving lobby:", response.message, response.error);
    }
  });
};


const handleBeginGame = () => {
  const lobbyId = window.localStorage.getItem("LobbyID");
  if (!lobbyId) {
    console.error("Lobby ID not found in localStorage");
    return;
  }

  socket.emit("startGame", lobbyId, ({ status, message, gameId }) => {
    if (status === 400) {
      alert("Not enough players to start game");
      return;
    } else if (status === 200) {
      window.localStorage.setItem("GameID", gameId);
      navigate(`/game/${gameId}`);
    } else {
      console.error("Error starting game:", message);
    }
  });
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
          {lobbyMembers.map((username, index) => (
            <UserCard key={index} name={username} />
          ))}
        </div>
        <button
          onClick={handleBeginGame}
          className="m-8 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md"
        >
          Begin Game
        </button>
      </div>
    </div>
  );
};

export default Lobby;
