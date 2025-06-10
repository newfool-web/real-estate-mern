import { app } from './app.js';
import dotenv from "dotenv";
import connectDB from './db/index.js';
import serverless from 'serverless-http';

dotenv.config({
    path: "./.env"
});

let isConnected = false;

const connect = async () => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
};

export default async function handler(req, res) {
    await connect();
    return serverless(app)(req, res);
}


