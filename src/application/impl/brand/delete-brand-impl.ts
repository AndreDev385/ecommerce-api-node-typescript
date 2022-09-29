import { Brand } from '../../../domain/entity/brand';
import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { BrandRepository } from '../../../domain/repository/interface/brand-repository';
import { DeleteBrandUseCase } from '../../usecases/brand/delete-brand';

export class DeleteBrandImpl implements DeleteBrandUseCase {
  private readonly brandRepository: BrandRepository;
  private static instance: DeleteBrandUseCase;

  constructor (repository: BrandRepository) {
    this.brandRepository = repository;
  }

  public static getInstance (repo: BrandRepository) {
    if (!DeleteBrandImpl.instance) {
      DeleteBrandImpl.instance = new DeleteBrandImpl(repo);
    }
    return DeleteBrandImpl.instance;
  }

  async execute (id: string): Promise<void> {
    const brand = await this.brandRepository.findById(id);
    if (brand == null) throw new NotFoundError('Brand');
    await this.brandRepository.delete(id);
  }
}
