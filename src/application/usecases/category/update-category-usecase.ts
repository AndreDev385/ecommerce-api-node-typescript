import { Category, UpdateCategory } from "../../../domain/entity/category";

export interface UpdateCategoryUseCase {
  execute(id: number, data: UpdateCategory): Promise<Category>
}