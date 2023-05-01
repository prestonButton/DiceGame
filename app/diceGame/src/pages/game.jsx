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
  const [heldDice, setHeldDice] = useState([]);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [diceKey, setDiceKey] = useState(0);
  const [turnScore, setTurnScore] = useState(0);


useEffect(() => {
  const socketInstance = io(API_URL);
  console.log("Socket initialized:", socketInstance);
  setSocket(socketInstance);

  const gameId = window.localStorage.getItem("GameID");

  socketInstance.emit("joinRoom", gameId); // New line to join the gameId room

  socketInstance.emit("getGameState", gameId, (response) => {
    if (response.status === 200) {
      setGameState(response.game); // Set the entire game document as the game state
      setDice(response.game.dice); // Set the initial dice state
    } else {
      console.error(response.message);
    }
  });

  socketInstance.emit("getGameMembers", gameId, (response) => {
    if (response.status === 200) {
      setUsers(
        response.members.map((member) => ({
          _id: member._id, // Add the _id property
          name: member.username,
          score: member.score,
        }))
      );
    } else {
      console.error(response.message);
    }
  });
 socketInstance.on("gameStateUpdate", (data) => {
   console.log("Received gameStateUpdate:", data.game);
   setGameState(data.game);
   setDice(data.game.dice);
   setHeldDice(data.game.heldDice);
 });


  socketInstance.on("gameStateUpdate", (data) => {
    const { game } = data;
    if (!game || !game.dice) {
      console.error("Invalid game object received:", game);
      return;
    }
    console.log("Received gameStateUpdate:", game);
    setGameState(game);
    setDice(game.dice);
    console.log("Dice:", game.dice);
    setDiceKey((prevKey) => prevKey + 1);
    setHeldDice(game.heldDice);
  });

  return () => {
    socketInstance.disconnect();
  };
}, []);


const rollDice = () => {
  if (!socket) return;
  const gameId = window.localStorage.getItem("GameID");
  socket.emit("rollDice", gameId, (response) => {
    console.log("rollDice response:", response);
    if (response.status === 200) {
      setDice(response.dice);
    } else {
      console.error(response.message);
    }
  });
};

const canScore = (diceValue) => {
  // Returns true if the dice value is 5 or 1, false otherwise
  return diceValue === 5 || diceValue === 1;
};

const getScore = (diceValue) => {
  if (diceValue === 1) {
    return 100;
  } else if (diceValue === 5) {
    return 50;
  } else {
    return 0;
  }
};


const holdDice = (diceIndex) => {
  // Check if the dice at the given index can score points
  if (!canScore(dice[diceIndex])) {
    console.log("Cannot hold this dice because it doesn't score points");
    return;
  }

  // Update the turn score based on the held dice value
  const newTurnScore = turnScore + getScore(dice[diceIndex]);
  console.log("New turn score:", newTurnScore)
  setTurnScore(newTurnScore);

  // Check if all dice are held
  const allDiceHeld = heldDice.every((isHeld) => isHeld);

  if (allDiceHeld) {
    // Reset the isHeld array to all be false
    const newHeldDice = heldDice.map(() => false);
    setHeldDice(newHeldDice);
  }

  if (!socket) return;
  const gameId = window.localStorage.getItem("GameID");
  socket.emit("holdDice", { gameId, diceIndex }, (response) => {
    if (response.status !== 200) {
      console.error(response.message);
    }
  });
};


  const handleLeaveGame = () => {
    if (!socket) return;
    const gameId = window.localStorage.getItem("GameID");
    const userId = window.localStorage.getItem("UserID");
    socket.emit("leaveGame", { gameId, userId }, (response) => {
      if (response.status === 200) {
        window.localStorage.removeItem("GameID");
        window.localStorage.removeItem("LobbyID");
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
          {users.map((user, index) => {
            console.log(
              "Rendering UserCard, user._id:",
              user._id,
              "gameState.currentPlayerID:",
              gameState && gameState.currentPlayerID
            ); // Add this line
            return (
              <UserCard
                key={index}
                name={user.name}
                score={user.score}
                currentPlayer={
                  gameState && user._id === gameState.currentPlayerID
                }
              />
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4" key={diceKey}>
          {dice.map((dots, idx) => (
            <Dice
              key={idx}
              dots={dots}
              isHeld={heldDice[idx]}
              onClick={() => holdDice(idx)}
            />
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
