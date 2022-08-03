import { CreateProduct, Product } from "../../../domain/entity/product";

export interface CreateProductUseCase {
  execute(product: CreateProduct): Promise<Product>
}