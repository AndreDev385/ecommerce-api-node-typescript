import { CreateCategoryDTO } from '../../../domain/dtos/category.dtos';

export interface SaveCategoryUseCase {
  execute: (category: CreateCategoryDTO) => Promise<object>
}
