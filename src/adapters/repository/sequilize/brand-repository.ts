import { Brand } from '../../../domain/entity/brand';
import { OutputBrandDto } from '../../../domain/dtos/brand-dtos';
import { BrandRepository } from '../../../domain/repository/interface/brand-repository';
import { AssetModel } from '../../orm/sequelize/models/asset.model';
import { ProductModel } from '../../orm/sequelize/models/product.model';
import { SequelizeWrapper } from './db-sequelize-wrapper';

export class SequelizeBrandRepository implements BrandRepository {
  private static instance: BrandRepository;

  public static getInstance (model: SequelizeWrapper) {
    if (!SequelizeBrandRepository.instance) {
      SequelizeBrandRepository.instance = new SequelizeBrandRepository(model);
    }
    return SequelizeBrandRepository.instance;
  }

  private readonly database: SequelizeWrapper;
  constructor (database: SequelizeWrapper) {
    this.database = database;
  }

  async create (brand: Brand): Promise<Brand> {
    const result = await this.database.create(brand.getData());
    console.log(result, 'result');
    return new Brand(result);
  }

  async findAll (): Promise<Brand[]> {
    const result = await this.database.findAll({ include: [ProductModel, AssetModel] });
    return result.map((b) => new Brand(b));
  }

  async findByName (name: string): Promise<Brand | null> {
    console.log(name, 'find By name');
    const result = await this.database.findOne({
      where: { name },
      include: [ProductModel, AssetModel]
    })
    if (!result) {
      return null;
    }
    return new Brand(result);
  }

  async findById (id: string): Promise<Brand | null> {
    const result = await this.database.findOne({
      where: { id },
      include: [ProductModel, AssetModel]
    })
    if (!result) return null;
    return new Brand(result);
  }

  async update (brand: Brand): Promise<Brand> {
    await this.database.update(brand.getData(), {
      where: { id: brand.getData().id }
    })
    const result = await this.database.findOne({
      where: { id: brand.getData().id },
      include: [ProductModel, AssetModel]
    })
    return new Brand(result);
  }

  async delete (id: string): Promise<void> {
    await this.database.delete({ where: { id } });
  }
}
