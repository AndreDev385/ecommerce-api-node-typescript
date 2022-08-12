import express, { NextFunction, Request, Response } from "express";
import { ListAssetsUseCase } from "../../application/usecases/assets/list-assets-usecase";
import { UploadImageUseCase } from "../../application/usecases/assets/upload-image-usecase";
import { uploadHandler } from "../middlewares/multer-handler";
import { checkJWT, isRole } from "../middlewares/auth.handler";
import { UpdateAssetUseCase } from "../../application/usecases/assets/update-asset-usecase";

export default function assetRouter(
  listAssets: ListAssetsUseCase,
  uploadAsset: UploadImageUseCase,
  updateAsset: UpdateAssetUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listAssets.execute();
      res.send({ message: "Success", data: result });
    } catch (error) {
      next(error);
    }
  });

  router.post(
    "/",
    checkJWT,
    isRole(["admin", "seller"]),
    uploadHandler.single("image"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req.body.user);
        const result = await uploadAsset.execute({
          userId: 1,
          path: `${req.file?.path}`,
        });
        res.json({
          message: "Success",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await updateAsset.execute(
          Number(req.params.id),
          req.body
        );
        res.json({ message: "Success", data: result });
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}
