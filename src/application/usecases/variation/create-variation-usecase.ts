import { CreateVariation, ReadVariationDTO } from '../../../domain/dtos/variation-dtos';

export interface CreateVariationUseCase {
    execute(variation: CreateVariation): Promise<ReadVariationDTO>;
}
