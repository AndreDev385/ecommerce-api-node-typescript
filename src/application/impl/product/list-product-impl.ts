import { Product, ReadProductDTO } from "../../../domain/entity/product";
import { ProductRepository } from "../../../domain/repository/interface/product-repository";
import { ListProductUseCase } from "../../usecases/product/list-product-usecase";
import { CreateProductDTO } from "../../utils/createDtos";

export class ListProductImpl implements ListProductUseCase {
  private productRepository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.productRepository = repository;
  }

  async execute(): Promise<ReadProductDTO[]> {
    const result = await this.productRepository.findAll();
    return result.map((product) => CreateProductDTO(product));
  }
}
