import { UpdateBrand, Brand } from "../../../domain/entity/brand";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { BrandRepository } from "../../../domain/repository/interface/brand-repository";
import { UpdateBrandUseCase } from "../../usecases/brand/update-brand";

export class UpdateBrandImpl implements UpdateBrandUseCase {
  private brandRepository: BrandRepository;
  constructor(repository: BrandRepository) {
    this.brandRepository = repository;
  }

  async execute(id: number, data: UpdateBrand): Promise<Brand> {
    Brand.validateUpdateBrand(data);
    const brand = await this.brandRepository.findById(id);
    if (!brand) throw new NotFoundError("Brand");
    await this.brandRepository.update(id, data);
    const result = await this.brandRepository.findById(id);
    return result;
  }
}
