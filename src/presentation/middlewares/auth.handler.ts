import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export function checkJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-auth-token"];
  console.log(token, "token!");

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const payload = jwt.verify(
      token as string,
      config.SECRET_KEY as jwt.Secret
    );

    console.log(payload, "payloadd!");
    req.body.user = payload;

    next();
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
}

export function isRole(roles: string[] = []) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body.user.role)
      console.log(roles)
      if (roles.includes(req.body.user.role)) {
        console.log("isRole", req.body.user.role);
        next();
      } else {
        throw new Error("Not autorized");
      }
    } catch (error: any) {
      next(error);
    }
  };
}
