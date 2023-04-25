import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  maxPlayers: {
    type: Number,
    required: true,
    min: 2,
    max: 6,
    default: 2,
  },
  winningScore: {
    type: Number,
    required: true,
    default: 100,
  },
  gameState: {
    type: Object,
    required: true,
    default: {},
  },
});

const GameModel = mongoose.model("Game", GameSchema);

export { GameModel };
