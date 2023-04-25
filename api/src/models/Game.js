import mongoose from "mongoose";

const { Schema } = mongoose;

const gameSchema = new Schema(
  {
    players: [{ type: Schema.Types.ObjectId, ref: "User" }],
    maxPlayers: { type: Number, required: true, default: 4 },
    gameState: {
      type: String,
      enum: ["waiting", "playing", "finished"],
      default: "waiting",
    },
    // Add more fields for game state as needed
  },
  { timestamps: true }
);

const GameModel = mongoose.model("Game", gameSchema);

export { GameModel };
