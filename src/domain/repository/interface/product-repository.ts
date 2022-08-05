import { CreateProduct, Product, UpdateProduct } from "../../entity/product";

export interface ProductRepository {
  create(product: CreateProduct): Promise<Product>;
  findAll(): Promise<Product[]>;
  findOne(id: number): Promise<Product>;
  update(id: number, data: UpdateProduct): Promise<Product>;
  delete(id: number): Promise<void>;
}
