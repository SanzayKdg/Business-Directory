import { DATABASE_URI } from "./constants.config.js";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const connection = await mongoose.connect(DATABASE_URI);

    if (connection) console.log("Databse connected successfully");
  } catch (error) {
    console.log(`MongoDB Error: ${error}`);
  }
};
