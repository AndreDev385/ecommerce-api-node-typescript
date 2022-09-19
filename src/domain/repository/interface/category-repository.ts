import { Category } from '../../entity/category';

export interface CategoryRepository {
    create(category: Category): Promise<Category>;
    findAll(): Promise<Category[]>;
    findName(name: string): Promise<Category>;
    findById(id: string): Promise<Category>;
    update(category: Category): Promise<Category>;
    delete(id: string): Promise<void>;
}
