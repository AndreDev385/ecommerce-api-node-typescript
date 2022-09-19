import { ReadCategoryDTO } from '../../../domain/dtos/category.dtos';

export interface FindOneCategoryUseCase {
    execute(id: string): Promise<ReadCategoryDTO>;
}
