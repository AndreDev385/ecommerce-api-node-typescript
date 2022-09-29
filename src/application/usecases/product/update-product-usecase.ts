import { InputProductDto, ReadProductDTO } from '../../../domain/dtos/product-dtos';

export interface UpdateProductUseCase {
  execute: (input: InputProductDto) => Promise<ReadProductDTO>
}
