import { Asset, UpdateAsset } from "../../../domain/entity/asset";

export interface UpdateAssetUseCase {
  execute(id: number, asset: UpdateAsset): Promise<Asset>
}