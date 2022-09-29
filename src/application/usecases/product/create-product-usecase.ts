import { InputProductDto, ReadProductDTO } from '../../../domain/dtos/product-dtos';

export interface SaveProductUseCase {
  execute: (product: InputProductDto) => Promise<object>
}
