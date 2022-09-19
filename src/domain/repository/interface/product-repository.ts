import { Product } from '../../entity/product';

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(product: Product): Promise<Product>;
    delete(id: string): Promise<void>;
}
