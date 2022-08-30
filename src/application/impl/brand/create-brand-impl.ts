import { Brand, ReadBrandDTO } from "../../../domain/entity/brand";
import { BrandRepository } from "../../../domain/repository/interface/brand-repository";
import { CreateBrandUseCase } from "../../usecases/brand/create-brand";
import { CreateReadBrandDTO } from "../../utils/createDtos";

export class CreateBrandImpl implements CreateBrandUseCase {
  private brandRepository: BrandRepository;
  constructor(repository: BrandRepository) {
    this.brandRepository = repository;
  }

  async execute(brand: Brand): Promise<ReadBrandDTO> {
    Brand.validateCreateBrand(brand);
    const existBrand = await this.brandRepository.findByName(brand.name);
    if (existBrand) throw new Error("Brand already exist!");
    const result = await this.brandRepository.create(brand);
    return CreateReadBrandDTO(result)
  }
}
