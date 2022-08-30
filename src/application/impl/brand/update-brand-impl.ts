import {
  UpdateBrandDTO,
  Brand,
  ReadBrandDTO,
} from "../../../domain/entity/brand";
import { Product } from "../../../domain/entity/product";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { BrandRepository } from "../../../domain/repository/interface/brand-repository";
import { UpdateBrandUseCase } from "../../usecases/brand/update-brand";
import { CreateReadBrandDTO } from "../../utils/createDtos";

export class UpdateBrandImpl implements UpdateBrandUseCase {
  private brandRepository: BrandRepository;
  constructor(repository: BrandRepository) {
    this.brandRepository = repository;
  }

  async execute(id: number, data: UpdateBrandDTO): Promise<ReadBrandDTO> {
    Brand.validateUpdateBrand(data);
    const brand = await this.brandRepository.findById(id);
    if (!brand) throw new NotFoundError("Brand");
    await this.brandRepository.update(id, data);
    const result = await this.brandRepository.findById(id);

    return CreateReadBrandDTO(result)
  }
}
