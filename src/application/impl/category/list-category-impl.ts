import { Category } from "../../../domain/entity/category";
import { CategoryRepository } from "../../../domain/repository/interface/category-repository";
import { ListCategoriesUseCase } from "../../usecases/category/list-categories";

export class ListCategoryImpl implements ListCategoriesUseCase {
  private categoryRepository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  async execute(): Promise<Category[]> {
    const result = await this.categoryRepository.findAll();
    return result
  }
}
