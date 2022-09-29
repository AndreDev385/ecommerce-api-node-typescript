import { Category, ReadCategoryDTO, UpdateCategoryDTO } from '../../../domain/entity/category'

export interface UpdateCategoryUseCase {
  execute: (id: number, data: UpdateCategoryDTO) => Promise<ReadCategoryDTO>
}
