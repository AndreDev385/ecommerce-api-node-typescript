import {
  CreateBrandDTO,
  Brand,
  UpdateBrandDTO,
} from "../../../domain/entity/brand";
import { BrandRepository } from "../../../domain/repository/interface/brand-repository";
import { AssetModel } from "../../orm/sequelize/models/asset.model";
import { ProductModel } from "../../orm/sequelize/models/product.model";
import { SequelizeWrapper } from "./db-sequelize-wrapper";

export class SequelizeBrandRepository implements BrandRepository {
  private database: SequelizeWrapper;
  constructor(database: SequelizeWrapper) {
    this.database = database;
  }

  async findAll(): Promise<Brand[]> {
    const result = await this.database.findAll({
      include: [ProductModel, AssetModel],
      where: { isActive: true },
    });
    return result;
  }

  async create(brand: CreateBrandDTO): Promise<Brand> {
    const result = await this.database.create(brand);
    return result;
  }

  async findByName(name: string): Promise<Brand> {
    const result = await this.database.findOne({
      include: [ProductModel, AssetModel],
      where: { name, isActive: true },
    });
    return result;
  }

  async findById(id: number): Promise<Brand> {
    const result = await this.database.findOne({
      include: [ProductModel, AssetModel],
      where: { id, isActive: true },
    });
    return result;
  }

  async update(id: number, data: UpdateBrandDTO): Promise<Brand> {
    const result = await this.database.update(data, { where: { id } });
    return result;
  }

  async delete(id: number): Promise<void> {
    this.database.update({ isActive: false }, { where: { id } });
  }
}
