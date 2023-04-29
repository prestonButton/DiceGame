import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import SpinningDice from "../components/SpinningDice";
import axios from "axios";
import socket from "../socket"; // Import the socket instance

const HomePage = () => {
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "", { path: "/" });
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("LobbyID");
  };

const handleCreateLobby = () => {
  const userId = window.localStorage.getItem("userID");

  if (!userId) {
    console.error("User ID not found in localStorage");
    return;
  }

  // Check for existing lobbies with less than 6 people
  socket.emit("getLobby", (response) => {
    if (response.status === 200) {
      if (response.lobbyId !== -1) {
        // Join the available lobby
        const lobbyId = response.lobbyId;
        socket.emit("joinLobby", { lobbyId, userId }, (joinLobbyResponse) => {
          if (joinLobbyResponse.status === 200) {
            window.localStorage.setItem("LobbyID", lobbyId);
            navigate(`/lobby/${lobbyId}`);
          } else {
            console.error("Error joining lobby:", joinLobbyResponse.message);
          }
        });
      } else {
        // No available lobbies found, create a new one and join
        socket.emit("createLobby", (createLobbyResponse) => {
          if (createLobbyResponse.status === 201) {
            const lobbyId = createLobbyResponse.lobbyId;
            socket.emit(
              "joinLobby",
              { lobbyId, userId },
              (joinLobbyResponse) => {
                if (joinLobbyResponse.status === 200) {
                  window.localStorage.setItem("LobbyID", lobbyId);
                  navigate(`/lobby/${lobbyId}`);
                } else {
                  console.error(
                    "Error joining lobby:",
                    joinLobbyResponse.message
                  );
                }
              }
            );
          } else {
            console.error("Error creating lobby:", createLobbyResponse.message);
          }
        });
      }
    } else {
      console.error("Error getting lobby:", response.message);
    }
  });
};


  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-600 to-pink-500 relative">
      {/* Conditionally render the play and the signup, login, and logout buttons depending on whether or not the user is logged in */}
      {!cookies.access_token ? (
        <div className="absolute top-6 right-6 text-white">
          <Link
            to="/signup"
            className="m-2 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="m-2 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md"
          >
            Log In
          </Link>
        </div>
      ) : (
        <div className="absolute top-6 right-6 text-white">
          {/* TODO:  Add an onclick to add user to a lobby and navigate to the lobby*/}
          <button
            className="m-2 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md"
            onClick={handleCreateLobby}
          >
            Play
          </button>
          <button
            className="m-2 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      )}
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div>
          <h1 className="text-5xl sm:text-9xl font-bold text-white mb-4">
            10,000
          </h1>
          <h2 className="text-3xl lg:text-5xl text-white">
            Multiplayer Dice Game
          </h2>
        </div>
        <SpinningDice />
      </div>
    </div>
  );
};

export default HomePage;
