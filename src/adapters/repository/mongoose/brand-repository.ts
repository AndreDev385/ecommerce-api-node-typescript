import { v4 } from 'uuid';
import { resourceLimits } from 'worker_threads';
import { Brand } from '../../../domain/entity/brand';
import { BrandRepository } from '../../../domain/repository/interface/brand-repository';
import { MongooseWrapper } from '../../orm/mongoose/mongoose-db-wrapper';

export class MongooseBrandRepository implements BrandRepository {
    constructor(private readonly database: MongooseWrapper) {}

    async create(brand: Brand): Promise<Brand> {
        const result = await this.database.create({
            id: v4(),
            name: brand.getName(),
            description: brand.getDescription(),
            asset: brand.getAsset(),
            products: brand.getProducts(),
        });
        return result
    }
    async findAll(): Promise<Brand[]> {
        const result = await this.database.find({});
        return result
    }
    async findById(id: string): Promise<Brand | null> {
        const result = await this.database.findOne({ id });
        if (!result) return null;

        return new Brand(result.name, result.id, result.description, result.asset, result.products);
    }
    async findByName(name: string): Promise<Brand | null> {
        const result = await this.database.findOne({ name });
        if (!result) return null;

        return new Brand(result.name, result.id, result.description, result.asset, result.products);
    }
    async update(brand: Brand): Promise<Brand> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
