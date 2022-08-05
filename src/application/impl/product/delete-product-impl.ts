import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { ProductRepository } from "../../../domain/repository/interface/product-repository";
import { DeleteProductUseCase } from "../../usecases/product/delete-product-usecase";

export class DeleteProductImpl implements DeleteProductUseCase {
  productRepository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.productRepository = repository;
  }

  async execute(id: number): Promise<void> {
    const existProduct = await this.productRepository.findOne(id);
    if (!existProduct) throw new NotFoundError("Product");
    await this.productRepository.delete(id);
  }
}
