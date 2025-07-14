import express from "express";
import "dotenv/config";
import cors from 'cors';
import { appRouter } from "../routes/AppRoutes";

const app = express();

app.use(cors({
    origin: process.env.ENABLE_CORS?.split('') || []
}))

app.use(express.json());
app.use(appRouter);



export {app};