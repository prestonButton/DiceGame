import GameModel from "../models/Game.js";

const gameHandlers = (io) => {
  io.on("connection", (socket) => {
    // Get game state
    socket.on("getGameState", async (gameId, callback) => {
      try {
        const game = await GameModel.findById(gameId);
        if (!game) {
          return callback({ status: 404, message: "Game not found" });
        }
        return callback({ status: 200, gameState: game.game_state });
      } catch (error) {
        return callback({
          status: 500,
          message: "Error retrieving game state",
          error,
        });
      }
    });

    // Roll dice
    socket.on("rollDice", async (gameId, callback) => {
      try {
        const game = await GameModel.findById(gameId);
        if (!game) {
          return callback({ status: 404, message: "Game not found" });
        }

        // Your logic for rolling dice and updating game state
        const newRoll = game.lastRoll.map((diceValue, index) => {
          // Check if the dice is held or not
          const diceIsHeld = game.heldDice[index];

          // If the dice is held, return the current value, otherwise generate a new random value
          return diceIsHeld ? diceValue : Math.floor(Math.random() * 6) + 1;
        });

        game.lastRoll = newRoll;

        await game.save();
        io.to(gameId).emit("gameStateUpdate", game);
        return callback({ status: 200, message: "Dice rolled successfully" });
      } catch (error) {
        return callback({
          status: 500,
          message: "Error rolling dice",
          error,
        });
      }
    });


    // Hold dice
    socket.on("holdDice", async ({ gameId, diceIndex }, callback) => {
      try {
        const game = await GameModel.findById(gameId);
        if (!game) {
          return callback({ status: 404, message: "Game not found" });
        }

        // Your logic for holding dice and updating game state
        // For example, you could use an array of boolean values representing the held status of each dice
        game.heldDice[diceIndex] = !game.heldDice[diceIndex];

        await game.save();
        io.to(gameId).emit("gameStateUpdate", game);
        return callback({ status: 200, message: "Dice held status updated successfully" });
      } catch (error) {
        return callback({
          status: 500,
          message: "Error holding dice",
          error,
        });
      }
    });


    // Remove player from the game
    // Remove player from the game
    socket.on("leaveGame", async ({ gameId, userId }, callback) => {
      try {
        const game = await GameModel.findById(gameId);
        if (!game) {
          return callback({ status: 404, message: "Game not found" });
        }

        // Remove player from the game state
        const updatedPlayers = game.game_state.players.filter(
          (player) => player.user_id.toString() !== userId
        );

        game.game_state.players = updatedPlayers;

        // Save the updated game state
        await game.save();

        // Emit the game state update to all users in the game
        io.to(gameId).emit("gameStateUpdate", game);

        return callback({
          status: 200,
          message: "Player removed from the game",
        });
      } catch (error) {
        return callback({
          status: 500,
          message: "Error while removing player from the game",
          error,
        });
      }
    });
  });
};

export default gameHandlers;
