import express, { NextFunction, Request, Response } from "express";
import { BrandModel } from "../../adapters/orm/sequelize/models/brand.model";
import { ProductModel } from "../../adapters/orm/sequelize/models/product.model";
import { CreateBrandUseCase } from "../../application/usecases/brand/create-brand";
import { DeleteBrandUseCase } from "../../application/usecases/brand/delete-brand";
import { FindOneBrandUseCase } from "../../application/usecases/brand/findone-brand";
import { ListBrandUseCase } from "../../application/usecases/brand/list-brand";
import { UpdateBrandUseCase } from "../../application/usecases/brand/update-brand";

export default function brandRouter(
  createBrand: CreateBrandUseCase,
  listBrand: ListBrandUseCase,
  findOneBrand: FindOneBrandUseCase,
  updateBrand: UpdateBrandUseCase,
  deleteBrand: DeleteBrandUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listBrand.execute();
      res.json({ message: "Success", data: result });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const result = await createBrand.execute(body);
      res.json({ message: "Brand Created", data: result });
    } catch (err) {
      next(err);
    }
  });
  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const result = await findOneBrand.execute(Number(id));
        res.json({ message: "Success", data: result });
      } catch (err) {
        next(err);
      }
    }
  );
  router.put(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const { body } = req;
        const result = await updateBrand.execute(Number(id), body);
        res.json({ message: "Brand Updated", data: result });
      } catch (err) {
        next(err);
      }
    }
  );
  router.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const result = await deleteBrand.execute(Number(id));
        res.json({ message: "Brand deleted", data: result });
      } catch (err) {
        next(err);
      }
    }
  );
  return router;
}
