import { Product, ReadProductDTO } from "../../../domain/entity/product";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { ProductRepository } from "../../../domain/repository/interface/product-repository";
import { FindOneProductUseCase } from "../../usecases/product/findone-product-usecase";
import { CreateProductDTO } from "../../utils/createDtos";

export class FindOneProductImpl implements FindOneProductUseCase {
  private productRepository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.productRepository = repository;
  }

  async execute(id: number): Promise<ReadProductDTO> {
    const result = await this.productRepository.findOne(id);
    if (!result) throw new NotFoundError("Product");
    return CreateProductDTO(result);
  }
}
