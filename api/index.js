import { app } from './app.js';
import dotenv from "dotenv";
import connectDB from './db/index.js';

dotenv.config({
    path: "./.env"
});

connectDB()
    .then(() => {
        const server = app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running at PORT : ${process.env.PORT}`);
        });

        server.keepAliveTimeout = 120000;
        server.headersTimeout = 120000;
    })
    .catch((err) => {
        console.log("Mongo DB Connection error", err);
    });


