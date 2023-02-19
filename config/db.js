import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({path:'./.env'});

const contomongo=()=>{
       mongoose.set("strictQuery", false);
       mongoose.connect(process.env.BASE_URL,()=>{
           console.log("Database connected successfully");
       }).catch((err)=>console.log(err))
}

export default contomongo;

