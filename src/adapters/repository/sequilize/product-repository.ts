import { Product } from '../../../domain/entity/product';
import { ProductRepository } from '../../../domain/repository/interface/product-repository';
import { AssetModel } from '../../orm/sequelize/models/asset.model';
import { AttributesModel, VariationModel } from '../../orm/sequelize/models/variation.model';
import { SequelizeWrapper } from './db-sequelize-wrapper';

export class SequelizeProductRepository implements ProductRepository {
  private readonly database: SequelizeWrapper;
  private static instance: ProductRepository;
  constructor (database: SequelizeWrapper) {
    this.database = database;
  }

  static getInstance (db: SequelizeWrapper) {
    if (!SequelizeProductRepository.instance) {
      SequelizeProductRepository.instance = new SequelizeProductRepository(db);
    }
    return SequelizeProductRepository.instance;
  }

  async create (product: Product): Promise<Product> {
    const result = await this.database.create(product);
    return new Product(result);
  }

  async findAll (): Promise<Product[]> {
    const result = await this.database.findAll({
      include: [
        { model: AssetModel },
        { model: VariationModel, include: [AttributesModel, AssetModel] }
      ]
    });
    return result.map((p) => new Product(p));
  }

  async findOne (id: string): Promise<Product | null> {
    const result = await this.database.findOne({
      include: [
        { model: AssetModel },
        { model: VariationModel, include: [AttributesModel, AssetModel] }
      ],
      where: { id }
    })
    if (!result) {
      return null;
    }
    return new Product(result);
  }

  async findByName (name: string): Promise<Product | null> {
    const result = await this.database.findOne({
      include: [
        { model: AssetModel },
        { model: VariationModel, include: [AttributesModel, AssetModel] }
      ],
      where: { name }
    })
    if (!result) {
      return null;
    }
    return new Product(result);
  }

  async update (product: Product): Promise<Product> {
    await this.database.update(product.getData(), {
      where: { id: product.getData().id }
    })
    const result = await this.database.findOne({
      where: { id: product.getData().id },
      include: [VariationModel, AssetModel]
    })
    return new Product(result);
  }

  async delete (id: string): Promise<void> {
    await this.database.delete({ where: { id } });
  }
}
