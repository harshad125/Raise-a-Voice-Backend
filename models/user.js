import mongoose from 'mongoose';

const Schema=mongoose.Schema;

const userschema=new Schema({

    name:{
        firstname:{type:String, required: [true, "can't be blank"] },
        middlename:{type:String, required: [true, "can't be blank"]},
        lastname:{type:String, required: [true, "can't be blank"]}
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
      },
    password:{
        type:String,
        required: [true, "can't be blank"], 

    },
    contact:{
        type:Number,
        unique: [true,"contact number is already exist"],
        required:[true, "Cant't be blank"],
        match: [/^[(]?[0-9]{3}[)]?[\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/,"is Invalid"]
    },
    aadhaarcard_no:{
        type:String,
        required:[true, "Cant't be blank"],
        unique: true
    },
    address:{
        home:{type:String,required:[true,"cant't be blank"]},
        village:{type:String,required:[true,"cant't be blank"]},
        town:{type:String,required:[true,"cant't be blank"]},
        district:{type:String,required:[true,"cant't be blank"]},
        pincode:{type:Number,required:[true,"cant't be blank"]}
    },
    approved:{
        type:String,
        default:false
    },
    reason :{
        type: String,
        default: "NONE"
    },
    role:{
        type:String,
        required: true,
        default : "enduser",
        
    }
   
     
});

export default mongoose.model('User',userschema);
