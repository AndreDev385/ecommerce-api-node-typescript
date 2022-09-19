import { CreateAssetDTO, ReadAssetDTO } from '../../../domain/dtos/asset-dtos';

export interface UpdateAssetUseCase {
    execute(asset: CreateAssetDTO): Promise<ReadAssetDTO>;
}
