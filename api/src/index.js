
import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js/index.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
