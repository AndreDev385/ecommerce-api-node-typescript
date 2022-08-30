import { Category, ReadCategoryDTO } from "../../../domain/entity/category";

export interface FindOneCategoryUseCase {
  execute(id: number): Promise<ReadCategoryDTO>;
}
