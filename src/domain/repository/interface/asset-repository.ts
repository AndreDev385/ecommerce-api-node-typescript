import { Asset, CreateAsset, UpdateAsset } from "../../entity/asset";

export interface AssetRepository {
  create(asset: CreateAsset): Promise<Asset>
  findAll(): Promise<Asset[]>;
  findOne(id: number): Promise<Asset>
  update(id: number, data: UpdateAsset): Promise<Asset>
}
