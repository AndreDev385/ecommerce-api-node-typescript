import express, { NextFunction, Request, Response } from 'express'
import { LoginUseCase } from '../../application/usecases/auth/login-usecase'
import { RefreshTokenUseCase } from '../../application/usecases/auth/refresh-token-usecase'

export default function authRouter (
  login: LoginUseCase,
  refreshToken: RefreshTokenUseCase
) {
  const router = express.Router();

  router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      const token = await login.execute(body);

      res.status(200).json({
        data: token,
        message: 'Login successfull'
      });
    } catch (err: any) {
      next(err)
    }
  });

  router.get('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers['x-auth-token']
      if (!token) {
        throw new Error('Unauthorized')
      }

      const accessToken = refreshToken.execute(token as string);

      res.status(200).json({
        data: accessToken,
        message: 'Access token has ben refreshed'
      });
    } catch (err: any) {
      next(err)
    }
  });

  return router;
}
