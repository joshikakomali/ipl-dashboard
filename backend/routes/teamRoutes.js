const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// ➕ Add Team
router.post("/", async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 📥 Get Teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ❌ Delete Team
router.delete("/:id", async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✏️ Update Team
router.put("/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(team);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;