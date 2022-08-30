import { Product, ReadProductDTO } from "../../../domain/entity/product";

export interface FindOneProductUseCase {
  execute(id: number): Promise<ReadProductDTO>
}