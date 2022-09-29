import { OutputBrandDto } from '../../../domain/dtos/brand-dtos';
import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { BrandRepository } from '../../../domain/repository/interface/brand-repository';
import { FindOneBrandUseCase } from '../../usecases/brand/findone-brand';

export class FindOneBrandImpl implements FindOneBrandUseCase {
  private static instance: FindOneBrandUseCase;
  private readonly brandRepository: BrandRepository;

  constructor (repository: BrandRepository) {
    this.brandRepository = repository;
  }

  public static getInstance (repo: BrandRepository) {
    if (!FindOneBrandImpl.instance) {
      FindOneBrandImpl.instance = new FindOneBrandImpl(repo);
    }
    return FindOneBrandImpl.instance;
  }

  async execute (id: string): Promise<OutputBrandDto> {
    const result = await this.brandRepository.findById(id);
    if (result == null) throw new NotFoundError('Brand');
    return result.getData();
  }
}
