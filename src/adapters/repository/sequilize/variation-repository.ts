import { Variation } from '../../../domain/entity/variation';
import { VariationRepository } from '../../../domain/repository/interface/variation-repository';
import { AssetModel } from '../../orm/sequelize/models/asset.model';
import { AttributesModel } from '../../orm/sequelize/models/variation.model';
import { SequelizeWrapper } from './db-sequelize-wrapper';

export class SequelizeVariationRepository implements VariationRepository {
  private static instance: VariationRepository;
  constructor(private readonly database: SequelizeWrapper) {}

  static getInstance(db: SequelizeWrapper) {
    if (!SequelizeVariationRepository.instance) {
      SequelizeVariationRepository.instance = new SequelizeVariationRepository(db);
    }
    return SequelizeVariationRepository.instance;
  }

  async create(variation: Variation): Promise<Variation> {
    const result = await this.database.create(variation.getData(), { include: AttributesModel });
    return new Variation(result);
  }

  async findAll(): Promise<Variation[]> {
    const result = await this.database.findAll({
      include: [
        {
          model: AttributesModel,
          through: { attributes: [] },
        },
        AssetModel,
      ],
    });
    return result.map((v) => new Variation(v));
  }

  async findOne(id: string): Promise<Variation | null> {
    const result = await this.database.findOne({
      include: [
        {
          model: AttributesModel,
          through: { attributes: [] },
        },
        AssetModel,
      ],
      where: { id },
    });

    if (!result) return null;

    return new Variation(result);
  }

  async update(variation: Variation): Promise<Variation> {
    await this.database.update(variation.getData(), {
      where: { id: variation.getData().id },
    });
    const result = await this.database.findOne({
      where: { id: variation.getData().id },
      include: [AttributesModel, AssetModel],
    });
    return new Variation(result);
  }

  async delete(id: string): Promise<void> {
    await this.database.delete({ where: { id } });
  }
}
