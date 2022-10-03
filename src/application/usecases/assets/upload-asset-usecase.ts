import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos';

export interface UploadAssetUseCase {
  execute: (object: { file: File; fileExtension: string }) => Promise<ReadAssetDTO>;
}
