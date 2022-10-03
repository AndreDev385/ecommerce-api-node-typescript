import { Asset } from '../../entity/asset';

export interface AssetRepository {
  create: (asset: Asset) => Promise<Asset>;
  findAll: () => Promise<Asset[]>;
  findOne: (id: string) => Promise<Asset>;
}
