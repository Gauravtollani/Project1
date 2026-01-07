import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB = async () => {   //  TIME LAGTA H TW ASYNC AWAIT LAGATE HAIN
  try {                            // ISKO UTILITY ME BANAKR IMPORT KARKE BHI USE KARSHTE HAIN
    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
    console.log("\nMongoDB connected successfully to",connectionInstance.connection.host);// ye connection.host hume  address batayega ki kaha connect hua hai 

  }
  catch (error) {
    console.log("Error in DB connection", error);
    process.exit(1);
  }
};

export default connectDB;