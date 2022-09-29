import { OutputBrandDto } from '../../../domain/dtos/brand-dtos'

export interface FindOneBrandUseCase {
  execute: (id: string) => Promise<OutputBrandDto>
}
