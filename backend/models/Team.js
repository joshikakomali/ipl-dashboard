const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: String,
  owner: String,
  budget: Number,
  managerEmail: String,
  captain: String,
  coach: String,
  homeGround: String,
  logoUrl: String
});

module.exports = mongoose.model("Team", teamSchema);