import { UpdateProduct, Product } from "../../../domain/entity/product";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { ProductRepository } from "../../../domain/repository/interface/product-repository";
import { UpdateProductUseCase } from "../../usecases/product/update-product-usecase";

export class UpdateProductImpl implements UpdateProductUseCase {
  private productRepository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.productRepository = repository;
  }

  async execute(id: number, data: UpdateProduct): Promise<Product> {
    Product.validateUpdateProduct(data);
    const existProduct = await this.productRepository.findOne(id);
    if (!existProduct) throw new NotFoundError("Product");
    await this.productRepository.update(id, data);
    return await this.productRepository.findOne(id);
  }
}
