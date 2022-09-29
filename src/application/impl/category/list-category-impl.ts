import { CategoryRepository } from '../../../domain/repository/interface/category-repository';
import { ListCategoriesUseCase } from '../../usecases/category/list-categories';

export class ListCategoryImpl implements ListCategoriesUseCase {
  private readonly categoryRepository: CategoryRepository;
  private static instance: ListCategoriesUseCase;

  constructor (repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  static getInstance (repo: CategoryRepository) {
    if (!ListCategoryImpl.instance) {
      ListCategoryImpl.instance = new ListCategoryImpl(repo);
    }
    return ListCategoryImpl.instance;
  }

  async execute (): Promise<object[]> {
    const categories = await this.categoryRepository.findAll();
    return categories.map((c) => c.getData());
  }
}
