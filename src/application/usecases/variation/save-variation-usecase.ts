import { InputVariationDto, ReadVariationDTO } from '../../../domain/dtos/variation-dtos';

export interface SaveVariationUseCase {
  execute: (variation: InputVariationDto) => Promise<ReadVariationDTO>
}
