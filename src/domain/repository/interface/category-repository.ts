import { Category } from '../../entity/category';

export interface CategoryRepository {
  create: (category: Category) => Promise<Category>
  findAll: () => Promise<Category[]>
  findByName: (name: string) => Promise<Category | null>
  findById: (id: string) => Promise<Category | null>
  update: (category: Category) => Promise<Category>
  delete: (id: string) => Promise<void>
}
