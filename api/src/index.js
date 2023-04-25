import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/userRoutes.js";
import { gameRouter } from "./routes/gameRoutes.js";
import { createGame, rollDice } from "./gameLogic.js";

// Load environment variables
dotenv.config();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set up Socket.IO server
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected.`);

  socket.on("join-game", async (gameId) => {
    console.log(`User ${socket.id} joined game ${gameId}`);

    // Retrieve game data from database
    const game = await GameModel.findById(gameId);
    if (!game) {
      console.log(`Game ${gameId} not found.`);
      return;
    }

    // Create game state object
    const gameState = createGame(
      game.players,
      game.maxPlayers,
      game.winningScore
    );

    // Save initial game state to database
    await GameModel.findByIdAndUpdate(gameId, { gameState });

    socket.join(gameId);
    socket.emit("game-state", gameState);
  });

  socket.on("roll-dice", async (gameId) => {
    console.log(`User ${socket.id} rolled the dice.`);

    // Retrieve game data from database
    const game = await GameModel.findById(gameId);
    if (!game) {
      console.log(`Game ${gameId} not found.`);
      return;
    }

    // Retrieve game state from database
    const gameState = game.gameState;

    // Update game state
    rollDice(gameState);

    // Save updated game state to database
    await GameModel.findByIdAndUpdate(gameId, { gameState });

    // Send updated game state to all players in the game
    io.to(gameId).emit("game-state", gameState);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected.`);
  });
});

// Set up middleware
app.use(cors());
app.use(express.json());

// Set up routes
app.use("/users", userRouter);
app.use("/games", gameRouter);

// Connect to MongoDB database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
