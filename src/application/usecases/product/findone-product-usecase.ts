import { ReadProductDTO } from '../../../domain/dtos/product-dtos';

export interface FindOneProductUseCase {
  execute: (id: string) => Promise<ReadProductDTO>
}
