import { CreateCategory, Category, UpdateCategory } from "../../entity/category";

export interface CategoryRepository {
  create(category: CreateCategory): Promise<Category>;
  findAll(): Promise<Category[]>;
  findName(name: string): Promise<Category>
  findById(id: number): Promise<Category>
  update(id: number, data: UpdateCategory): Promise<Category>
  delete(id: number): Promise<void>
}
