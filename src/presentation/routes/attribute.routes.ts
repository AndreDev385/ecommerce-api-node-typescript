import express, { NextFunction, Request, Response } from "express";
import { CreateAttributeUseCase } from "../../application/usecases/variation/create-attribute-usecase";
import { ListAttributeUseCase } from "../../application/usecases/variation/list-attribute-usecase";

export default function attributeRouter(
  listAttributes: ListAttributeUseCase,
  createAttribute: CreateAttributeUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const result = await listAttributes.execute();
    res.json(result);
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const result = await createAttribute.execute(req.body);
    res.json(result);
  });

  router.get("/test", async(req:Request, res:Response, next:NextFunction) => {
    
  })

  return router;
}
