import { AssetRepository } from '../../../domain/repository/interface/asset-repository';
import { UpdateAssetUseCase } from '../../usecases/assets/update-asset-usecase';
import { Asset } from '../../../domain/entity/asset';
import { CreateAssetDTO, ReadAssetDTO } from '../../../domain/dtos/asset-dtos';

export class UpdateAssetImpl implements UpdateAssetUseCase {
    constructor(private repository: AssetRepository) {}

    async execute(input: CreateAssetDTO): Promise<ReadAssetDTO> {
        let asset = new Asset(input.originalUrl, input.id, input.optimizedUrl);
        await this.repository.update(asset);
        const newAsset = await this.repository.findOne(asset.getId() as string);
        return new ReadAssetDTO(
            newAsset.getId() as string,
            newAsset.getOriginalUrl(),
            newAsset.getOptimizedUrl()
        );
    }
}
