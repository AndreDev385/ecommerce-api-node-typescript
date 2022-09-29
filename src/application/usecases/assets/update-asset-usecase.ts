import { InputAssetDto, ReadAssetDTO } from '../../../domain/dtos/asset-dtos';

export interface UpdateAssetUseCase {
  execute: (asset: InputAssetDto) => Promise<ReadAssetDTO>
}
