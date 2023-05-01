import { LobbyModel } from "../models/Lobby.js";
import  { UserModel } from '../models/User.js';
import GameModel from '../models/Game.js';

const lobbyHandlers = (io) => {
  io.on("connection", (socket) => {
    // Create a new lobby
    socket.on("createLobby", async (callback) => {
      try {
        const lobby = new LobbyModel();
        await lobby.save();
        return callback({ status: 201, lobbyId: lobby._id });
      } catch (error) {
        return callback({
          status: 500,
          message: "Error creating new lobby",
          error,
        });
      }
    });

    // Get a lobby
    socket.on("getLobby", async (callback) => {
      try {
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
          return callback({
            status: 200,
            lobbyId: -1,
            message: "No lobbies found",
          });
        }
        return callback({ status: 200, lobbyId: lobby[0]._id });
      } catch (error) {
        return callback({ status: 500, message: "Error getting lobby", error });
      }
    });

    // Join a lobby
    socket.on("joinLobby", async ({ lobbyId, userId }, callback) => {
      try {
        const lobby = await LobbyModel.findById(lobbyId);
        if (
          !lobby ||
          lobby.game_started ||
          lobby.players.length >= lobby.max_players
        ) {
          return callback({ status: 400, message: "Cannot join this lobby" });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
          return callback({ status: 404, message: "User not found" });
        }

        lobby.players.push(userId);
        await lobby.save();

        // Join the lobby room
        socket.join(lobbyId);

        // Get the updated list of players with usernames
        const updatedLobby = await LobbyModel.findById(lobbyId).populate("players");
        const usernames = updatedLobby.players.map((player) => player.username);

        // Emit the lobbyMembersUpdate event to all users in the lobby
        io.to(lobbyId).emit("lobbyMembersUpdate", usernames);

        return callback({
          status: 200,
          message: "Player successfully joined the lobby",
        });
      } catch (error) {
        console.error("Error joining lobby:", error);
        return callback({ status: 500, message: "Error joining lobby", error });
      }

    });


    // Get lobby members
    socket.on("getLobbyMembers", async (lobbyId, callback) => {
      try {
        const lobby = await LobbyModel.findById(lobbyId).populate("players");
        if (!lobby) {
          return callback({ status: 404, message: "Lobby not found" });
        }
        const usernames = lobby.players.map((player) => player.username);
        return callback({ status: 200, usernames });
      } catch (error) {
        console.log('Error in getLobbyMembers:', error);
        return callback({
          status: 500,
          message: "Error fetching lobby members",
          error,
        });
      }
    });


    // Start a new game
    socket.on("startGame", async (lobbyId, callback) => {
      try {
        const lobby = await LobbyModel.findById(lobbyId);
        if (!lobby || lobby.game_started || lobby.players.length < 2) {
          return callback({
            status: 400,
            message: "Cannot start game in this lobby. Not enough players",
          });
        }

        lobby.game_started = true;
        await lobby.save();

        console.log("Adding players to the game:", lobby.players);

        const game = new GameModel({
          players: lobby.players,
          scores: lobby.players.map((playerId) => ({
            playerId,
            score: 0,
          })),
        });
        await game.save();
        console.log("Created game document:", game);

        // Emit the game state update
        io.to(lobbyId).emit("gameStateUpdate", {
          gameState: game,
          gameId: game._id,
        });

        // Emit the startGameSuccess event to all users in the lobby
        io.to(lobbyId).emit("startGameSuccess", {
          gameId: game._id,
        });

      } catch (error) {
        return callback({
          status: 500,
          message: "Error starting new game",
          error,
        });
      }
    });


    // Leave a lobby
    socket.on("leaveLobby", async ({ lobbyId, userId }, callback) => {
      try {
        const lobby = await LobbyModel.findById(lobbyId);

        if (!lobby) {
          return callback({ status: 404, message: "Lobby not found" });
        }

        // Find player's index in the lobby
        const playerIndex = lobby.players.findIndex(
          (id) => id.toString() === userId
        );
        console.log('PlayerIndex: ' + playerIndex);

        if (playerIndex === -1) {
          return callback({
            status: 400,
            message: "Player not found in the lobby",
          });
        }

        // Leave the socket room
        socket.leave(lobbyId);

        // Remove player from the lobby
        lobby.players.splice(playerIndex, 1);

        // Get the updated list of players with usernames
        const updatedLobby = await LobbyModel.findById(lobbyId).populate("players");
        const usernames = updatedLobby.players.map((player) => player.username);

        // Emit the lobbyMembersUpdate event to all users in the lobby
        io.to(`lobby-${lobbyId}`).emit("lobbyMembersUpdate", usernames);

        // Update the lobby status if all players have left
        if (lobby.players.length === 0) {
          lobby.game_started = false;
        }

        await lobby.save();

        return callback({
          status: 200,
          message: "Player successfully left the lobby",
        });
      } catch (error) {
        console.error("Error leaving lobby:", error);
        return callback({ status: 500, message: "Error leaving lobby", error });
      }
    });


  });
};

export default lobbyHandlers;
