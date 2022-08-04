import express, { NextFunction, Request, Response } from "express";

import { CategoryModel } from "../../adapters/orm/sequelize/models/category.model";
import { ProductModel } from "../../adapters/orm/sequelize/models/product.model";
import { ListCategoriesUseCase } from "../../application/usecases/category/list-categories";
import { CreateCategoryUseCase } from "../../application/usecases/category/create-category-usecase";
import { FindOneCategoryUseCase } from "../../application/usecases/category/findone-category-usecase";
import { UpdateCategoryUseCase } from "../../application/usecases/category/update-category-usecase";
import { DeleteCategoryUseCase } from "../../application/usecases/category/delete-category-usecase";

export default function categoryRouter(
  listCategoryUseCase: ListCategoriesUseCase,
  createCategoryUseCase: CreateCategoryUseCase,
  findOneCategory: FindOneCategoryUseCase,
  updateCategory: UpdateCategoryUseCase,
  deleteCategory: DeleteCategoryUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listCategoryUseCase.execute();
      res.json({ message: "Success", data: result });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const result = await createCategoryUseCase.execute(body);

      res.json({ message: "Category created!", data: result });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const result = await findOneCategory.execute(Number(id));
        res.json({
          message: "Success",
          data: result,
        });
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
        const result = await updateCategory.execute(Number(id), body);
        res.json({
          message: "Category updated successfully",
          data: result,
        });
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
        const result = await deleteCategory.execute(Number(id));
        res.json({
          message: "Category deleted successfully",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}
