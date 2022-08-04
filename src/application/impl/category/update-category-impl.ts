import { UpdateCategory, Category } from "../../../domain/entity/category";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { CategoryRepository } from "../../../domain/repository/interface/category-repository";
import { UpdateCategoryUseCase } from "../../usecases/category/update-category-usecase";

export class UpdateCategoryImpl implements UpdateCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  async execute(id: number, data: UpdateCategory): Promise<Category> {
    Category.validateUpdateCategory(data);
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundError("Category");
    await this.categoryRepository.update(id, data);
    const result = await this.categoryRepository.findById(id);
    return result;
  }
}
