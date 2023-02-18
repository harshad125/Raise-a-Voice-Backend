import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({path:'./.env'});

const contomongo=()=>{
      // console.log(process.env.BASE_URL);
       mongoose.set("strictQuery", false);
       mongoose.connect(process.env.BASE_URL,()=>{
           console.log("successfully connected");
          // console.log(`MongoDB Connected : ${conn.connection.host}`);
       }).catch((err)=>console.log(err))
}

export default contomongo;

