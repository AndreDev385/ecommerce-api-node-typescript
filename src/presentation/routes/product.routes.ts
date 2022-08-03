import express, { NextFunction, Request, Response } from "express";

import { ProductModel } from "../../adapters/orm/sequelize/models/product.model";
import { VariationModel } from "../../adapters/orm/sequelize/models/variation.model";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductModel.findAll({ include: VariationModel });
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductModel.create({
      name: "Air Zoom",
      brandId: 1,
      categoryId: 1
    });
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
});

export default router;
