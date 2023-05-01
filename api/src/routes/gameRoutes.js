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
        // Return the game document in the callback
        callback({ status: 200, game });
      } catch (error) {
        return callback({
          status: 500,
          message: "Error getting game state",
          error,
        });
      }
    });

    socket.on("rollDice", async (gameId, callback) => {
      try {
        const game = await GameModel.findById(gameId);
        if (!game) {
          return callback({ status: 404, message: "Game not found" });
        }

        // Your logic for rolling dice and updating game state
        const newRoll = game.dice.map((diceValue, index) => {
          // Check if the dice is held or not
          const diceIsHeld = game.heldDice[index];

          // If the dice is held, return the current value, otherwise generate a new random value
          return diceIsHeld ? diceValue : Math.floor(Math.random() * 6) + 1;
        });

        game.dice = newRoll;

        await game.save();
         io.to(gameId).emit("gameStateUpdate", {
           game: {
             _id: game._id,
             players: game.players,
             scores: game.scores,
             gameStatus: game.gameStatus,
             round: game.round,
             turnScore: game.turnScore,
             dice: game.dice,
             heldDice: game.heldDice,
             currentPlayerID: game.currentPlayerID, // Make sure this is included
           },
         });
         return callback({ status: 200, message: "Dice rolled successfully", dice: game.dice });
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
        game.heldDice[diceIndex] = !game.heldDice[diceIndex];

        await game.save();
        io.emit("gameStateUpdate",{ game });
        return callback({ status: 200, message: "Dice held status updated successfully" });
      } catch (error) {
        return callback({
          status: 500,
          message: "Error holding dice",
          error,
        });
      }
    });

    // Change turn
    socket.on("changeTurn", async (gameId, callback) => {
      try {
        const game = await GameModel.findById(gameId);
        if (!game) {
          return callback({ status: 404, message: "Game not found" });
        }

        // Your logic for changing the active player's turn and updating game state
        // For example, you could iterate through the players array and set the next player as active

        await game.save();
        io.emit("gameStateUpdate", game);
        return callback({ status: 200, message: "Turn changed successfully" });
      } catch (error) {
        return callback({
          status: 500,
          message: "Error changing turn",
          error,
        });
      }
    });

    // Remove player from the game
    socket.on("leaveGame", async ({ gameId, userId }, callback) => {
      try {
        const game = await GameModel.findById(gameId);
        if (!game) {
          return callback({ status: 404, message: "Game not found" });
        }

        // Remove the player from the game
        game.players = game.players.filter((playerId) => playerId.toString() !== userId);
        game.scores = game.scores.filter((scoreEntry) => scoreEntry.playerId.toString() !== userId);

        // Save the updated game document
        await game.save();

        // Emit the game state update to remaining players in the game room
        io.to(gameId).emit("gameStateUpdate", {
          gameState: game,
          gameId: gameId,
        });

        return callback({ status: 200, message: "Successfully left the game" });
      } catch (error) {
        return callback({
          status: 500,
          message: "Error leaving game",
          error,
        });
      }
    });

    //get game members and scores
    socket.on("getGameMembers", async (gameId, callback) => {
      try {
        const game = await GameModel.findById(gameId).populate("players");

        if (!game) {
          return callback({ status: 404, message: "Game not found" });
        }

        const members = game.players.map((player) => ({
          _id: player._id,
          username: player.username,
          score: player.score,
        }));

        return callback({ status: 200, members });
      } catch (error) {
        return callback({
          status: 500,
          message: "Error getting game members",
          error,
        });
      }
    });


    // join room
    socket.on("joinRoom", (gameId) => {
      socket.join(gameId);
      console.log(`User ${socket.id} joined the room ${gameId}`);
    });

  });
};

export default gameHandlers;
