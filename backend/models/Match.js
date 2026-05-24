const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  winner: String,
  venue: String,
  date: String
});

module.exports = mongoose.model("Match", matchSchema);