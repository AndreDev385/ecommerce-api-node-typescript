import { Product } from "../../../domain/entity/product";

export interface FindOneProductUseCase {
  execute(id: number): Promise<Product>
}