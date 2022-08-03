import { Category } from "../../../domain/entity/category";

export interface CreateCategoryUseCase {
  execute(category: Category): Promise<Category>;
}
