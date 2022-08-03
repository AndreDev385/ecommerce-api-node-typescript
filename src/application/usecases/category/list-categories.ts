import { Category } from "../../../domain/entity/category";

export interface ListCategoriesUseCase {
  execute(): Promise<Category[]>
}