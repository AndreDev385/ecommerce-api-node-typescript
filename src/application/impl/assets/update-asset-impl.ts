import { UpdateAsset, Asset } from "../../../domain/entity/asset";
import { AssetRepository } from "../../../domain/repository/interface/asset-repository";
import { UpdateAssetUseCase } from "../../usecases/assets/update-asset-usecase";

export class UpdateAssetImpl implements UpdateAssetUseCase {
  constructor(private repository: AssetRepository) {}

  async execute(id: number, asset: UpdateAsset): Promise<Asset> {
    Asset.validateUpdateAsset(asset);
    await this.repository.update(id, asset);
    return await this.repository.findOne(id);
  }
}
