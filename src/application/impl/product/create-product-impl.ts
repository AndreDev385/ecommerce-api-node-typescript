import { CreateProduct, Product } from "../../../domain/entity/product";
import { ProductRepository } from "../../../domain/repository/interface/product-repository";
import { CreateProductUseCase } from "../../usecases/product/create-product-usecase";

export class CreateProductImpl implements CreateProductUseCase {
  private productRepository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.productRepository = repository;
  }

  async execute(product: CreateProduct): Promise<Product> {
    Product.validateCreateProduct(product);
    return await this.productRepository.create(product);
  }
}
