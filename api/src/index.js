import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://tenthousand:tenthousand@tenthousand.hnyiwxh.mongodb.net/test');

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
