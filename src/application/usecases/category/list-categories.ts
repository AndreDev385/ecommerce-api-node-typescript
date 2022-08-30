import { Category, ReadCategoryDTO } from "../../../domain/entity/category";

export interface ListCategoriesUseCase {
  execute(): Promise<ReadCategoryDTO[]>
}