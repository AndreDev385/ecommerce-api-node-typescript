import { BrandRepository } from '../../../domain/repository/interface/brand-repository';
import { ListBrandUseCase } from '../../usecases/brand/list-brand';
import { OutputBrandDto } from '../../../domain/dtos/brand-dtos';

export class ListBrandImpl implements ListBrandUseCase {
  private static instance: ListBrandUseCase;
  private readonly brandRepository: BrandRepository;

  constructor (repository: BrandRepository) {
    this.brandRepository = repository;
  }

  public static getInstance (repo: BrandRepository) {
    if (!ListBrandImpl.instance) {
      ListBrandImpl.instance = new ListBrandImpl(repo);
    }
    return ListBrandImpl.instance;
  }

  async execute (): Promise<OutputBrandDto[]> {
    const result = await this.brandRepository.findAll();
    return result.map((b) => b.getData());
  }
}
