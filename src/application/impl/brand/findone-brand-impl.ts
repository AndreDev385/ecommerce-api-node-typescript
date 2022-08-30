import { Asset } from "../../../domain/entity/asset";
import { Brand, ReadBrandDTO } from "../../../domain/entity/brand";
import { Product } from "../../../domain/entity/product";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { BrandRepository } from "../../../domain/repository/interface/brand-repository";
import { FindOneBrandUseCase } from "../../usecases/brand/findone-brand";
import { CreateReadBrandDTO } from "../../utils/createDtos";

export class FindOneBrandImpl implements FindOneBrandUseCase {
  private brandRepository: BrandRepository;
  constructor(repository: BrandRepository) {
    this.brandRepository = repository;
  }

  async execute(id: number): Promise<ReadBrandDTO> {
    const result = await this.brandRepository.findById(id);
    if (!result) throw new NotFoundError("Brand");
    return CreateReadBrandDTO(result)
  }
}
