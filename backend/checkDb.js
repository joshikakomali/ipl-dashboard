require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const checkDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admin = await User.findOne({ email: "admin@ipl.com" });
    if (admin) {
      console.log("Found admin@ipl.com. Password is:", admin.password);
    } else {
      console.log("admin@ipl.com NOT FOUND.");
    }
    const allAdmins = await User.find({ role: "admin" });
    console.log("All Admins:", allAdmins.map(a => ({ email: a.email, password: a.password })));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
checkDb();
