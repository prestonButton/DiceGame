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

        // Emit the game state update
        const lobbyId = game.lobby_id;
        const gameState = game.game_state;
        io.to(`lobby-${lobbyId}`).emit("gameStateUpdate", {
          gameState,
          gameId,
        });

        game.game_state.players = updatedPlayers;

        // Save the updated game state
        await game.save();

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
