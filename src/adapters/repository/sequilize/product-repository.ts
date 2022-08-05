import {
  CreateProduct,
  Product,
  UpdateProduct,
} from "../../../domain/entity/product";
import { ProductRepository } from "../../../domain/repository/interface/product-repository";
import { SequelizeWrapper } from "./db-sequelize-wrapper";

export class SequelizeProductRepository implements ProductRepository {
  private database: SequelizeWrapper;
  constructor(database: SequelizeWrapper) {
    this.database = database;
  }

  async create(product: CreateProduct): Promise<Product> {
    return await this.database.create(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.database.findAll({ where: { isActive: true } });
  }

  async findOne(id: number): Promise<Product> {
    return await this.database.findOne({ where: { id, isActive: true } });
  }

  async update(id: number, data: UpdateProduct): Promise<Product> {
    return await this.database.update(data, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.database.update({ isActive: false }, { where: { id } });
  }
}
