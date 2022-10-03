import { v4 } from 'uuid';
import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos';
import { Asset } from '../../../domain/entity/asset';
import { AssetRepository } from '../../../domain/repository/interface/asset-repository';
import { Uploader } from '../../../presentation/upload/uploader';
import { UploadImageUseCase } from '../../usecases/assets/upload-image-usecase';

export class UploadAssetCloudinary implements UploadImageUseCase {
  private static instance: UploadImageUseCase;

  constructor(private readonly repository: AssetRepository, private readonly uploader: Uploader) {}

  static getInstance(repo: AssetRepository, uploader: Uploader) {
    if (!UploadAssetCloudinary.instance) {
      UploadAssetCloudinary.instance = new UploadAssetCloudinary(repo, uploader);
    }
    return UploadAssetCloudinary.instance;
  }

  async execute({ path }: { path: string }): Promise<ReadAssetDTO> {
    console.log(path, 'PATH');
    let id = v4();
    const url = await this.uploader.upload(path);
    const asset = new Asset({ id, originalUrl: url });
    const result = await this.repository.create(asset);

    return result.getData();
  }
}
