import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { CategoryRepository } from "../../../domain/repository/interface/category-repository";
import { DeleteCategoryUseCase } from "../../usecases/category/delete-category-usecase";

export class DeleteCategoryImpl implements DeleteCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  async execute(id: number): Promise<void> {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundError("Category");
    await this.categoryRepository.delete(id);
  }
}
