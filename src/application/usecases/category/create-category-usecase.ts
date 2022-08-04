import { Category, CreateCategory } from "../../../domain/entity/category";

export interface CreateCategoryUseCase {
  execute(category: CreateCategory): Promise<Category>;
}
