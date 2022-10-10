import express, { NextFunction, Request, Response } from 'express';

import { ListCategoriesUseCase } from '../../application/usecases/category/list-categories';
import { SaveCategoryUseCase } from '../../application/usecases/category/save-category-usecase';
import { FindOneCategoryUseCase } from '../../application/usecases/category/findone-category-usecase';
import { UpdateCategoryUseCase } from '../../application/usecases/category/update-category-usecase';
import { DeleteCategoryUseCase } from '../../application/usecases/category/delete-category-usecase';
import { checkJWT, isRole } from '../middlewares/auth.handler';

export default function categoryRouter(
  listCategory: ListCategoriesUseCase,
  saveCategory: SaveCategoryUseCase,
  findOneCategory: FindOneCategoryUseCase,
  deleteCategory: DeleteCategoryUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listCategory.execute();
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  router.post(
    '/',
    checkJWT,
    isRole(['admin', 'seller']),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { body } = req;
        const result = await saveCategory.execute(body);

        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await findOneCategory.execute(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:id',
    checkJWT,
    isRole(['admin', 'seller']),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const { body } = req;
        const result = await saveCategory.execute({ ...body, id });
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:id',
    checkJWT,
    isRole(['admin', 'seller']),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        await deleteCategory.execute(id);
        res.json({
          message: 'Category deleted successfully',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}
