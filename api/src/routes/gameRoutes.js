import express from "express";
import { GameModel } from "../models/game.js";
import { rollDice } from "../gameLogic.js";

const gameRouter = express.Router();

// Create a new game session
gameRouter.post("/newgame", async (req, res) => {
  const userId = req.user._id;
  const newGame = new GameModel({
    players: [userId],
    maxPlayers: 6,
    winningScore: 100,
    gameState: {},
  });

  await newGame.save();

  res.json(newGame);
});

// Join an existing game session
gameRouter.post("/:id/join", async (req, res) => {
  const gameId = req.params.id;
  const userId = req.user._id;

  const game = await GameModel.findById(gameId);
  if (!game) {
    return res.status(400).json({ message: "Game not found." });
  }

  if (game.players.length >= game.maxPlayers) {
    return res.status(400).json({ message: "Game is full." });
  }

  game.players.push(userId);
  await game.save();

  res.json({ message: "Successfully joined game." });
});

// Leave a game session
gameRouter.post("/:id/leave", async (req, res) => {
  const gameId = req.params.id;
  const userId = req.user._id;

  const game = await GameModel.findById(gameId);
  if (!game) {
    return res.status(400).json({ message: "Game not found." });
  }

  const index = game.players.indexOf(userId);
  if (index === -1) {
    return res.status(400).json({ message: "User is not in game." });
  }

  game.players.splice(index, 1);
  await game.save();

  res.json({ message: "Successfully left game." });
});

// Roll the dice
gameRouter.post("/:id/roll", async (req, res) => {
  const gameId = req.params.id;
  const userId = req.user._id;

  const game = await GameModel.findById(gameId);
  if (!game) {
    return res.status(400).json({ message: "Game not found." });
  }

  const index = game.players.indexOf(userId);
  if (index !== 0) {
    return res.status(400).json({ message: "It's not your turn." });
  }

  const { gameState } = game;

  // Roll the dice and update the game state
  const { score, nextPlayer } = rollDice(gameState);
  gameState.score = score;
  gameState.currentPlayer = nextPlayer;

  game.gameState = gameState;
  const savedGame = await game.save();

  res.json(savedGame);
});

export { gameRouter };
