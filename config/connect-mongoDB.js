const mongoose = require("mongoose");
require("dotenv").config(); // ✅ Load dotenv

const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI; // ✅ Use process.env
    if (!mongoUri) throw new Error("MONGO_URI is not defined in .env file");

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = { connectMongoDB };
