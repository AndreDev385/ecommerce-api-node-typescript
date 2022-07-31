import express, { Express } from "express";
import { UserModel } from "./adapters/orm/sequelize/models/user.models";

export const app: Express = express();
app.use(express.json());

app.get("/", async (req, res) => {
  let users = await UserModel.findAll();
  console.log(users);
  res.json({ data: users });
});
app.post("/", async (req, res) => {
  let user = await UserModel.create({
    name: "andre izarra",
    email: "andre@izarra.com",
    password: "andre23",
    phoneNumber: "04241756082",
    role: "admin",
  });
  console.log(user);
  res.json({ data: user });
});
