import mongoose from "mongoose";
import { ENV } from "./env.js";

let cachedConnection = null;

const connectDB = async () => {
    // Return cached connection if it exists
    if (cachedConnection) return cachedConnection;

    // Already connected
    if (mongoose.connection.readyState === 1) {
        cachedConnection = mongoose.connection;
        return cachedConnection;
    }

    // Connecting - wait for connection to open
    if (mongoose.connection.readyState === 2) {
        return new Promise((resolve, reject) => {
            mongoose.connection.once("open", () => resolve(mongoose.connection));
            mongoose.connection.once("error", reject);
        });
    }

    // New connection
    cachedConnection = await mongoose.connect(ENV.DB_URL);
    console.log("Connected to MongoDB:", mongoose.connection.name);

    return cachedConnection;
};

export default connectDB;
