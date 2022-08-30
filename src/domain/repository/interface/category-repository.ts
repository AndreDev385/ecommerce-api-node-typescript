import { CreateCategoryDTO, Category, UpdateCategoryDTO, ReadCategoryDTO } from "../../entity/category";

export interface CategoryRepository {
  create(category: CreateCategoryDTO): Promise<Category>;
  findAll(): Promise<Category[]>;
  findName(name: string): Promise<Category>
  findById(id: number): Promise<Category>
  update(id: number, data: UpdateCategoryDTO): Promise<Category>
  delete(id: number): Promise<void>
}
