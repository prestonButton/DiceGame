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

// Route for getting a lobby. This route will be used by the frontend to get the lobby details
// and to see if there are any lobbies with less than 6 people. It will return the lobby ID

lobbyRoutes.get("/get", async (req, res) => {
  try {
    // check all active lobbies for one where players array length < 6
    const lobby = await LobbyModel.aggregate([
      {
        $match: {
          game_started: false,
        },
      },
      {
        $addFields: { player_count: { $size: "$players" } },
      },
      {
        $match: {
          player_count: { $lt: 6 },
        },
      },
    ]).exec();

    if (!lobby || lobby.length === 0) {
      return res.status(200).json({ lobbyId: -1, message: "No lobbies found" });
    }
    return res.status(200).json({ lobbyId: lobby[0]._id });
  } catch (error) {
    return res.status(500).json({ message: "Error getting lobby", error });
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

  // Route for leaving a lobby/game
lobbyRoutes.delete("/leave/:lobbyId", async (req, res) => {
  const { lobbyId } = req.params;
  const { userId } = req.body;

  try {
    const lobby = await LobbyModel.findById(lobbyId);

    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found" });
    }

    // Find player's index in the lobby
    const playerIndex = lobby.players.findIndex(id => id.toString() === userId);
    console.log(playerIndex)

    if (playerIndex === -1) {
      return res.status(400).json({ message: "Player not found in the lobby" });
    }

    // Remove player from the lobby
    lobby.players.splice(playerIndex, 1);

    if (lobby.game_started) {
      const game = await GameModel.findOne({ lobby_id: lobbyId });

      if (game) {
        // Remove player from game state players list
        const gameStatePlayers = game.game_state.players;
        const gamePlayerIndex = gameStatePlayers.findIndex(player => (
          player.user_id.toString() === userId
        ));

        if (gamePlayerIndex !== -1) {
          gameStatePlayers.splice(gamePlayerIndex, 1);
        }

        // Optional: End the game if only one player left
        if (gameStatePlayers.length === 1) {
          game.end_time = new Date();
          game.game_status = "finished";
        }

        await game.save();
      }
    }

    // Update the lobby status if all players have left
    if (lobby.players.length === 0) {
      lobby.game_started = false;
    }

    await lobby.save();

    return res.status(200).json({ message: "Player successfully left the lobby" });
  } catch (error) {
    return res.status(500).json({ message: "Error leaving lobby", error });
  }
});


export default lobbyRoutes;
