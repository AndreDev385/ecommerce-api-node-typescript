import express, { NextFunction, Request, Response } from "express";

import { CategoryModel } from "../../adapters/orm/sequelize/models/category.model";
import { ProductModel } from "../../adapters/orm/sequelize/models/product.model";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoryModel.findAll({ include: ProductModel });
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoryModel.create({ name: "Men", slug: "men" });

    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

export default router;
