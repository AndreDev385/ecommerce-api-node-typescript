import { CreateAsset, Asset, UpdateAsset } from "../../../domain/entity/asset";
import { AssetRepository } from "../../../domain/repository/interface/asset-repository";
import { SequelizeWrapper } from "./db-sequelize-wrapper";

export class SequelizeAssetRepository implements AssetRepository {
  constructor(private database: SequelizeWrapper) {}
  async findOne(id: number): Promise<Asset> {
    return await this.database.findOne({ where: { id, isActive: true } });
  }
  async update(id: number, data: UpdateAsset): Promise<Asset> {
    return await this.database.update(data, { where: { id } });
  }

  async create(asset: CreateAsset): Promise<Asset> {
    return await this.database.create(asset);
  }
  async findAll(): Promise<Asset[]> {
    return await this.database.findAll({ where: { isActive: true } });
  }
}
