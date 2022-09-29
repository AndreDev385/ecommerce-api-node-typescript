import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos';
import { Asset } from '../../../domain/entity/asset';
import { AssetRepository } from '../../../domain/repository/interface/asset-repository';
import { Uploader } from '../../../presentation/upload/uploader';
import { UploadImageUseCase } from '../../usecases/assets/upload-image-usecase';

export class UploadAssetCloudinary implements UploadImageUseCase {
  constructor (private readonly repository: AssetRepository, private readonly uploader: Uploader) {}
  async execute ({
    userId,
    path
  }: {
    userId: string
    path: string
  }): Promise<ReadAssetDTO> {
    const url = await this.uploader.upload(path);
    const asset = new Asset(url)
    const result = await this.repository.create(asset);
    return new ReadAssetDTO(
      result.getId() as string,
      result.getOriginalUrl(),
      result.getOptimizedUrl()
    )
  }
}
