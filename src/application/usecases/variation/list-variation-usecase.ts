import { ReadVariationDTO } from '../../../domain/dtos/variation-dtos';

export interface ListVariationUseCase {
    execute(): Promise<ReadVariationDTO[]>;
}
