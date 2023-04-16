const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");

require("dotenv").config();

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
app.listen(port, () => console.log(`Listening on port ${port}`));
