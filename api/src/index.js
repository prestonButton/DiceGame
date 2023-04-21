import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./routes/userRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

mongoose.connect(process.env.DATABASE_URL);

const port = process.env.PORT || 3001;
app.listen(3001, () => console.log(`Server started on port ${port}`));
