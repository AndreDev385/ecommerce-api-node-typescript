import { Category } from '../../../domain/entity/category';
import { CategoryRepository } from '../../../domain/repository/interface/category-repository';
import { AssetModel } from '../../orm/sequelize/models/asset.model';
import { ProductModel } from '../../orm/sequelize/models/product.model';
import { SequelizeWrapper } from './db-sequelize-wrapper';

export class SequelizeCategoryRepository implements CategoryRepository {
  private readonly database: SequelizeWrapper;
  private static instance: CategoryRepository;

  constructor (database: SequelizeWrapper) {
    this.database = database;
  }

  static getInstance (db: SequelizeWrapper) {
    if (!SequelizeCategoryRepository.instance) {
      SequelizeCategoryRepository.instance = new SequelizeCategoryRepository(db);
    }
    return SequelizeCategoryRepository.instance;
  }

  async create (category: Category): Promise<Category> {
    const result = await this.database.create(category.getData());
    return new Category(result);
  }

  async findAll (): Promise<Category[]> {
    const result = await this.database.findAll({
      include: [ProductModel, AssetModel]
    })
    return result.map((c) => new Category(c));
  }

  async findByName (name: string): Promise<Category | null> {
    const result = await this.database.findOne({
      include: [ProductModel, AssetModel],
      where: { name }
    })
    if (!result) {
      return null;
    }
    return new Category(result);
  }

  async findById (id: string): Promise<Category | null> {
    const result = await this.database.findOne({
      include: [ProductModel, AssetModel],
      where: { id }
    })
    if (!result) {
      return null;
    }
    return new Category(result);
  }

  async update (category: Category): Promise<Category> {
    await this.database.update(category.getData(), {
      where: { id: category.getData().id }
    })
    const result = await this.database.findOne({
      where: { id: category.getData().id },
      include: [ProductModel, AssetModel]
    })
    return new Category(result);
  }

  async delete (id: string): Promise<void> {
    await this.database.delete({ where: { id } });
  }
}
