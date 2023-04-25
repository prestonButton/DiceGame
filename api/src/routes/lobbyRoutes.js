import express from "express";
import { LobbyModel } from "../models/Lobby.js";
import { GameModel } from "../models/game.js"; // Replace with the real path of GameModel

const lobbyRoutes = express.Router();

// Route for creating a new lobby
lobbyRoutes.post("/create", async (req, res) => {
  try {
    const lobby = new LobbyModel();
    await lobby.save();
    return res.status(201).json({ lobbyId: lobby._id });
  } catch (error) {
    return res.status(500).json({ message: "Error creating new lobby", error });
  }
});

// Route for joining a lobby
lobbyRoutes.post("/join/:lobbyId", async (req, res) => {
  const { lobbyId } = req.params;
  const { userId } = req.body;

  try {
    const lobby = await LobbyModel.findById(lobbyId);
    if (
      !lobby ||
      lobby.game_started ||
      lobby.players.length >= lobby.max_players
    ) {
      return res.status(400).json({ message: "Cannot join this lobby" });
    }

    lobby.players.push(userId);
    await lobby.save();
    return res
      .status(200)
      .json({ message: "Player successfully joined the lobby" });
  } catch (error) {
    return res.status(500).json({ message: "Error joining lobby", error });
  }
});

// Route for starting a new game
lobbyRoutes.post("/start/:lobbyId", async (req, res) => {
  const { lobbyId } = req.params;

  try {
    const lobby = await LobbyModel.findById(lobbyId);
    if (!lobby || lobby.game_started || lobby.players.length < 2) {
      return res
        .status(400)
        .json({ message: "Cannot start game in this lobby" });
    }

    lobby.game_started = true;
    await lobby.save();

    const game = new GameModel({
      lobby_id: lobbyId,
      game_state: {
        players: lobby.players.map((playerId) => ({
          user_id: playerId,
          score: 0,
        })),
      },
    });
    await game.save();

    return res.status(200).json({ message: "Game started", gameId: game._id });
  } catch (error) {
    return res.status(500).json({ message: "Error starting new game", error });
  }
});

export default lobbyRoutes;
