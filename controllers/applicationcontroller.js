import Application from '../models/application.js'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import {mailApplication} from '../utils/mailtext'
import { sendEmail } from '../utils/emailsender.js'
import { generateJWTtoken } from '../utils/generatetoken.js'

function diff_minutes(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
  
 }


export const getapplications = async (req, res) => {
    let applications;
    try {

        if(req.user.role == 'mm')
        {
            let date = new Date()
            let st = date.setDate(date.getDate()-7)
            // console.log(new Date(st))
            applications = await Application.find({$or: [{$and: [{ town : req.user.address.town},  {date: {$lte: st}}, {action :{$eq : 'None'}}] }, {forwarded: {$eq: 'mm'}}]})
        }
        else if(req.user.role == 'cl')
        {
            let date = new Date()
            let st = date.setDate(date.getDate()-14)
            applications = await Application.find({$or: [{$and: [{ district : req.user.address.district},{date: {$lte: st}}, {status :{$eq : "Pending"}} ]},{forwarded: {$eq: 'cl'}}] })
        }
        else
        {
            applications = await Application.find({$and: [{ pincode : req.user.address.pincode}, { status :{$eq : 'Pending'}}] })

        }
    } catch (error) {
        return res.status(501).json({error });

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
        sendEmail(req.user.email, "Your Social Issue Submission",mailApplication(req.user.name.firstname, application.title))
        res.status(200).json({application})
        
    } catch (error) {
        return res.status(501).json({error });
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
    let role = req.user.role
    let application
    if(role == 'vc' || role == 'cl' || role == 'mm')
    {
        const {status, action, forwarded} = req.body
        try{
        application = await Application.findByIdAndUpdate(aid,{status, action, forwarded})
        application = await Application.findById(aid)
        }
        catch (error) {
        return res.status(501).json({error });
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
        return res.status(501).json({error });
    }
    if(!application)
    {
      return res.status(404).json({message:"Application is not deleted"});
    }
    return res.status(200).json({message:"Application deleted Successfully"});

}