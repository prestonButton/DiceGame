import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  players : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
    },
  ],
  scores : [
    {
      playerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
      },
      score : Number,
    },
  ],
  currentPlayerId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
  },
  gameStatus : {
    type : String,
    enum : [ "waiting", "playing", "finished" ],
    default : "waiting",
  },
  round : {
    type : Number,
    default : 1,
  },
  turnScore : {
    type : Number,
    default : 0,
  },
  lastRoll : [ Number ],
});

export default mongoose.model("Game", GameSchema);
