import { CreateProductDTO, Product, ReadProductDTO } from "../../../domain/entity/product";
import { ProductRepository } from "../../../domain/repository/interface/product-repository";
import { CreateProductUseCase } from "../../usecases/product/create-product-usecase";
import { CreateReadProductDTO } from "../../utils/createDtos";

export class CreateProductImpl implements CreateProductUseCase {
  private productRepository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.productRepository = repository;
  }

  async execute(product: CreateProductDTO): Promise<ReadProductDTO> {
    Product.validateCreateProduct(product);
    const result = await this.productRepository.create(product);
    return CreateReadProductDTO(result)
  }
}
