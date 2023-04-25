import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  score: {
    type: Number,
    default: 0,
  },
});

const GameStateSchema = new mongoose.Schema({
  players: [PlayerSchema],
  active_player: {
    type: Number,
    default: 0,
  },
  dice: [
    {
      type: Number,
    },
  ],
  active_player_score: {
    type: Number,
    default: 0,
  },
  // add any other game-specific state properties if required
});

const GameSchema = new mongoose.Schema({
  lobby_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lobby",
  },
  game_state: {
    type: GameStateSchema,
    required: true,
    default: {},
  },
  start_time: {
    type: Date,
    default: Date.now,
  },
  end_time: Date,
  game_status: {
    type: String,
    enum: ["ongoing", "finished", "abandoned"],
    default: "ongoing",
  },
});

const GameModel = mongoose.model("Game", GameSchema);

export { GameModel };
