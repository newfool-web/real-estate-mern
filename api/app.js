import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import { next } from './middleware/error.middleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json({
    limit: "16kb"
}))

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.use(next)

export {app}