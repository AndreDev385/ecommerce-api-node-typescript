import {
  CreateCategoryDTO,
  Category,
  UpdateCategoryDTO,
} from "../../../domain/entity/category";
import { CategoryRepository } from "../../../domain/repository/interface/category-repository";
import { AssetModel } from "../../orm/sequelize/models/asset.model";
import { ProductModel } from "../../orm/sequelize/models/product.model";
import { SequelizeWrapper } from "./db-sequelize-wrapper";

export class SequelizeCategoryRepository implements CategoryRepository {
  private database: SequelizeWrapper;
  constructor(database: SequelizeWrapper) {
    this.database = database;
  }

  async create(category: CreateCategoryDTO): Promise<Category> {
    const result = await this.database.create(category);
    return result;
  }

  async findAll(): Promise<Category[]> {
    const result = await this.database.findAll({
      include: [ProductModel, AssetModel],
      where: { isActive: true },
    });
    return result;
  }

  async findName(name: string): Promise<Category> {
    const result = await this.database.findOne({
      include: [ProductModel, AssetModel],
      where: { isActive: true, name },
    });
    return result;
  }

  async findById(id: number): Promise<Category> {
    const result = await this.database.findOne({
      include: [ProductModel, AssetModel],
      where: { isActive: true, id },
    });
    return result;
  }

  async update(id: number, data: UpdateCategoryDTO): Promise<Category> {
    const result = await this.database.update(
      data,
      { where: { isActive: true, id } }
    );
    return result;
  }

  async delete(id: number): Promise<void> {
    await this.database.update({ isActive: false }, { where: { id } });
  }
}
