import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/userRoutes.js";
import { gameRouter } from "./routes/gameRoutes.js";
import lobbyRoutes from "./routes/lobbyRoutes.js"; // Import the new Lobby routes

// Load environment variables
dotenv.config();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set up Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your client-side domain (e.g. "http://localhost:3000") for better security
    methods: ["GET", "POST"],
  },
});

// Set up connection logic
io.on("connection", (socket) => {
  console.log("New WebSocket connection...");

  // Define event handlers for different client-side events here
  // For example:
  // socket.on('event_name', (data) => {
  //   // Your event handling logic here
  // });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User has disconnected");
  });
});

// Set up middleware
app.use(cors());
app.use(express.json());

// Set up routes
app.use("/users", userRouter);
app.use("/games", gameRouter);
app.use("/lobby", lobbyRoutes); // Add lobby routes

// Pass the 'io' instance to routes if required (optional integration)
app.use((req, res, next) => {
  req.io = io;
  next();
});

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
