import { NextFunction, Request, Response, Router } from 'express';
import { FindOneBrandUseCase } from '../../application/usecases/brand/findone-brand';
import { ListBrandUseCase } from '../../application/usecases/brand/list-brand';
import { SaveBrandUseCase } from '../../application/usecases/brand/save-brand';
import { DeleteBrandUseCase } from '../../application/usecases/brand/delete-brand';
import { checkJWT, isRole } from '../middlewares/auth.handler';

export default function brandRouter(
  saveBrand: SaveBrandUseCase,
  listBrand: ListBrandUseCase,
  findOneBrand: FindOneBrandUseCase,
  deleteBrand: DeleteBrandUseCase
) {
  const router = Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brands = await listBrand.execute();
      res.json(brands);
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/',
    checkJWT,
    isRole(['admin', 'seller']),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const brand = await saveBrand.execute(req.body);
        res.json(brand);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const brand = await findOneBrand.execute(id);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  });

  router.put(
    '/:id',
    checkJWT,
    isRole(['seller', 'admin']),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const brand = await saveBrand.execute({ ...req.body, id });
        res.json(brand);
      } catch (error) {
        next(error);
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
        await deleteBrand.execute(id);
        res.json({ message: 'Brand deleted' });
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}
