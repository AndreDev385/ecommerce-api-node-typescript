import express, { NextFunction, Request, Response } from "express";

import {
  AttributesModel,
  VariationModel,
} from "../../adapters/orm/sequelize/models/variation.model";
import { CreateVariationUseCase } from "../../application/usecases/variation/create-variation-usecase";
import { ListVariationUseCase } from "../../application/usecases/variation/list-variation-usecase";

export default function variationRouter(
  listVariation: ListVariationUseCase,
  createVariation: CreateVariationUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listVariation.execute();
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await createVariation.execute(req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  router.get("/test", async (req: Request, res: Response, next: NextFunction) => {

    const result = await VariationModel.create(
      {
        productId: 1,
        normalPrice: 9.99,
        attributes: [
          {
            name: "size",
            value: "40",
          },
          {
            name: "color",
            value: "white",
          }
        ],
      },
      {
        include: AttributesModel,
      }
    );
    res.json(result);
  });

  return router;
}
