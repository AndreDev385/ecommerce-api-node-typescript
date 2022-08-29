import express, { NextFunction, Request, Response } from "express";

import { ProductModel } from "../../adapters/orm/sequelize/models/product.model";
import { VariationModel } from "../../adapters/orm/sequelize/models/variation.model";
import { CreateProductUseCase } from "../../application/usecases/product/create-product-usecase";
import { DeleteProductUseCase } from "../../application/usecases/product/delete-product-usecase";
import { FindOneProductUseCase } from "../../application/usecases/product/findone-product-usecase";
import { ListProductUseCase } from "../../application/usecases/product/list-product-usecase";
import { UpdateProductUseCase } from "../../application/usecases/product/update-product-usecase";

export default function productRouter(
  listProduct: ListProductUseCase,
  createProduct: CreateProductUseCase,
  findOneProduct: FindOneProductUseCase,
  updateProduct: UpdateProductUseCase,
  deleteProduct: DeleteProductUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await listProduct.execute();
      res.json(product);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const product = await createProduct.execute(body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const product = await findOneProduct.execute(Number(req.params.id));
        res.json(product);
      } catch (err) {
        next(err);
      }
    }
  );
  router.put(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const product = await updateProduct.execute(
          Number(req.params.id),
          req.body
        );
        res.json(product);
      } catch (err) {
        next(err);
      }
    }
  );
  router.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const product = await deleteProduct.execute(Number(req.params.id));
        res.json(product);
      } catch (err) {
        next(err);
      }
    }
  );
  return router;
}
