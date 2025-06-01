import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import { next } from './middleware/error.middleware.js';
import path from 'path';

const __dirname = path.resolve();

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://estate-link.onrender.com'  
        : 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json({
    limit: "16kb"
}));


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    });
}
 

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

export { app };