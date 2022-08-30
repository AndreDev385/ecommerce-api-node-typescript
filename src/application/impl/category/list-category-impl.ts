import { Category, ReadCategoryDTO } from "../../../domain/entity/category";
import { CategoryRepository } from "../../../domain/repository/interface/category-repository";
import { ListCategoriesUseCase } from "../../usecases/category/list-categories";
import { CreateReadCategoryDTO } from "../../utils/createDtos";

export class ListCategoryImpl implements ListCategoriesUseCase {
  private categoryRepository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  async execute(): Promise<ReadCategoryDTO[]> {
    const categories = await this.categoryRepository.findAll();
    return categories.map((c) => CreateReadCategoryDTO(c));
  }
}
