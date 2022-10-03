import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos';
import { AssetRepository } from '../../../domain/repository/interface/asset-repository';
import { ListAssetsUseCase } from '../../usecases/assets/list-assets-usecase';

export class ListAssetsImpl implements ListAssetsUseCase {
  private static instance: ListAssetsUseCase;

  constructor(private assetRepository: AssetRepository) {}

  static getInstance(repo: AssetRepository) {
    if (!ListAssetsImpl.instance) {
      ListAssetsImpl.instance = new ListAssetsImpl(repo);
    }
    return ListAssetsImpl.instance;
  }

  async execute(): Promise<ReadAssetDTO[]> {
    const assets = await this.assetRepository.findAll();
    return assets.map((a) => a.getData());
  }
}
