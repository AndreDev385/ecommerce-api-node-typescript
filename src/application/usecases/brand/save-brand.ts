import { InputBrandDto, OutputBrandDto } from '../../../domain/dtos/brand-dtos'

export interface SaveBrandUseCase {
  execute: (brand: InputBrandDto) => Promise<OutputBrandDto>
}
