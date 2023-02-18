import Application from '../models/application.js'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import { generateJWTtoken } from '../utils/generatetoken.js'

function diff_minutes(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
  
 }

export const getapplications = async (req, res) => {
    console.log(req.user.address.town)
    console.log(req.user.role)
    console.log("object")
    let applications;
    try {
        if(req.user.role == 'vc')
        {
           
            applications = await Application.find({$and: [{ pincode : req.user.address.pincode},  {date: {$lte: st}}, {status :{vc: {status :{$eq : 'Pending'}}}}] })

            console.log(applications)
        }
        else if(req.user.role == 'mm')
        {
            let date = new Date()
            let st = date.setDate(date.getDate()-7)
            console.log(new Date(st))
            applications = await Application.find({$and: [{ town : req.user.address.town},  {date: {$lte: st}}, {status : {vc: {action :{$eq : 'None'}}}}] })
        }
        else if(req.user.role == 'cl')
        {
            let date = new Date()
            let st = date.setDate(date.getDate()-14)
            console.log(new Date(st))
            console.log("finidint in cl")
            applications = await Application.find({$and: [{ district : req.user.address.district},{date: {$lte: st}} ]})
        }
        else
        {
        applications = await Application.find({user : req.user._id});
        }
    } catch (error) {
        console.log(error)

    }
    if (!applications) {
        return res.status(404).json({ message: "Application not found" })
    }
    return res.status(200).json({ applications });
}

export const submitapplication=([
body('title', 'enter vaild email').isLength({min: 5}),
body('description', 'enter vaild password').isLength({ min: 10}),
],async (req,res)=>{
    console.log(req.user)
    console.log(req.user.address.pincode)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const application= await Application.create({
           title:req.body.title,
           description:req.body.description,
           user : req.user._id,
           pincode:req.user.address.pincode,
           town: req.user.address.town,
           district : req.user.address.district
        })
        application.save();

        res.status(200).json({application})
        
    } catch (error) {
        console.log(error);
    }
})


export const getbyid=async(req,res)=>{
    let applicationid=req.params.id;
    let application;
    try {
        application = await Application.findById(applicationid);
    } catch (error) {
        console.log(error);
    }
    if(!application)
    {
        return res.status(404).json({message:"Application not found"});
    }
    return res.status(200).json({application});
}

export const updateapplication=async(req,res)=>{
    let aid = req.params.id
    console.log(req.user.role)
    let role = req.user.role
    console.log(aid)
    console.log(req.body.status)
    let application
    if(role == 'vc' || role == 'cl' || role == 'mm')
    {
        const status = req.body.status
        try{
        application = await Application.findByIdAndUpdate(aid,{status})
        application = await Application.findById(aid)
        }
        catch (error) {
            console.log(error);
        }
        if(!application)
         {
        return res.status(500).json({message:"unable to update the data"});
        }
    }
    else
    {
        return res.status(401).json({message:"Unauthorized Access"});
    }
    
    
    return res.status(200).json({application});

}

export const Delete=async(req,res)=>{
    let aid = req.params.id;
    let application;
    try {
       application = await Application.findByIdAndRemove(aid);
    } catch (error) {
      console.log(error);
    }
    if(!application)
    {
      return res.status(404).json({message:"Application is not deleted"});
    }
    return res.status(200).json({message:"Application deleted Successfully"});

}