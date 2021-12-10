import express from 'express';
import { Request,Response } from 'express';
import {json} from 'body-parser';

const app = express();
app.get('/auth',(req: Request,res: Response) =>{
    res.send("it is working")
})
app.use(json());
// listening on some port
app.listen(4000, ()=> {
    console.log('listening on port 4000!');
});
