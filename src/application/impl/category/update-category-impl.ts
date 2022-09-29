import {
  UpdateCategoryDTO,
  Category,
  ReadCategoryDTO
} from '../../../domain/entity/category'
import { NotFoundError } from '../../../domain/exceptions/exceptions'
import { CategoryRepository } from '../../../domain/repository/interface/category-repository'
import { UpdateCategoryUseCase } from '../../usecases/category/update-category-usecase'
import { CreateReadCategoryDTO } from '../../utils/createDtos'

export class UpdateCategoryImpl implements UpdateCategoryUseCase {
  private readonly categoryRepository: CategoryRepository;

  constructor (repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  async execute (id: number, data: UpdateCategoryDTO): Promise<ReadCategoryDTO> {
    Category.validateUpdateCategory(data);
    const category = await this.categoryRepository.findById(id);
    if (category == null) throw new NotFoundError('Category')
    await this.categoryRepository.update(id, data);
    const result = await this.categoryRepository.findById(id);
    return CreateReadCategoryDTO(result);
  }
}
