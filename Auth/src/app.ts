import express from 'express';
import { Request,Response, NextFunction } from 'express';
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler, NotFoundError  } from '@shad-tix/common';


import { catchAsync } from './util/catchAsync';
import cookieSession from 'cookie-session';


const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
    cookieSession({
        signed:false,
        secure:process.env.NODE_ENV !== 'test'
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

export {app}