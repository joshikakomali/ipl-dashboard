const mongoose = require('mongoose');
const Team = require('./models/Team');
const Player = require('./models/Player');
const Match = require('./models/Match');
const User = require('./models/User');
require('dotenv').config();

const MONGO_URI = 'mongodb://127.0.0.1:27017/ipl-db'; // Or process.env.MONGO_URI if applicable, assuming localhost

const teams = [
  { teamName: 'Chennai Super Kings', owner: 'Chennai Super Kings Cricket Ltd', homeGround: 'MA Chidambaram Stadium', captain: 'Ruturaj Gaikwad', trophies: 5 },
  { teamName: 'Mumbai Indians', owner: 'Indiawin Sports', homeGround: 'Wankhede Stadium', captain: 'Hardik Pandya', trophies: 5 },
  { teamName: 'Royal Challengers Bengaluru', owner: 'United Spirits', homeGround: 'M. Chinnaswamy Stadium', captain: 'Faf du Plessis', trophies: 0 },
  { teamName: 'Kolkata Knight Riders', owner: 'Knight Riders Sports', homeGround: 'Eden Gardens', captain: 'Shreyas Iyer', trophies: 3 },
  { teamName: 'Rajasthan Royals', owner: 'Royals Sports Group', homeGround: 'Sawai Mansingh Stadium', captain: 'Sanju Samson', trophies: 1 },
  { teamName: 'Sunrisers Hyderabad', owner: 'SUN TV Network', homeGround: 'Rajiv Gandhi Intl Stadium', captain: 'Pat Cummins', trophies: 1 },
  { teamName: 'Delhi Capitals', owner: 'GMR Group & JSW Group', homeGround: 'Arun Jaitley Stadium', captain: 'Rishabh Pant', trophies: 0 },
  { teamName: 'Punjab Kings', owner: 'KPH Dream Cricket', homeGround: 'PCA Stadium, Mohali', captain: 'Shikhar Dhawan', trophies: 0 },
  { teamName: 'Gujarat Titans', owner: 'CVC Capital Partners', homeGround: 'Narendra Modi Stadium', captain: 'Shubman Gill', trophies: 1 },
  { teamName: 'Lucknow Super Giants', owner: 'RPSG Group', homeGround: 'Ekana Cricket Stadium', captain: 'KL Rahul', trophies: 0 }
];

const players = [
  { playerName: 'MS Dhoni', role: 'Wicketkeeper Batter', team: 'Chennai Super Kings', price: 12 },
  { playerName: 'Ruturaj Gaikwad', role: 'Batter', team: 'Chennai Super Kings', price: 6 },
  { playerName: 'Ravindra Jadeja', role: 'All-rounder', team: 'Chennai Super Kings', price: 16 },
  
  { playerName: 'Rohit Sharma', role: 'Batter', team: 'Mumbai Indians', price: 16 },
  { playerName: 'Jasprit Bumrah', role: 'All-rounder', team: 'Mumbai Indians', price: 15 },
  { playerName: 'Suryakumar Yadav', role: 'Batter', team: 'Mumbai Indians', price: 8 },
  
  { playerName: 'Virat Kohli', role: 'Batter', team: 'Royal Challengers Bengaluru', price: 15 },
  { playerName: 'Glenn Maxwell', role: 'All-rounder', team: 'Royal Challengers Bengaluru', price: 11 },
  { playerName: 'Mohammed Siraj', role: 'Bowler', team: 'Royal Challengers Bengaluru', price: 7 },
  
  { playerName: 'Shreyas Iyer', role: 'Batter', team: 'Kolkata Knight Riders', price: 12.25 },
  { playerName: 'Andre Russell', role: 'All-rounder', team: 'Kolkata Knight Riders', price: 12 },
  { playerName: 'Sunil Narine', role: 'All-rounder', team: 'Kolkata Knight Riders', price: 6 },

  { playerName: 'Sanju Samson', role: 'Wicketkeeper Batter', team: 'Rajasthan Royals', price: 14 },
  { playerName: 'Jos Buttler', role: 'Wicketkeeper Batter', team: 'Rajasthan Royals', price: 10 },
  { playerName: 'Yuzvendra Chahal', role: 'Bowler', team: 'Rajasthan Royals', price: 6.5 },

  { playerName: 'Pat Cummins', role: 'Bowler', team: 'Sunrisers Hyderabad', price: 20.5 },
  { playerName: 'Travis Head', role: 'Batter', team: 'Sunrisers Hyderabad', price: 6.8 },
  { playerName: 'Heinrich Klaasen', role: 'Wicketkeeper Batter', team: 'Sunrisers Hyderabad', price: 5.25 },
  
  { playerName: 'Rishabh Pant', role: 'Wicketkeeper Batter', team: 'Delhi Capitals', price: 16 },
  { playerName: 'Axar Patel', role: 'All-rounder', team: 'Delhi Capitals', price: 9 },
  { playerName: 'David Warner', role: 'Batter', team: 'Delhi Capitals', price: 6.25 },

  { playerName: 'Shikhar Dhawan', role: 'Batter', team: 'Punjab Kings', price: 8.25 },
  { playerName: 'Sam Curran', role: 'All-rounder', team: 'Punjab Kings', price: 18.5 },
  { playerName: 'Arshdeep Singh', role: 'All-rounder', team: 'Punjab Kings', price: 8.25 },

  { playerName: 'Shubman Gill', role: 'Batter', team: 'Gujarat Titans', price: 8 },
  { playerName: 'Rashid Khan', role: 'All-rounder', team: 'Gujarat Titans', price: 15 },
  { playerName: 'David Miller', role: 'Batter', team: 'Gujarat Titans', price: 3 },

  { playerName: 'KL Rahul', role: 'Wicketkeeper Batter', team: 'Lucknow Super Giants', price: 17 },
  { playerName: 'Marcus Stoinis', role: 'All-rounder', team: 'Lucknow Super Giants', price: 9.2 },
  { playerName: 'Nicholas Pooran', role: 'Wicketkeeper Batter', team: 'Lucknow Super Giants', price: 16 }
];

