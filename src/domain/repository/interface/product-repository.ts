import { CreateProduct, Product } from "../../entity/product";

export interface ProductRepository {
  create(product: CreateProduct): Promise<Product>;
  findAll(): Promise<Product[]>;
}
