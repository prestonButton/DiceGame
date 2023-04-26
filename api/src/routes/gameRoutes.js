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

export { gameRouter };
