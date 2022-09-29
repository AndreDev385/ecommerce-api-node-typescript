import { OutputBrandDto } from '../../../domain/dtos/brand-dtos'

export interface ListBrandUseCase {
  execute: () => Promise<OutputBrandDto[]>
}
