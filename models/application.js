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
      
    town:{type:String,required:[true,"cant't be blank"]},
    district:{type:String,required:[true,"cant't be blank"]},
    pincode:{type:Number,required:[true,"cant't be blank"]},

    date :{
        type: Date,
        default: Date.now()
    },
    status:{

        vc : {
            action:{
                type: String,
                default: "None"
            },
            description:{
                type: String,
                default: "None"
            },
            status:{
                type: String,
            },
        },
        mm : {
            action:{
                type: String,
                default: 'None'
            },
            description:{
                type: String,
                default:'None'
            },
            status:{
                type: String,
            },
            
        },
        cl : {
            action:{
                type: String,
                default: 'None'
            },
            description:{
                type: String,
                default:'None'
            },
            status:{
                type: String,
            },
           
        },
    },
    
   
     
});

export default mongoose.model('Application',appschema);
