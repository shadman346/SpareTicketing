import express from "express";
const router = express.Router();
import { Request,Response } from 'express';

router.post('/api/users/signout',(req,res) =>{
    req.session = null;

    res.send({});
})

export {router as signOutRouter};