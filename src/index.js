import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

import dotenv from "dotenv";
dotenv.config({
    path: "./.env" 
});

connectDB ();


/* first approch through iffy function to connect to the database and start the server
const app = express();

// a iffy function to connect to the database and start the server
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.error("Error connecting to the database" , error)
            throw error
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listining on port${process.env.PORT}`)
        }); 

    } catch (error) {
        console.error("Error:", error)
        throw err
    }
})()
    */