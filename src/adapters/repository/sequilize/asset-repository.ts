import { Asset } from '../../../domain/entity/asset';
import { AssetRepository } from '../../../domain/repository/interface/asset-repository';
import { SequelizeWrapper } from './db-sequelize-wrapper';

export class SequelizeAssetRepository implements AssetRepository {
  private static instance: AssetRepository;

  constructor(private readonly database: SequelizeWrapper) {}

  static getInstance(db: SequelizeWrapper) {
    if (!SequelizeAssetRepository.instance) {
      SequelizeAssetRepository.instance = new SequelizeAssetRepository(db);
    }
    return SequelizeAssetRepository.instance;
  }

  async create(asset: Asset) {
    const result = await this.database.create(asset.getData());
    return asset;
  }
  async findAll() {
    const result = await this.database.findAll({});
    return result.map((a) => new Asset(a));
  }
  async findOne(id: string) {
    const result = await this.database.findOne({ where: { id } });
    return new Asset(result);
  }
  async update(asset: Asset) {
    const result = await this.database.update(asset.getData(), {
      where: { id: asset.getData().id },
    });
    return asset;
  }
}
