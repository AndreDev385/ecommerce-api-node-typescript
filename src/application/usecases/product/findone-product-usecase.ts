import { ReadProductDTO } from '../../../domain/dtos/product-dtos';

export interface FindOneProductUseCase {
    execute(id: number): Promise<ReadProductDTO>;
}
