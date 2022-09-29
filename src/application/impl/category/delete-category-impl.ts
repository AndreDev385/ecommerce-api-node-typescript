import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { CategoryRepository } from '../../../domain/repository/interface/category-repository';
import { DeleteCategoryUseCase } from '../../usecases/category/delete-category-usecase';

export class DeleteCategoryImpl implements DeleteCategoryUseCase {
  private readonly categoryRepository: CategoryRepository;
  private static instance: DeleteCategoryUseCase;

  constructor (repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  public static getInstance (repo: CategoryRepository) {
    if (!DeleteCategoryImpl.instance) {
      DeleteCategoryImpl.instance = new DeleteCategoryImpl(repo);
    }
    return DeleteCategoryImpl.instance;
  }

  async execute (id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);
    if (category == null) throw new NotFoundError('Category');
    await this.categoryRepository.delete(id);
  }
}
