import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

import userRoutes from "./routes/userRoutes.js";
// import gameRoutes from "./routes/gameRoutes.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);

app.use("/api/users", userRoutes);
// app.use("/api/games", gameRoutes);

const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*", // Replace this with the URL of your front-end (e.g., "http://localhost:3000")
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // You can add additional event listeners here if needed

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const port = process.env.PORT || 3001;
httpServer.listen(port, () => console.log(`Server started on port ${port}`));
