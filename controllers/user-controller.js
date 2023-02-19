import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import { generateJWTtoken } from '../utils/generatetoken.js'
import { sendEmail } from '../utils/emailsender.js'
import { mailtext } from '../utils/mailtext'

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

export const approveuser = async (req, res) => {
    if (req.user.role != 'vc') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    let uid = req.params.id
    const { approved, reason } = req.body
    let updateduser;
    try {
        updateduser = await User.findByIdAndUpdate(uid, { approved, reason })
        updateduser = await User.findById(uid)
    } catch (error) {
        console.log(error);
    }
    if (!updateduser) {
        return res.status(500).json({ message: "unable to update the data" });
    }
    return res.status(200).json({ updateduser });

}
export const register = (
    [
        body('email', 'enter valid email').isEmail(),
        body('password', 'enter valid password').isLength({ min: 8 }),
        body('contact', 'enter a valid name').isLength({ min: 10, max: 10 })
    ], async (req, res) => {
        let existinguser;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            existinguser = await User.findOne({ email: req.body.email })
            if (existinguser) {
                return res.status(400).json({ message: "User is already exist !" })
            }
            const d = new Date();
            let randstring = d.toString();
            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt)
            const user = await User.create({
                email: req.body.email,
                password: secpass,
                contact: req.body.contact,
                aadhaarcard_no: randstring,
            })
            user.save();
            sendEmail(req.body.email, "Welcome to Raise a Voice", mailtext(user.name.firstname, user.email, req.body.password));
            res.status(200).json({
                token: generateJWTtoken(user._id, "User"),
                type: 'data'
            });

        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "something went wrong" })
        }
    }
)
export const userprofile = ([
    body('email', 'enter vaild email').isEmail(),
    body('password', 'enter vaild password').isLength({ min: 8 }),
    body('contact', 'enter vaild contact').isLength({ min: 10, max: 10 })
], async (req, res) => {

    let existinguser;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        existinguser = await User.findOne({ email: req.body.email })
        console.log("not ema")
        if (existinguser) {
            const user = await User.findByIdAndUpdate(existinguser._id, {
                name: req.body.name,
                aadhaarcard_no: req.body.aadhaarcard_no,
                address: req.body.address,
            })
            existinguser = await User.findOne({ email: req.body.email })
            res.status(200).json({
                token: generateJWTtoken(user._id, "User"),
                user: existinguser
            });
        }
        else {
            res.status(400).json({ message: "Bad Request" })
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "something went wrong" })
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
            token: generateJWTtoken(user._id, "User"),
            user: user // whty every time create new token
        });
    } catch (error) {
        console.log(error.message)
    }
})

export const getbyid = async (req, res) => {
    let userid = req.params.id;
    let user;
    try {
        user = await User.findById(userid);
    } catch (error) {
        console.log(error);
    }
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ user });
}

export const updateuser = async (req, res) => {
    const { name, email, password, contact, aadhaarcart_no, address } = req.body;
    let did = req.params.id;
    let dev;
    try {
        dev = await User.findByIdAndUpdate(did, { name, email, password, contact, aadhaarcart_no, address })
    } catch (error) {
        console.log(error);
    }
    if (!dev) {
        return res.status(500).json({ message: "unable to update the data" });
    }
    return res.status(200).json({ dev });

}
export const Delete = async (req, res) => {
    let userid = req.params.id;
    let user;
    try {
        user = await User.findByIdAndRemove(userid);
    } catch (error) {
        console.log(error);
    }
    if (!user) {
        return res.status(404).json({ message: "user not deleted perfectly" });
    }
    return res.status(200).json({ message: "user successfully deleted" });

}