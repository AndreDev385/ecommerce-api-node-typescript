import { v4 } from 'uuid';
import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos';
import { Asset } from '../../../domain/entity/asset';
import { AssetRepository } from '../../../domain/repository/interface/asset-repository';
import { config } from '../../../presentation/config';
import { UploadAssetUseCase } from '../../usecases/assets/upload-asset-usecase';

export class UploadAssetAWS implements UploadAssetUseCase {
  private static instance: UploadAssetUseCase;

  constructor(private assetRepository: AssetRepository) {}

  static getInstance(repo: AssetRepository) {
    if (!UploadAssetAWS.instance) {
      UploadAssetAWS.instance = new UploadAssetAWS(repo);
    }
    return UploadAssetAWS.instance;
  }

  async execute({
    file,
    fileExtension,
  }: {
    file: File;
    fileExtension: string;
  }): Promise<ReadAssetDTO> {
    if (!file) {
      throw new Error('No file found');
    }
    if (!fileExtension) {
      throw new Error('No file extension');
    }
    const assetName = `${Date.now()}.${fileExtension}`;

    const assetUrl = `https://${config.S3_BUCKET_NAME}.s3.amazonaws.com/${assetName}`;

    let id = v4();
    const asset = new Asset({ id, originalUrl: assetUrl });

    const newAsset = await this.assetRepository.create(asset);

    return newAsset.getData();
  }
}
