import mongoose from 'mongoose';
import { app } from './app';

const start = async() =>{
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
      }
      if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
      }
      if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
      }
      if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
      }
      if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
      }

    try{
    await mongoose.connect(process.env.MONGO_URI)
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


