import { Product } from '../../entity/product';

export interface ProductRepository {
  create: (product: Product) => Promise<Product>
  findAll: () => Promise<Product[]>
  findOne: (id: string) => Promise<Product | null>
  findByName: (name: string) => Promise<Product | null>
  update: (product: Product) => Promise<Product>
  delete: (id: string) => Promise<void>
}
