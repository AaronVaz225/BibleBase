//Connecting to database using mongoose
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1); //Exit the process on failure
  }
};

module.exports = connectDB;
