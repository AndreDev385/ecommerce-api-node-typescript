import { Category } from "../../../domain/entity/category";
import { CategoryRepository } from "../../../domain/repository/interface/category-repository";
import { FindOneCategoryUseCase } from "../../usecases/category/findone-category-usecase";

export class FindOneCategoryImpl implements FindOneCategoryUseCase {
  private categoryRepository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  async execute(id: number): Promise<Category> {
    const result = await this.categoryRepository.findById(id);
    return result;
  }
}
