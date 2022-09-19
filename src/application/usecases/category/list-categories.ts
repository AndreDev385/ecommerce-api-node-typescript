import { ReadCategoryDTO } from '../../../domain/dtos/category.dtos';

export interface ListCategoriesUseCase {
    execute(): Promise<ReadCategoryDTO[]>;
}
