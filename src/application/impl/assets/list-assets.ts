import { Asset } from "../../../domain/entity/asset";
import { AssetRepository } from "../../../domain/repository/interface/asset-repository";
import { ListAssetsUseCase } from "../../usecases/assets/list-assets-usecase";

export class ListAssetsImpl implements ListAssetsUseCase {

  assetRepository: AssetRepository

  constructor(assetRepository: AssetRepository){
    this.assetRepository = assetRepository
  }

  execute(): Promise<Asset[]> {
    const result = this.assetRepository.findAll()
    return result
  }
}