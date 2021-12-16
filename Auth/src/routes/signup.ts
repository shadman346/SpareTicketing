import express from "express";
const router = express.Router();
import { Request,Response } from 'express';
const {body} = require('express-validator');
import{catchAsync} from '../util/catchAsync'
import {User} from '../models/user'
import { BadRequestError,validateRequest } from "@shad-tix/common";
import jwt from 'jsonwebtoken';


router.post('/api/users/signup',
[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4,max:20})
        .withMessage('Password must be between 4 and 20 characters')
],
validateRequest,
catchAsync(async(req:Request,res:Response) =>{
    const {email, password} = req.body;

    const existingUser = await User.findOne({email:email});
    if(existingUser){
        throw new BadRequestError('Email is in use..')
    }
    const user = User.build({email:email, password:password});
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
        {
        id: user.id,
        email: user.email
        }, 
        process.env.JWT_KEY!
    )
    //Store it on Session
    req.session = {
        jwt : userJwt
    }
    res.status(201).send(user);

}))

export {router as signUpRouter};