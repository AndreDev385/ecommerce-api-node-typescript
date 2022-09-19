import { Brand } from '../../../domain/entity/brand';
import { OutputBrandDto } from '../../../domain/dtos/brand-dtos';
import { BrandRepository } from '../../../domain/repository/interface/brand-repository';
import { AssetModel } from '../../orm/sequelize/models/asset.model';
import { ProductModel } from '../../orm/sequelize/models/product.model';
import { SequelizeWrapper } from './db-sequelize-wrapper';

export class SequelizeBrandRepository implements BrandRepository {
    private database: SequelizeWrapper;
    constructor(database: SequelizeWrapper) {
        this.database = database;
    }

    async findAll(): Promise<OutputBrandDto[]> {
        const result = await this.database.findAll({
            include: [ProductModel, AssetModel],
            where: { isActive: true },
        });
        return result;
    }

    async create(brand: Brand): Promise<OutputBrandDto> {
        const result = await this.database.create(brand);
        return result;
    }

    async findByName(name: string): Promise<OutputBrandDto> {
        const result = await this.database.findOne({
            include: [ProductModel, AssetModel],
            where: { name, isActive: true },
        });
        return result;
    }

    async findById(id: string): Promise<OutputBrandDto> {
        const result = await this.database.findOne({
            include: [ProductModel, AssetModel],
            where: { id, isActive: true },
        });
        return result;
    }

    async update(brand: Brand): Promise<OutputBrandDto> {
        const result = await this.database.update(brand, {
            where: { id: brand.getId() },
        });
        return result;
    }

    async delete(id: string): Promise<void> {
        this.database.update({ isActive: false }, { where: { id } });
    }
}