const matches = [
  { team1: 'Chennai Super Kings', team2: 'Mumbai Indians', venue: 'MA Chidambaram Stadium', date: '2024-03-22', winner: 'Chennai Super Kings' },
  { team1: 'Royal Challengers Bengaluru', team2: 'Kolkata Knight Riders', venue: 'M. Chinnaswamy Stadium', date: '2024-03-23', winner: 'Kolkata Knight Riders' },
  { team1: 'Rajasthan Royals', team2: 'Sunrisers Hyderabad', venue: 'Sawai Mansingh Stadium', date: '2024-03-24', winner: 'Sunrisers Hyderabad' },
  { team1: 'Delhi Capitals', team2: 'Punjab Kings', venue: 'PCA Stadium, Mohali', date: '2024-03-25', winner: 'Punjab Kings' },
  { team1: 'Gujarat Titans', team2: 'Lucknow Super Giants', venue: 'Narendra Modi Stadium', date: '2024-03-26', winner: 'Gujarat Titans' },
  { team1: 'Chennai Super Kings', team2: 'Royal Challengers Bengaluru', venue: 'MA Chidambaram Stadium', date: '2024-03-22', winner: 'Chennai Super Kings' },
  { team1: 'Mumbai Indians', team2: 'Chennai Super Kings', venue: 'Wankhede Stadium', date: '2024-04-14', winner: 'Chennai Super Kings' },
  { team1: 'Kolkata Knight Riders', team2: 'Royal Challengers Bengaluru', venue: 'Eden Gardens', date: '2024-04-21', winner: 'Kolkata Knight Riders' },
  { team1: 'Sunrisers Hyderabad', team2: 'Royal Challengers Bengaluru', venue: 'Rajiv Gandhi Intl Stadium', date: '2024-04-25', winner: 'Royal Challengers Bengaluru' },
  { team1: 'Gujarat Titans', team2: 'Chennai Super Kings', venue: 'Narendra Modi Stadium', date: '2024-05-10', winner: 'Chennai Super Kings' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || MONGO_URI);
    console.log('Connected to DB');
    
    await Player.deleteMany();
    await Match.deleteMany();
    
    // We keep existing Teams because server.js might seed them, but let's clear them too, except users
    await Team.deleteMany();

    await Team.insertMany(teams);
    console.log('Teams seeded');

    await Player.insertMany(players);
    console.log('Players seeded');

    await Match.insertMany(matches);
    console.log('Matches seeded');

    console.log('Seeding complete. Exiting.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
