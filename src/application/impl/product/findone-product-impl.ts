import { ReadProductDTO } from '../../../domain/dtos/product-dtos';
import { Product } from '../../../domain/entity/product';

import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { ProductRepository } from '../../../domain/repository/interface/product-repository';
import { FindOneProductUseCase } from '../../usecases/product/findone-product-usecase';

export class FindOneProductImpl implements FindOneProductUseCase {
  private readonly productRepository: ProductRepository;
  private static instance: FindOneProductImpl;

  constructor (repository: ProductRepository) {
    this.productRepository = repository;
  }

  static getInstance (repo: ProductRepository) {
    if (!FindOneProductImpl.instance) {
      FindOneProductImpl.instance = new FindOneProductImpl(repo);
    }
    return FindOneProductImpl.instance;
  }

  async execute (id: string): Promise<ReadProductDTO> {
    const result = await this.productRepository.findOne(id);
    if (result == null) throw new NotFoundError('Product');
    return result.getData();
  }
}
