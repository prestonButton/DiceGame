import Game from "../models/Game.js";
import User from "../models/User.js";
import { io } from "../index.js";

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Create a new game
  socket.on("CREATE_GAME", async (data, callback) => {
    try {
      const user = await User.findById(data.userId);
      if (!user) {
        return callback({ status: 400, message: "Invalid user ID" });
      }

      const newGame = new Game({
        players: [user._id],
        scores: [{ playerId: user._id, score: 0 }],
        currentPlayerId: user._id,
      });

      await newGame.save();
      callback({
        status: 201,
        message: "New game created",
        gameId: newGame._id,
      });
    } catch (error) {
      callback({ status: 500, message: "Server error during game creation." });
    }
  });

  // Join an existing game
  socket.on("JOIN_GAME", async (data, callback) => {
    try {
      const game = await Game.findById(data.gameId);
      const user = await User.findById(data.userId);

      if (!game || !user) {
        return callback({ status: 400, message: "Invalid game or user ID" });
      }

      if (game.gameStatus !== "waiting") {
        return callback({
          status: 400,
          message: "Cannot join. Game is already in progress or finished.",
        });
      }

      if (game.players.includes(user._id)) {
        return callback({
          status: 400,
          message: "User has already joined the game",
        });
      }

      game.players.push(user._id);
      game.scores.push({ playerId: user._id, score: 0 });
      await game.save();

      callback({
        status: 200,
        message: "User joined the game",
        gameId: game._id,
      });
    } catch (error) {
      callback({
        status: 500,
        message: "Server error while joining the game.",
      });
    }
  });

  // Start the game
  socket.on("START_GAME", async (data, callback) => {
    try {
      const game = await Game.findById(data.gameId);

      if (!game) {
        return callback({ status: 400, message: "Invalid game ID" });
      }

      if (game.players.length < 2) {
        return callback({
          status: 400,
          message: "A minimum of two players is required to start the game.",
        });
      }

      game.gameStatus = "playing";
      await game.save();

      callback({ status: 200, message: "Game has started", gameId: game._id });
    } catch (error) {
      callback({
        status: 500,
        message: "Server error while starting the game.",
      });
    }
  });

  // Roll the dice and update game state
  socket.on("ROLL_DICE", async (data, callback) => {
    try {
      const game = await Game.findById(data.gameId);

      if (!game) {
        return callback({ status: 400, message: "Invalid game ID" });
      }

      if (!data.userId || !game.currentPlayerId.equals(data.userId)) {
        return callback({ status: 403, message: "It's not your turn." });
      }

      const diceRolls = Array.from({ length: 6 }, () =>
        Math.ceil(Math.random() * 6)
      );

      // Add the rolled points to the current player's turn score
      const rolledPoints = diceRolls.reduce((acc, val) => acc + val, 0);
      game.turnScore += rolledPoints;
      game.lastRoll = diceRolls;

      await game.save();

      callback({
        status: 200,
        message: "Dice rolled",
        gameId: game._id,
        diceRolls,
        rolledPoints,
      });
    } catch (error) {
      callback({
        status: 500,
        message: "Server error while rolling the dice.",
      });
    }
  });

  // End the current player's turn and update game state
  socket.on("END_TURN", async (data, callback) => {
    try {
      const game = await Game.findById(data.gameId);

      if (!game) {
        return callback({ status: 400, message: "Invalid game ID" });
      }

      if (!data.userId || !game.currentPlayerId.equals(data.userId)) {
        return callback({ status: 403, message: "It's not your turn." });
      }

      const currentPlayerScore = game.scores.find((score) =>
        score.playerId.equals(game.currentPlayerId)
      );
      currentPlayerScore.score += game.turnScore;

      const currentPlayerIndex = game.players.findIndex((playerId) =>
        playerId.equals(game.currentPlayerId)
      );
      const nextPlayerIndex = (currentPlayerIndex + 1) % game.players.length;

      game.currentPlayerId = game.players[nextPlayerIndex];
      game.turnScore = 0;
      game.lastRoll = [];
      game.round += 1;

      await game.save();

      callback({
        status: 200,
        message: "Turn ended. Switching to the next player.",
        gameId: game._id,
      });
    } catch (error) {
      callback({ status: 500, message: "Server error while ending the turn." });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
