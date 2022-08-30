import { CreateProduct, Product, ReadProductDTO } from "../../../domain/entity/product";

export interface CreateProductUseCase {
  execute(product: CreateProduct): Promise<ReadProductDTO>
}