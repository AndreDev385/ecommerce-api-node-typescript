import { CategoryRepository } from '../../../domain/repository/interface/category-repository';
import { FindOneCategoryUseCase } from '../../usecases/category/findone-category-usecase';

export class FindOneCategoryImpl implements FindOneCategoryUseCase {
  private readonly categoryRepository: CategoryRepository;
  private static instance: FindOneCategoryUseCase;

  constructor (repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  static getInstance (repo: CategoryRepository) {
    if (!FindOneCategoryImpl.instance) {
      FindOneCategoryImpl.instance = new FindOneCategoryImpl(repo);
    }
    return FindOneCategoryImpl.instance;
  }

  async execute (id: string): Promise<object> {
    const result = await this.categoryRepository.findById(id);
    if (result == null) {
      throw new Error('Not found');
    }
    return result.getData();
  }
}
