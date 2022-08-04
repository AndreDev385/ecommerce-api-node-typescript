import { Category } from "../../../domain/entity/category";

export interface FindOneCategoryUseCase {
  execute(id: number): Promise<Category>;
}
