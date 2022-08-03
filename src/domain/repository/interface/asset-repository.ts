import { Asset, CreateAsset } from "../../entity/asset";

export interface AssetRepository {
  create(asset: CreateAsset): Promise<Asset>
  findAll(): Promise<Asset[]>;
  upload(userId: number, file: File, fileExtension: string): Promise<Asset>;
}
