import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectioninstance.connection.host} \n`);

    }catch (error) {
        console.log("Error connecting to the database:", error);
        process.exit(1); // Exit the process with an error code
    }
}

export default connectDB;
