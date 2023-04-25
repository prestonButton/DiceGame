import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import SpinningDice from "../components/SpinningDice";
import axios from "axios";

const HomePage = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [error, setError] = useState("");
  const accessToken = cookies.access_token;

  const handlePlay = async () => {
    try {
      const res = await axios.get(`/games`);
      const games = res.data;

      // Check if there's a non-full game available
      const nonFullGame = games.find(
        (game) => game.players.length < game.maxPlayers
      );
      if (nonFullGame) {
        // If there's a non-full game, join it and redirect to the lobby
        const gameId = nonFullGame._id;
        await axios.post(
          `/games/${gameId}/join`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        window.location.href = `/lobby/${gameId}`;
      } else {
        // If there's no non-full game, create a new game and redirect to the game page
        const res = await axios.post(
          `/games/newgame`,
          {
            maxPlayers: 6,
            winningScore: 100,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const gameId = res.data._id;
        await axios.post(
          `/games/${gameId}/join`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        window.location.href = `/game/${gameId}`;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to join game.");
    }
  };

  const logout = () => {
    setCookies("access_token", "", { path: "/" });
    window.localStorage.removeItem("userID");
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
          <button
            className="m-2 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md"
            onClick={handlePlay}
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
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <SpinningDice />
      </div>
    </div>
  );
};

export default HomePage;
