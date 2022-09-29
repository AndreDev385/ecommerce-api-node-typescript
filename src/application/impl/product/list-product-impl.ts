import { ReadProductDTO } from '../../../domain/dtos/product-dtos';
import { Product } from '../../../domain/entity/product';
import { ProductRepository } from '../../../domain/repository/interface/product-repository';
import { ListProductUseCase } from '../../usecases/product/list-product-usecase';

export class ListProductImpl implements ListProductUseCase {
  private readonly productRepository: ProductRepository;
  private static instance: ListProductUseCase;

  constructor (repository: ProductRepository) {
    this.productRepository = repository;
  }

  static getInstance (repo: ProductRepository) {
    if (!ListProductImpl.instance) {
      ListProductImpl.instance = new ListProductImpl(repo);
    }
    return ListProductImpl.instance;
  }

  async execute (): Promise<ReadProductDTO[]> {
    const resutl = await this.productRepository.findAll();
    return resutl.map((p) => p.getData());
  }
}
