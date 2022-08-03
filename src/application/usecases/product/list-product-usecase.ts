import { Product } from "../../../domain/entity/product";

export interface ListProductUseCase {
  execute(): Promise<Product>
}