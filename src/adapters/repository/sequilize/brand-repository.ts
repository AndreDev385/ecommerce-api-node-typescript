import { Brand, CreateBrand, UpdateBrand } from "../../../domain/entity/brand";
import { BrandRepository } from "../../../domain/repository/interface/brand-repository";
import { SequelizeWrapper } from "./db-sequelize-wrapper";

export class SequelizeBrandRepository implements BrandRepository {
  private database: SequelizeWrapper;
  constructor(database: SequelizeWrapper) {
    this.database = database;
  }

  async findAll(): Promise<Brand[]> {
    const result = await this.database.findAll({ where: { isActive: true } });
    return result;
  }

  async create(brand: CreateBrand): Promise<Brand> {
    const result = await this.database.create(brand);
    return result;
  }

  async findByName(name: string): Promise<Brand> {
    const result = await this.database.findOne({
      where: { name, isActive: true },
    });
    return result;
  }

  async findById(id: number): Promise<Brand> {
    const result = await this.database.findOne({
      where: { id, isActive: true },
    });
    return result;
  }

  async update(id: number, data: UpdateBrand): Promise<Brand> {
    const result = await this.database.update(data, { where: { id } });
    return result;
  }

  async delete(id: number): Promise<void> {
    this.database.update({ isActive: false }, { where: { id } });
  }
}