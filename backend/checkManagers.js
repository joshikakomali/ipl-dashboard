require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const checkManagers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const managers = await User.find({ role: "manager" });
    console.log("Managers:");
    managers.forEach(m => console.log(`${m.email} - ${m.password}`));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
checkManagers();
