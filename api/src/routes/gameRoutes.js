import { Router } from 'express';
import Game from '../models/Game.js';
import User from '../models/User.js';

const router = Router();

// Create a new game
router.post("/", async (req, res) => {
  try {
    // Assume the user ID is provided in the request body
    const user = await User.findById(req.body.userId);

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Create a new Game instance
    const newGame = new Game({
      players: [user._id],
      scores: [{ playerId: user._id, score: 0 }],
      currentPlayerId: user._id,
    });

    // Save the new game to the database
    await newGame.save();

    res.status(201).json({ message: "New game created", gameId: newGame._id });
  } catch (error) {
    res.status(500).json({ message: "Server error during game creation." });
  }
});

// Join an existing game
router.post("/:gameId/join", async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    const user = await User.findById(req.body.userId);

    // Check if the game and user exist
    if (!game || !user) {
      res.status(400).json({ message: "Invalid game or user ID" });
      return;
    }

    // Check if the game is already in progress or finished
    if (game.gameStatus !== "waiting") {
      res
        .status(400)
        .json({
          message: "Cannot join. Game is already in progress or finished.",
        });
      return;
    }

    // Check if the user is already in the game
    if (game.players.includes(user._id)) {
      res.status(400).json({ message: "User has already joined the game" });
      return;
    }

    // Add the new user to the game's players array
    game.players.push(user._id);
    game.scores.push({ playerId: user._id, score: 0 });

    // Save the updated game state
    await game.save();
    res.status(200).json({ message: "User joined the game", gameId: game._id });
  } catch (error) {
    res.status(500).json({ message: "Server error while joining the game." });
  }
});

// Start the game
router.post("/:gameId/start", async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    // Check if the game exists
    if (!game) {
      res.status(400).json({ message: "Invalid game ID" });
      return;
    }

    // Check if there are at least two players in the game
    if (game.players.length < 2) {
      res
        .status(400)
        .json({
          message: "A minimum of two players is required to start the game.",
        });
      return;
    }

    // Change the gameStatus to "playing"
    game.gameStatus = "playing";

    // Save the updated game state
    await game.save();
    res.status(200).json({ message: "Game has started", gameId: game._id });
  } catch (error) {
    res.status(500).json({ message: "Server error while starting the game." });
  }
});

// Retrieve the current game state
router.get("/:gameId", async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId)
      .populate("players", "username")
      .populate("scores.playerId", "username")
      .populate("currentPlayerId", "username");

    // Check if the game exists
    if (!game) {
      res.status(400).json({ message: "Invalid game ID" });
      return;
    }

    res.status(200).json(game);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while retrieving the game state." });
  }
});

// Roll the dice and update game state
router.put("/:gameId/roll", async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    // Check if the game exists
    if (!game) {
      res.status(400).json({ message: "Invalid game ID" });
      return;
    }

    // Check if the user is the current player
    if (!req.body.userId || !game.currentPlayerId.equals(req.body.userId)) {
      res.status(403).json({ message: "It's not your turn." });
      return;
    }

    // Roll the dice
    const diceRolls = Array.from({ length: 6 }, () =>
      Math.ceil(Math.random() * 6)
    );

    // Add the rolled points to the current player's turn score
    // (replace this with your game's dice scoring logic)
    const rolledPoints = diceRolls.reduce((acc, val) => acc + val, 0);
    game.turnScore += rolledPoints;

    // Update the game's lastRoll with the rolled dice
    game.lastRoll = diceRolls;

    // Save the updated game state
    await game.save();

    res
      .status(200)
      .json({
        message: "Dice rolled",
        gameId: game._id,
        diceRolls,
        rolledPoints,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error while rolling the dice." });
  }
});

// End the current player's turn and update game state
router.put("/:gameId/end-turn", async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    // Check if the game exists
    if (!game) {
      res.status(400).json({ message: "Invalid game ID" });
      return;
    }

    // Check if the user is the current player
    if (!req.body.userId || !game.currentPlayerId.equals(req.body.userId)) {
      res.status(403).json({ message: "It's not your turn." });
      return;
    }

    // Add the turn score to the current player's total score
    const currentPlayerScore = game.scores.find((score) =>
      score.playerId.equals(game.currentPlayerId)
    );
    currentPlayerScore.score += game.turnScore;

    // Determine the next player's index in the players array
    const currentPlayerIndex = game.players.findIndex((playerId) =>
      playerId.equals(game.currentPlayerId)
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % game.players.length;

    // Update the game state for the next player's turn
    game.currentPlayerId = game.players[nextPlayerIndex];
    game.turnScore = 0;
    game.lastRoll = [];
    game.round += 1;

    // Save the updated game state
    await game.save();

    res
      .status(200)
      .json({
        message: "Turn ended. Switching to the next player.",
        gameId: game._id,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error while ending the turn." });
  }
});

export default router;