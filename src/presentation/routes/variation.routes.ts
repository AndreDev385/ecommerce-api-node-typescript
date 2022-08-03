
import express, { NextFunction, Request, Response } from "express";

import { VariationModel } from "../../adapters/orm/sequelize/models/variation.model";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await VariationModel.findAll();
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await VariationModel.create({
      normalPrice: 20,
      stock: 10,
      productId: 1
    });
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
});

export default router;
