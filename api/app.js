import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import { next } from './middleware/error.middleware.js';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // or whatever your frontend URL is
    credentials: true
  }));
app.use(cookieParser());
app.use(express.json({
    limit: "16kb"
}));

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.use(next)

export { app }