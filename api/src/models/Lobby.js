import mongoose from "mongoose";

const LobbySchema = new mongoose.Schema({
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  max_players: {
    type: Number,
    default: 6,
  },
  game_started: {
    type: Boolean,
    default: false,
  },
});

export const LobbyModel = mongoose.model("Lobby", LobbySchema);
