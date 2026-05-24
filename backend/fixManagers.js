require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const fixManagers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await User.updateMany(
      { role: "manager" },
      { $set: { password: "manager123" } }
    );
    console.log(`Updated ${result.modifiedCount} managers to plain text 'manager123'.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
fixManagers();
