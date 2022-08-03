import express, { NextFunction, Request, Response } from "express";
import { BrandModel } from "../../adapters/orm/sequelize/models/brand.model";
import { ProductModel } from "../../adapters/orm/sequelize/models/product.model";


const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BrandModel.findAll({include: ProductModel})
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BrandModel.create({name: "Nike"})
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});
export default router