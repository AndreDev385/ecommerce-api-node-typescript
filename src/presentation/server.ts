import express, { Express } from "express";
import { router } from "./routes";

export const server: Express = express();
server.use(express.json());

server.use("/api/v1", router)
