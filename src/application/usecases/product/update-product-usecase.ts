import { Product, ReadProductDTO, UpdateProductDTO } from "../../../domain/entity/product";

export interface UpdateProductUseCase {
  execute(id: number, data: UpdateProductDTO): Promise<ReadProductDTO>
}