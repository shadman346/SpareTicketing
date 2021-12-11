import express from 'express';
import { Request,Response } from 'express';
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.get('*',(req: Request,res: Response) =>{
    throw new NotFoundError();
})

app.use(errorHandler)


// listening on some port
app.listen(4000, ()=> {
    console.log('listening on port 4000!');
});
