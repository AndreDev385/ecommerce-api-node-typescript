import express, { NextFunction, Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/usecases/user/create-user-usecase';
import { DeleteUserUseCase } from '../../application/usecases/user/delete-user-usecase';
import { FindOneUserUseCase } from '../../application/usecases/user/findone-user-usecase';
import { ListUserUseCase } from '../../application/usecases/user/list-user-usecase';
import { UpdateUserRoleUseCase } from '../../application/usecases/user/update-user-role-usecase';

export default function userRouter(
  listUsers: ListUserUseCase,
  createUser: CreateUserUseCase,
  findOne: FindOneUserUseCase,
  updateUserRole: UpdateUserRoleUseCase,
  deleteOne: DeleteUserUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await listUsers.execute();
      res.status(200).json(users);
    } catch (err: any) {
      next(err);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await createUser.execute(req.body);
      res.statusCode = 201;
      res.json(user);
    } catch (err: any) {
      next(err);
    }
  });

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await findOne.execute(id);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  });

  router.patch('/:id/role', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const user = await updateUserRole.execute(id, body.role);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  });

  router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await deleteOne.execute(id);
      res.status(200).json({ message: 'User deleted' });
    } catch (err: any) {
      next(err);
    }
  });

  return router;
}
