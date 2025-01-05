import mongoose from "mongoose";
import "dotenv/config.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("Database connected successfully.");
  } catch (err) {
    console.log("Error connecting to database", err);
  }
};

export default connectToDatabase;
