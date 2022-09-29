import { Brand } from '../../../domain/entity/brand';
import { InputBrandDto, OutputBrandDto } from '../../../domain/dtos/brand-dtos';
import { BrandRepository } from '../../../domain/repository/interface/brand-repository';
import { SaveBrandUseCase } from '../../usecases/brand/save-brand';
import { Asset } from '../../../domain/entity/asset';
import { v4 } from 'uuid';

export class SaveBrandUseCaseImpl implements SaveBrandUseCase {
  private readonly brandRepository: BrandRepository;
  private static intance: SaveBrandUseCase;

  constructor (repository: BrandRepository) {
    this.brandRepository = repository;
  }

  public static getInstance (repo: BrandRepository) {
    if (!SaveBrandUseCaseImpl.intance) {
      SaveBrandUseCaseImpl.intance = new SaveBrandUseCaseImpl(repo);
    }
    return SaveBrandUseCaseImpl.intance;
  }

  async execute (input: InputBrandDto): Promise<OutputBrandDto> {
    console.log(input, 'Input');
    let result: Brand;
    if (input.id) {
      const brand = new Brand(input)
      result = await this.brandRepository.update(brand);
    } else {
      const id = v4()
      const brand = new Brand({ ...input, id })
      const existBrand = await this.brandRepository.findByName(brand.getData().name);

      if (existBrand instanceof Brand && existBrand.getData().name == brand.getData().name) { throw new Error('Brand already exist!'); }
      result = await this.brandRepository.create(brand);
    }

    return result.getData();
  }
}
