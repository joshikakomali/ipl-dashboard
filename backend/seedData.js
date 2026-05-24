require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Team = require("./models/Team");
const Player = require("./models/Player");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    console.log("Wiping existing data...");
    await User.deleteMany({ role: { $ne: 'admin' } }); // Delete all non-admin users
    await Team.deleteMany({});
    await Player.deleteMany({});

    console.log("Data wiped successfully.");

    const franchises = [
      { key: "csk", name: "Chennai Super Kings", owner: "India Cements", home: "M. A. Chidambaram Stadium" },
      { key: "rcb", name: "Royal Challengers Bengaluru", owner: "United Spirits", home: "M. Chinnaswamy Stadium" },
      { key: "mi", name: "Mumbai Indians", owner: "Reliance Industries", home: "Wankhede Stadium" },
      { key: "srh", name: "Sunrisers Hyderabad", owner: "SUN Group", home: "Rajiv Gandhi Intl Stadium" },
      { key: "kkr", name: "Kolkata Knight Riders", owner: "Red Chillies Entertainment", home: "Eden Gardens" },
      { key: "rr", name: "Rajasthan Royals", owner: "Emerging Media", home: "Sawai Mansingh Stadium" },
      { key: "dc", name: "Delhi Capitals", owner: "GMR Group & JSW Group", home: "Arun Jaitley Stadium" },
      { key: "pbks", name: "Punjab Kings", owner: "KPH Dream Cricket", home: "Maharaja Yadavindra Singh Stadium" },
      { key: "gt", name: "Gujarat Titans", owner: "CVC Capital Partners", home: "Narendra Modi Stadium" },
      { key: "lsg", name: "Lucknow Super Giants", owner: "RPSG Group", home: "Ekana Cricket Stadium" }
    ];

    // Create Managers
    const managers = franchises.map(f => ({
      name: `${f.name} Manager`,
      email: `${f.key}@manager.com`,
      password: "manager123", // Assuming plain text or whatever the system handles
      role: "manager"
    }));
    await User.insertMany(managers);
    console.log("Managers created.");

    // Create Teams
    const teams = franchises.map(f => ({
      teamName: f.name,
      owner: f.owner,
      budget: 100,
      managerEmail: `${f.key}@manager.com`,
      homeGround: f.home
    }));
    await Team.insertMany(teams);
    console.log("Teams created.");

    // Create Dummy Players
    const players = [];
    franchises.forEach(f => {
      players.push({ playerName: `Player 1 (${f.key.toUpperCase()})`, role: "Batsman", team: f.name, price: 10, age: 25 });
      players.push({ playerName: `Player 2 (${f.key.toUpperCase()})`, role: "Bowler", team: f.name, price: 8, age: 28 });
      players.push({ playerName: `Player 3 (${f.key.toUpperCase()})`, role: "All Rounder", team: f.name, price: 12, age: 26 });
    });
    await Player.insertMany(players);
    console.log("Players created.");

    console.log("Seeding complete! You can now log in with e.g. csk@manager.com / manager123");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedDatabase();
