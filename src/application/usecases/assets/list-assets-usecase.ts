import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos'

export interface ListAssetsUseCase {
  execute: () => Promise<ReadAssetDTO[]>
}
