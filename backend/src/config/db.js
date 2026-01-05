import mongoose from 'mongoose';
import {ENV} from "./env.js";


const connectDB = async ()=>{
    try{
        const connection =await mongoose.connect(ENV.DB_URL)
        if(connection){
            console.log(`Connected to db successfully`);
        }
    }catch (error){
        console.error(error);
    }
}
export default connectDB;