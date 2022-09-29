import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos';

export interface UploadAssetUseCase {
  execute: (object: {
    userId: string
    file: File
    fileExtension: string
  }) => Promise<ReadAssetDTO>
}
