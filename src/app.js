import express, { urlencoded } from "express"; 
import cookieParser from "cookie-parser";
import cors from "cors";// ye line cross origin resource sharing ke liye hai


const app = express();// ye line hume .env file se environment variables ko load karne me help karegi

app.use(cors(
    {
    origin: process.env.CORS_ORIGIN,// ye line hume front end ke address ko specify karne me help karegi jaha se request aayegi
    credentials: true
}
));

app.use(express.json({limit: "16kb"}));                                 // ye forms se data aara hai to usko json me convert karne ke liye hai

app.use(express.urlencoded({extended: true, limit: "16kb"}));           // ye line urlencoded data ko parse karne ke liye hai

app.use(express.static("public"));                                      // ye line static files ko serve karne ke liye hai

app.use(cookieParser());                                                // ye line cookies ko parse karne ke liye hai


//MIDDLEWARE SIRF CHECK KRNE KE LIYE HAI AGAR CHECKING SAHI HUI TW RESPONSE DE DEGA





//Import Routes
import userRoutes from "./routes/user.routes.js";


//Route use krne ke liye middleware lagayenge .use ke through
app.use("/api/v1/users", userRoutes);

export default app;