import express, { NextFunction, Request, Response } from 'express';

import { SaveVariationUseCase } from '../../application/usecases/variation/save-variation-usecase';
import { ListVariationUseCase } from '../../application/usecases/variation/list-variation-usecase';
import { checkJWT, isRole } from '../middlewares/auth.handler';

export default function variationRouter(
  listVariation: ListVariationUseCase,
  createVariation: SaveVariationUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listVariation.execute();
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
        const result = await createVariation.execute(req.body);
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}
