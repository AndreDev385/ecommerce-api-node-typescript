import { Product, ReadProductDTO } from "../../../domain/entity/product";

export interface ListProductUseCase {
  execute(): Promise<ReadProductDTO[]>
}