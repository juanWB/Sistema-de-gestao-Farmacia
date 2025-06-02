import express from "express";
import "dotenv/config";
import { appRouter } from "../routes/AppRoutes";

const app = express();

app.use(express.json());
app.use(appRouter);



export {app};