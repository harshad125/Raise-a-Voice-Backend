import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import { generateJWTtoken } from '../utils/generatetoken.js'


export const getuser = async (req, res) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error)

    }
    if (!users) {
        return res.status(404).json({ message: "user not found" })
    }
    return res.status(200).json({ users });
}

export const userprofile=([
body('email', 'enter vaild email').isEmail(),
body('password', 'enter vaild password').isLength({ min: 8 }),
 body('contact', 'enter vaild contact').isLength({ min: 10 , max:10 })
],async (req,res)=>{
    let existinguser;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let did=req.params.id;
    try {
        existinguser=await User.findOne({email:req.body.email})
        if(existinguser)
        {
            return res.status(400).json({message:"user is already exist"})
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt)
        const user=await User.create({
           name:req.body.name,
           email:req.body.email,
           password:secpass,
           contact:req.body.contact,
           aadhaarcard_no:req.body.aadhaarcard_no,
           address:req.body.address,
        })
        user.save();
        res.status(200).json({
            token: generateJWTtoken(user._id, "User"),
            type: 'data'
        });
    } catch (error) {
        console.log(error);
    }
})

export const login = ([
    body('email', 'enter vaild email').exists(),
    body('password', 'passwork cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    console.log(email)
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct info" });
        }
        const passcom = await bcrypt.compare(password, user.password);
        if (!passcom) {
            return res.status(400).json({ error: "please try to login with correct info" });
        }
        res.json({
            token: generateJWTtoken(user._id, "User") // whty every time create new token
        });
    } catch (error) {
        console.log(error.message)
    }
})

export const getbyid=async(req,res)=>{
    let userid=req.params.id;
    let user;
    try {
        user=await User.findById(userid);
    } catch (error) {
        console.log(error);
    }
    if(!user)
    {
        return res.status(404).json({message:"user not found"});
    }
    return res.status(200).json({user});
}

export const updateuser=async(req,res)=>{
    const {name,email,password,contact,aadhaarcart_no,address}=req.body;
    let did=req.params.id;
    let dev;
    try {
       dev=await User.findByIdAndUpdate(did,{name,email,password,contact,aadhaarcart_no,address})
    } catch (error) {
        console.log(error);
    }
    if(!dev)
    {
        return res.status(500).json({message:"unable to update the data"});
    }
    return res.status(200).json({dev});

}
export const Delete=async(req,res)=>{
    let userid=req.params.id;
    let user;
    try {
       user=await User.findByIdAndRemove(userid);
    } catch (error) {
      console.log(error);
    }
    if(!user)
    {
      return res.status(404).json({message:"user not deleted perfectly"});
    }
    return res.status(200).json({message:"user successfully deleted"});

}