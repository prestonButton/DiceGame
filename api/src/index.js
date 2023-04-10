import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

// mongoose.connect(
//   "<Add mongoDB link here>"
// );

app.listen(3000, () => console.log("Server started"));
