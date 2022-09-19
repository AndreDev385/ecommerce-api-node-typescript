import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos';
import { AssetRepository } from '../../../domain/repository/interface/asset-repository';
import { ListAssetsUseCase } from '../../usecases/assets/list-assets-usecase';

export class ListAssetsImpl implements ListAssetsUseCase {
    assetRepository: AssetRepository;

    constructor(assetRepository: AssetRepository) {
        this.assetRepository = assetRepository;
    }

    async execute(): Promise<ReadAssetDTO[]> {
        const assets = await this.assetRepository.findAll();
        const result = assets.map((a) => ({
            id: a.getId() as string,
            originalUrl: a.getOriginalUrl() as string,
            optimizedUrl: a.getOptimizedUrl(),
        }));
        return result;
    }
}
