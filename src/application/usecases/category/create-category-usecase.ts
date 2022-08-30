import { Category, CreateCategoryDTO, ReadCategoryDTO } from "../../../domain/entity/category";

export interface CreateCategoryUseCase {
  execute(category: CreateCategoryDTO): Promise<ReadCategoryDTO>;
}
