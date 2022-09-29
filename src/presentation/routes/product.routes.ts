import express, { NextFunction, Request, Response } from 'express';

import { SaveProductUseCase } from '../../application/usecases/product/create-product-usecase';
import { DeleteProductUseCase } from '../../application/usecases/product/delete-product-usecase';
import { FindOneProductUseCase } from '../../application/usecases/product/findone-product-usecase';
import { ListProductUseCase } from '../../application/usecases/product/list-product-usecase';

export default function productRouter (
  listProduct: ListProductUseCase,
  createProduct: SaveProductUseCase,
  findOneProduct: FindOneProductUseCase,
  deleteProduct: DeleteProductUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await listProduct.execute();
      res.json(product);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const product = await createProduct.execute(body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await findOneProduct.execute(req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  });
  router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await createProduct.execute({ ...req.body, id });
      res.json(product);
    } catch (err) {
      next(err);
    }
  });
  router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await deleteProduct.execute(req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  });
  return router;
}
