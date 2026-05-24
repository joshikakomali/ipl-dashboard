const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerName: String,
  name: String,
  role: String,
  team: String,
  price: Number,
  age: Number,
  matches: Number,
  runs: Number,
  wickets: Number
});

module.exports = mongoose.model("Player", playerSchema);