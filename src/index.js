  // ye line hume .env file se environment variables ko load karne me help karegi
import mongoose, { connect } from "mongoose";
import { DB_Name } from "./constants.js";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

const app = express();



// ()() iffe  Immediately Invoked Function Expression





//     FIRST APPROACH



/*
(async()=>{
    try {
           await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
              
           app.on("Error", (error)=>{
            console.log("Error in DB connection",error);
            throw error;
           })
            
           app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
           });
        }
    catch (error) {
        console.log("Error in DB connection", error);
        throw error;
    }
})()        

*/



//     SECOND APPROACH DOOSRI FILE BANA KE USKO IMPORT KARKE BHI KARSHTE HAIN


dotenv.config({
    path: "./.env"
});
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8001, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
.catch((error)=>{
    console.log("Error in DB connection", error);
});