import { Brand, ReadBrandDTO } from "../../../domain/entity/brand";
import { Product } from "../../../domain/entity/product";
import { BrandRepository } from "../../../domain/repository/interface/brand-repository";
import { ListBrandUseCase } from "../../usecases/brand/list-brand";
import { CreateReadBrandDTO } from "../../utils/createDtos";

export class ListBrandImpl implements ListBrandUseCase {
  private brandRepository: BrandRepository;
  constructor(repository: BrandRepository) {
    this.brandRepository = repository;
  }

  async execute(): Promise<ReadBrandDTO[]> {
    const result = await this.brandRepository.findAll();
    return result.map((brand) => CreateReadBrandDTO(brand));
  }
}
