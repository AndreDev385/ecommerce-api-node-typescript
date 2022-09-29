import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos';
import { Asset } from '../../../domain/entity/asset';
import { AssetRepository } from '../../../domain/repository/interface/asset-repository';
import { config } from '../../../presentation/config';
import { UploadAssetUseCase } from '../../usecases/assets/upload-asset-usecase';

export class UploadAssetAWS implements UploadAssetUseCase {
  assetRepository: AssetRepository;

  constructor (assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute (object: {
    userId: string
    file: File
    fileExtension: string
  }): Promise<ReadAssetDTO> {
    const assetName = `${Date.now()}.${object.fileExtension}`;

    const assetUrl = `https://${config.S3_BUCKET_NAME}.s3.amazonaws.com/${assetName}`;

    const asset = new Asset(assetUrl)

    const newAsset = await this.assetRepository.create(asset);

    return new ReadAssetDTO(
      newAsset.getId() as string,
      newAsset.getOriginalUrl(),
      newAsset.getOptimizedUrl()
    )
  }
}
