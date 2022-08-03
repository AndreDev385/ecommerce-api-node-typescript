import express, { Express } from "express";
import { router } from "./routes";
import { errorHandler } from './middlewares/error-handler'

export const server: Express = express();
server.use(express.json());

server.use("/api/v1", router)

server.use(errorHandler)