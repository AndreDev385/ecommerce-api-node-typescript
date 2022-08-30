import { Product, ReadProductDTO, UpdateProduct } from "../../../domain/entity/product";

export interface UpdateProductUseCase {
  execute(id: number, data: UpdateProduct): Promise<ReadProductDTO>
}