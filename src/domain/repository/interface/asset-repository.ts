import { CreateAssetDTO, ReadAssetDTO, UpdateAssetDTO } from '../../dtos/asset-dtos';
import { Asset } from '../../entity/asset';

export interface AssetRepository {
    create(asset: Asset): Promise<Asset>;
    findAll(): Promise<Asset[]>;
    findOne(id: string): Promise<Asset>;
    update(asset: Asset): Promise<Asset>;
}
