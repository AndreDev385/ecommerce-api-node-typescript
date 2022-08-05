import { Brand } from "../../../domain/entity/brand";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { BrandRepository } from "../../../domain/repository/interface/brand-repository";
import { FindOneBrandUseCase } from "../../usecases/brand/findone-brand";

export class FindOneBrandImpl implements FindOneBrandUseCase {
  private brandRepository: BrandRepository;
  constructor(repository: BrandRepository) {
    this.brandRepository = repository;
  }

  async execute(id: number): Promise<Brand> {
    const result = await this.brandRepository.findById(id);
    if (!result) throw new NotFoundError("Brand");
    return result;
  }
}
