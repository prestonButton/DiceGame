import express from "express";
import { GameModel } from "../models/game.js";

const gameRouter = express.Router();

// Get game state
gameRouter.get("/state/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;

    const game = await GameModel.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.status(200).json({ game_state: game.game_state });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving game state", error });
  }
});

// Remove player from the game
gameRouter.delete("/leave/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const { userId } = req.body;

    const game = await GameModel.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Find player and remove them from the game state
    const updatedPlayers = game.game_state.players.filter(
      (player) => player.user_id.toString() !== userId
    );
    game.game_state.players = updatedPlayers;

    // Save the updated game state
    await game.save();

    return res.status(200).json({ message: "Player removed from the game" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while removing player from the game", error });
  }
});
export { gameRouter };
