import { CreateCategoryDTO, ReadCategoryDTO } from '../../../domain/dtos/category.dtos';

export interface CreateCategoryUseCase {
    execute(category: CreateCategoryDTO): Promise<ReadCategoryDTO>;
}
