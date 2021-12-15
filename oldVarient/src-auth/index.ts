import mongoose from 'mongoose';
import { app } from './app';

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


