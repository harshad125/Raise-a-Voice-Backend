import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({path:'./.env'});

export const generateJWTtoken = (_id, collectionName) => {
    console.log(collectionName)
    return jwt.sign({ _id, collectionName }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}