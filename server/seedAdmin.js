const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/User");

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.DB_URL, {});
    console.log("Connected to database");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Email: admin@gmail.com");
      console.log("Password: admin");
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin", 10);

    // Create admin user
    const admin = await User.create({
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin");
    console.log("Role: admin");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
