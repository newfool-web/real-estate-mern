import express from 'express';
const app = express();

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import { next } from './middleware/error.middleware.js';


app.use(express.json({
    limit: "16kb"
}))
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use(next)





export {app}