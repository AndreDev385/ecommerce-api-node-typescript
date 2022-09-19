import { CreateProductDTO, ReadProductDTO } from '../../../domain/dtos/product-dtos';

export interface CreateProductUseCase {
    execute(product: CreateProductDTO): Promise<ReadProductDTO>;
}
