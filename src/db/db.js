import mongoose from "mongoose";
import "dotenv/config";
import { DB_NAME } from "../constants/constants.js";

const connectDB = async () => {
  try {
console.log("uri", process.env.MONGODB_URI)
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    console.log("DB connected \n DB HOST:", connectionInstance.connection.host);
    
  } catch (error) {
    console.log("DB connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;