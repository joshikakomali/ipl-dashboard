const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const teamRoutes = require("./routes/teamRoutes");
const userRoutes = require("./routes/userRoutes");
const playerRoutes = require("./routes/playerRoutes");
const matchRoutes = require("./routes/matchRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/matches", matchRoutes);

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("logo"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB Connected");
  // Create default admin user if not exists
  const User = require("./models/User");
  const adminExists = await User.findOne({ email: "admin@ipl.com" });
  if (!adminExists) {
    await User.create({
      name: "Admin",
      email: "admin@ipl.com",
      password: "admin",
      role: "admin"
    });
    console.log("Default admin created: admin@ipl.com / admin");
  }

  // Create default manager user if not exists
  const managerExists = await User.findOne({ email: "manager@ipl.com" });
  if (!managerExists) {
    await User.create({
      name: "Manager",
      email: "manager@ipl.com",
      password: "manager",
      role: "manager"
    });
    console.log("Default manager created: manager@ipl.com / manager");
  }

  // Seed default IPL teams
  const Team = require("./models/Team");
  const Player = require("./models/Player");
  const cskExists = await Team.findOne({ teamName: "Chennai Super Kings" });
  if (!cskExists) {
    const defaultTeams = [
      { teamName: "Chennai Super Kings", owner: "N. Srinivasan (India Cements)", budget: 100 },
      { teamName: "Mumbai Indians", owner: "Nita Ambani (Reliance)", budget: 100 },
      { teamName: "Royal Challengers Bengaluru", owner: "Prathmesh Mishra (Diageo)", budget: 100 },
      { teamName: "Sunrisers Hyderabad", owner: "Kaviya Maran (SUN Group)", budget: 100 },
      { teamName: "Kolkata Knight Riders", owner: "Shah Rukh Khan (Red Chillies)", budget: 100 },
      { teamName: "Rajasthan Royals", owner: "Manoj Badale (Emerging Media)", budget: 100 },
      { teamName: "Delhi Capitals", owner: "Parth Jindal (GMR & JSW)", budget: 100 },
      { teamName: "Punjab Kings", owner: "Preity Zinta (KPH Dream)", budget: 100 },
      { teamName: "Gujarat Titans", owner: "CVC Capital Partners", budget: 100 },
      { teamName: "Lucknow Super Giants", owner: "Sanjiv Goenka (RPSG Group)", budget: 100 }
    ];
    await Team.insertMany(defaultTeams);
    console.log("Default IPL teams seeded.");
  }

  const dhoniExists = await Player.findOne({ playerName: "MS Dhoni" });
  if (!dhoniExists) {
    const defaultPlayers = [
      { playerName: "MS Dhoni", role: "Wicket Keeper", team: "Chennai Super Kings", price: 12.0 },
      { playerName: "Ruturaj Gaikwad", role: "Batsman", team: "Chennai Super Kings", price: 14.0 },
      { playerName: "Ravindra Jadeja", role: "All Rounder", team: "Chennai Super Kings", price: 16.0 },
      { playerName: "Rohit Sharma", role: "Batsman", team: "Mumbai Indians", price: 16.0 },
      { playerName: "Jasprit Bumrah", role: "Bowler", team: "Mumbai Indians", price: 18.0 },
      { playerName: "Hardik Pandya", role: "All Rounder", team: "Mumbai Indians", price: 15.0 },
      { playerName: "Virat Kohli", role: "Batsman", team: "Royal Challengers Bengaluru", price: 21.0 },
      { playerName: "Faf du Plessis", role: "Batsman", team: "Royal Challengers Bengaluru", price: 15.0 },
      { playerName: "Mohammed Siraj", role: "Bowler", team: "Royal Challengers Bengaluru", price: 10.5 },
      { playerName: "Pat Cummins", role: "Bowler", team: "Sunrisers Hyderabad", price: 20.5 },
      { playerName: "Abhishek Sharma", role: "Batsman", team: "Sunrisers Hyderabad", price: 8.0 },
      { playerName: "Heinrich Klaasen", role: "Wicket Keeper", team: "Sunrisers Hyderabad", price: 23.0 },
      { playerName: "Sunil Narine", role: "All Rounder", team: "Kolkata Knight Riders", price: 12.0 },
      { playerName: "Shreyas Iyer", role: "Batsman", team: "Kolkata Knight Riders", price: 12.25 },
      { playerName: "Rinku Singh", role: "Batsman", team: "Kolkata Knight Riders", price: 13.0 },
      { playerName: "Sanju Samson", role: "Wicket Keeper", team: "Rajasthan Royals", price: 14.0 },
      { playerName: "Yashasvi Jaiswal", role: "Batsman", team: "Rajasthan Royals", price: 18.0 },
      { playerName: "Yuzvendra Chahal", role: "Bowler", team: "Rajasthan Royals", price: 6.0 },
      { playerName: "Rishabh Pant", role: "Wicket Keeper", team: "Delhi Capitals", price: 16.0 },
      { playerName: "Axar Patel", role: "All Rounder", team: "Delhi Capitals", price: 12.0 },
      { playerName: "Kuldeep Yadav", role: "Bowler", team: "Delhi Capitals", price: 10.0 },
      { playerName: "Sam Curran", role: "All Rounder", team: "Punjab Kings", price: 18.5 },
      { playerName: "Shashank Singh", role: "Batsman", team: "Punjab Kings", price: 5.5 },
      { playerName: "Shubman Gill", role: "Batsman", team: "Gujarat Titans", price: 16.5 },
      { playerName: "Rashid Khan", role: "Bowler", team: "Gujarat Titans", price: 18.0 },
      { playerName: "Nicholas Pooran", role: "Wicket Keeper", team: "Lucknow Super Giants", price: 21.0 },
      { playerName: "KL Rahul", role: "Batsman", team: "Lucknow Super Giants", price: 17.0 }
    ];
    await Player.insertMany(defaultPlayers);
    console.log("Default IPL players seeded.");
  }
})
.catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("IPL Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});