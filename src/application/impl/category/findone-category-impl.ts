import { Category, ReadCategoryDTO } from "../../../domain/entity/category";
import { CategoryRepository } from "../../../domain/repository/interface/category-repository";
import { FindOneCategoryUseCase } from "../../usecases/category/findone-category-usecase";
import { CreateReadCategoryDTO } from "../../utils/createDtos";

export class FindOneCategoryImpl implements FindOneCategoryUseCase {
  private categoryRepository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  async execute(id: number): Promise<ReadCategoryDTO> {
    const result = await this.categoryRepository.findById(id);
    return CreateReadCategoryDTO(result)
  }
}
