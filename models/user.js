import mongoose from 'mongoose';

const Schema=mongoose.Schema;

const userschema=new Schema({

    name:{
        firstname:{type:String, default:'firstname',required: [true, "can't be blank"] },
        middlename:{type:String, default:'middlename', required: [true, "can't be blank"]},
        lastname:{type:String, default:'lastname', required: [true, "can't be blank"]}
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
        home:{type:String, default: '-'},
        village:{type:String, default: '-'},
        town:{type:String, default: '-'},
        district:{type:String, default: '-'},
        pincode:{type:Number, default: 0}
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
