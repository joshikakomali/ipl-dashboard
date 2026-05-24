require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const fixAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admin = await User.findOne({ email: "admin@ipl.com" });
    if (admin) {
      admin.password = "admin";
      await admin.save();
      console.log("admin@ipl.com password reset to plain text 'admin'.");
    } else {
      console.log("admin@ipl.com NOT FOUND.");
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
fixAdmin();
