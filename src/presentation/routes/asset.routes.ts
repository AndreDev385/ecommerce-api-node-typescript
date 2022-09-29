import express, { NextFunction, Request, Response } from 'express'
import { ListAssetsUseCase } from '../../application/usecases/assets/list-assets-usecase'
import { UploadImageUseCase } from '../../application/usecases/assets/upload-image-usecase'
import { uploadHandler } from '../middlewares/multer-handler'
import { checkJWT, isRole } from '../middlewares/auth.handler'
import { UpdateAssetUseCase } from '../../application/usecases/assets/update-asset-usecase'

export default function assetRouter (
  listAssets: ListAssetsUseCase,
  uploadAsset: UploadImageUseCase,
  updateAsset: UpdateAssetUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listAssets.execute();
      res.send(result);
    } catch (error) {
      next(error);
    }
  });

  // cloudinary
  router.post(
    '/',
    checkJWT,
    isRole(['admin', 'seller']),
    uploadHandler.single('image'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req.body.user);
        const result = await uploadAsset.execute({
          userId: req.body.user,
          path: `${req.file?.path}`
        })
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await updateAsset.execute(
          Number(req.params.id),
          req.body
        );
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}
