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

// For local development - start the server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    
    connect().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    });
}

// For serverless (Vercel) deployment
export default async function handler(req, res) {
    await connect();
    return serverless(app)(req, res);
}


