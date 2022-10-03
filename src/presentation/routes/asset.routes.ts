import express, { NextFunction, Request, Response } from 'express';
import { ListAssetsUseCase } from '../../application/usecases/assets/list-assets-usecase';
import { UploadImageUseCase } from '../../application/usecases/assets/upload-image-usecase';
import { uploadHandler } from '../middlewares/multer-handler';
import { checkJWT, isRole } from '../middlewares/auth.handler';
import { UploadAssetUseCase } from '../../application/usecases/assets/upload-asset-usecase';
import { isImage } from '../middlewares/is-image.handler';

export default function assetRouter(
  listAssets: ListAssetsUseCase,
  uploadAssetAws: UploadAssetUseCase,
  UploadAssetCloudinary: UploadImageUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listAssets.execute();
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // cloudinary
  router.post(
    '/cloudinary',
    /*checkJWT,
    isRole(['admin', 'seller']),*/
    uploadHandler.single('image'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log('Hereee', req.file);
        const result = await UploadAssetCloudinary.execute({
          path: `${req.file?.path}`,
        });
        res.json(result);
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  );

  // AWS
  /*router.post(
    '/aws',
    checkJWT,
    isRole(['admin', 'seller']),
    isImage,
    async (req: any, res: Response, next: NextFunction) => {
      try {
        //console.log(req.body.user);
        const result = await uploadAssetAws.execute({
          file: req.body,
          fileExtension: req.fileExtension,
        });
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
  );*/

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  });

  return router;
}
