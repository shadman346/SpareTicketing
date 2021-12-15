import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import {app} from '../app'
import request from 'supertest'


declare global{
    var cookiesFromSignin: () => Promise<string[]>;
}

let mongo : any

jest.setTimeout(5000);
beforeAll(async () =>{
    process.env.JWT_KEY = "asdfgh";


    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async() =>{
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections ){
        await collection.deleteMany({});
    }
})

afterAll(async()=>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
    
})

global.cookiesFromSignin = async () =>{
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email,
        password
    })
    .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie
}