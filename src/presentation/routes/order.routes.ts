import express, { NextFunction, Request, Response } from 'express';
import { ChangeOrderStatusUseCase } from '../../application/usecases/order/change-status-usecase';
import { CreateOrderUseCase } from '../../application/usecases/order/create-order-usecase';
import { FindOneOrderUseCase } from '../../application/usecases/order/findone-order-usecase';
import { ListOrderUseCase } from '../../application/usecases/order/list-order-usecase';
import { UpdateOrderUseCase } from '../../application/usecases/order/update-order-usecase';

export default function orderRoutes(
  listOrder: ListOrderUseCase,
  createOrder: CreateOrderUseCase,
  findOneOrder: FindOneOrderUseCase,
  changeOrderStatus: ChangeOrderStatusUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listOrder.execute({});
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await createOrder.execute(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await findOneOrder.execute(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  router.patch('/:id/completed', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await changeOrderStatus.execute(req.params.id, 'completed');
      res.json({ message: 'Status updated' });
    } catch (error) {
      next(error);
    }
  });

  router.patch('/:id/canceled', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await changeOrderStatus.execute(req.params.id, 'canceled');
      res.json({ message: 'Status updated' });
    } catch (error) {
      next(error);
    }
  });
  return router;
}
