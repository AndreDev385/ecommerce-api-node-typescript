import { Category, CreateCategory } from "../../../domain/entity/category";
import { CategoryRepository } from "../../../domain/repository/interface/category-repository";
import { CreateCategoryUseCase } from "../../usecases/category/create-category-usecase";

export class CreateCategoryImpl implements CreateCategoryUseCase {
  private categoryRepository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  async execute(category: CreateCategory): Promise<Category> {
    Category.validateCreateCategory(category);
    const existCategory = await this.categoryRepository.findName(category.name);
    if (existCategory) throw new Error("Category already exist");
    const result = await this.categoryRepository.create(category);
    return result;
  }
}
