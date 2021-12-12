import express from "express";
const router = express.Router();
import { Request,Response } from 'express';
import { currentUser } from "../middleware/current-user";



router.get('/api/users/currentuser', 
currentUser, (req: Request, res: Response) =>{
    res.send({currentUser: req.currentUser || null})
}
)

export {router as currentUserRouter};