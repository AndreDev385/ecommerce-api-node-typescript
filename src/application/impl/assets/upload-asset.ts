import { Asset } from "../../../domain/entity/asset";
import { AssetRepository } from "../../../domain/repository/interface/asset-repository";
import { config } from "../../../presentation/config";
import { UploadAssetUseCase } from "../../usecases/assets/upload-asset-usecase";

export class UploadAssetImpl implements UploadAssetUseCase {
  assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  execute(object: {
    userId: number;
    asset: File;
    fileExtension: string;
  }): Promise<Asset> {
    const assetName = `${Date.now()}.${object.fileExtension}`;

    const assetUrl = `https://${config.S3_BUCKET_NAME}.s3.amazonaws.com/${assetName}`;

    const asset = this.assetRepository.create({
      owner: object.userId,
      originalUrl: assetUrl,
    });

    return asset;
  }
}
