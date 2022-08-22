import express, { Express } from "express";
import cors from 'cors'

import { router } from "./routes";
import { errorHandler } from './middlewares/error-handler'

export const server: Express = express();
server.use(express.json());
server.use(cors())
server.use(express.raw({ type: 'image/*', limit: '2mb' }));

server.use("/api/v1", router)

server.use(errorHandler)