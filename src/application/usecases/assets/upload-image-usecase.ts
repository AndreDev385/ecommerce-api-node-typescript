import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos';

export interface UploadImageUseCase {
  execute: ({ path }: { path: string }) => Promise<ReadAssetDTO>;
}
