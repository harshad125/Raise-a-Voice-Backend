import mongoose from 'mongoose';

const Schema=mongoose.Schema;

const appschema=new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        required: [ true, "Cant't be blank"]
    },
    description: {
        type: String,
        required: [ true, "Cant't be blank"]
      },
      
    town:{
        type:String,required:[true,"cant't be blank"]
    },
    district:{
        type:String,required:[true,"cant't be blank"]
    },
    pincode:{
        type:Number,required:[true,"cant't be blank"]
    },
    date :{
        type: Date,
        default: Date.now()
    },
    action:{
        type: String,
        default: "None"
    },
    status:{
        type: String,
        default: "Pending"
    },
    forwarded : {
        type: String,
        default:"vc"
    }
});

export default mongoose.model('Application',appschema);
