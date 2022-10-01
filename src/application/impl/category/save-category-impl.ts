import { v4 } from 'uuid';
import { CreateCategoryDTO } from '../../../domain/dtos/category.dtos';
import { Category } from '../../../domain/entity/category';
import { CategoryRepository } from '../../../domain/repository/interface/category-repository';
import { SaveCategoryUseCase } from '../../usecases/category/save-category-usecase';

export class SaveCategoryImpl implements SaveCategoryUseCase {
  private readonly categoryRepository: CategoryRepository;
  private static instance: SaveCategoryUseCase;

  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  public static getInstance(repo: CategoryRepository) {
    if (!SaveCategoryImpl.instance) {
      SaveCategoryImpl.instance = new SaveCategoryImpl(repo);
    }
    return SaveCategoryImpl.instance;
  }

  async execute(input: CreateCategoryDTO): Promise<object> {
    let result: Category;
    if (input.id) {
      const brand = new Category(input);
      result = await this.categoryRepository.update(brand);
    } else {
      const id = v4();
      const category = new Category({ ...input, id });
      const existCategory = await this.categoryRepository.findByName(category.getData().name);

      if (existCategory) {
        throw new Error('Category already exist!');
      }
      result = await this.categoryRepository.create(category);
    }

    return result.getData();
  }
}
