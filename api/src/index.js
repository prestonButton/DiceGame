import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/userRoutes.js";
import { gameRouter } from "./routes/gameRoutes.js";

// Load environment variables
dotenv.config();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set up Socket.IO server
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected.", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("exit-room", () => {
    socket.leaveAll();
    console.log(`User ${socket.id} left all rooms`);
  });

  socket.on("join-game", (gameId) => {
    socket.join(gameId);
    console.log(`User ${socket.id} joined game ${gameId}`);
  });

  socket.on("exit-game", () => {
    socket.leaveAll();
    console.log(`User ${socket.id} left all games`);
  });

  socket.on("roll-dice", (gameId) => {
    // Implement game logic here to roll the dice
    // and update the game state

    io.to(gameId).emit("game-state", game);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected.", socket.id);
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
