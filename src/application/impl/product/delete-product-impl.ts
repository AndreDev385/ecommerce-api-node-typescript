import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { ProductRepository } from '../../../domain/repository/interface/product-repository';
import { DeleteProductUseCase } from '../../usecases/product/delete-product-usecase';

export class DeleteProductImpl implements DeleteProductUseCase {
  private readonly productRepository: ProductRepository;
  private static instance: DeleteProductUseCase;

  constructor (repository: ProductRepository) {
    this.productRepository = repository;
  }

  static getInstance (repo: ProductRepository) {
    if (!DeleteProductImpl.instance) {
      DeleteProductImpl.instance = new DeleteProductImpl(repo);
    }
    return DeleteProductImpl.instance;
  }

  async execute (id: string): Promise<void> {
    const existProduct = await this.productRepository.findOne(id);
    if (existProduct == null) throw new NotFoundError('Product');
    await this.productRepository.delete(id);
  }
}
