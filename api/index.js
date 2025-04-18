import { app } from './app.js';

import dotenv from "dotenv";
dotenv.config({
    path : "./.env"
})
import connectDB from './db/index.js';


connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at PORT : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo DB Connection error", err)
})


