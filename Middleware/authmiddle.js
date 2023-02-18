import asyncHandler from 'express-async-handler';
import user from '../models/user.js';
import  {decodeJWTtoken}  from '../utils/decodedtoken.js';


export const protect = asyncHandler(async (req, res, next) => {
    console.log('from auth!!')
    const { _id, collection } = decodeJWTtoken(req, res);
    console.log('from auth middle ware');
    try {
        req.user = await user.findOne({ _id });
        next();
    } catch (error) {
        res.status(401).json({
            error:{
                errorMessage:['you are not authorized for this page']
            }
        });
    }
});

