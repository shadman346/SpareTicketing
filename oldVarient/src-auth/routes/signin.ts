import express from "express";
const router = express.Router();
import { Request,Response } from 'express';
import {body} from 'express-validator'
import { BadRequestError } from "../errors/bad-req-error";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";
import { catchAsync } from "../util/catchAsync";
import jwt from 'jsonwebtoken';

router.post('/api/users/signin',
[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4,max:20})
        .withMessage('Password must be between 4 and 20 characters')
]
,
validateRequest,
catchAsync(async(req: Request, res: Response) =>{
    
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError('invalid credentials')
    }
    const PasswordMatch = await Password.compare(existingUser.password,password);
    
    if(!PasswordMatch){
        throw new BadRequestError('invalid credentials')
    }
    
    // otherwise generate user a JWT token
    const userJwt = jwt.sign(
        {
        id: existingUser.id,
        email: existingUser.email
        }, 
        process.env.JWT_KEY!
    )
    // Store in session
    req.session = {
        jwt : userJwt
    }
    res.status(200).send(existingUser);
})
)

export {router as signInRouter};