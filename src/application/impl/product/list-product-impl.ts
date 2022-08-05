import { Product } from "../../../domain/entity/product";
import { ProductRepository } from "../../../domain/repository/interface/product-repository";
import { ListProductUseCase } from "../../usecases/product/list-product-usecase";

export class ListProductImpl implements ListProductUseCase {
  private productRepository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.productRepository = repository;
  }

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
