import { ReadProductDTO } from '../../../domain/dtos/product-dtos';

export interface ListProductUseCase {
    execute(): Promise<ReadProductDTO[]>;
}
