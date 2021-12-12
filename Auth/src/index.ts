import express from 'express';
import { Request,Response, NextFunction } from 'express';
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { catchAsync } from './util/catchAsync';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
    cookieSession({
        signed:false,
        secure:true
    })
)
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.get('*',catchAsync(async(req: Request,res: Response) =>{
    throw new NotFoundError();
}))

app.use(errorHandler)

const start = async() =>{
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined');
    }
    try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to MongoDB')
    } catch(err){
        console.error(err);
    }

    // listening on some port
app.listen(4000, ()=> {
    console.log('listening on port 4000!');
});
}

start();


