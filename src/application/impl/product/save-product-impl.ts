import { v4 } from 'uuid';
import { InputProductDto } from '../../../domain/dtos/product-dtos';
import { Product } from '../../../domain/entity/product';
import { ProductRepository } from '../../../domain/repository/interface/product-repository';
import { SaveProductUseCase } from '../../usecases/product/create-product-usecase';

export class SaveProductImpl implements SaveProductUseCase {
  private readonly productRepository: ProductRepository;
  private static instance: SaveProductImpl;

  constructor (repository: ProductRepository) {
    this.productRepository = repository;
  }

  static getInstance (repo: ProductRepository) {
    if (!SaveProductImpl.instance) {
      SaveProductImpl.instance = new SaveProductImpl(repo);
    }
    return SaveProductImpl.instance;
  }

  async execute (input: InputProductDto): Promise<object> {
    let result: Product;
    if (input.id) {
      const product = new Product(input);
      result = await this.productRepository.update(product);
    } else {
      const id = v4();
      const brand = new Product({ ...input, id });
      const existBrand = await this.productRepository.findByName(brand.getData().name);

      if (existBrand instanceof Product && existBrand.getData().name == brand.getData().name) {
        throw new Error('Product already exist!');
      }
      result = await this.productRepository.create(brand);
    }

    return result.getData();
  }
}
