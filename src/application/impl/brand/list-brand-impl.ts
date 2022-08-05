import { Brand } from "../../../domain/entity/brand";
import { BrandRepository } from "../../../domain/repository/interface/brand-repository";
import { ListBrandUseCase } from "../../usecases/brand/list-brand";

export class ListBrandImpl implements ListBrandUseCase {
  private brandRepository:BrandRepository
  constructor(repository: BrandRepository){
    this.brandRepository = repository
  }

  async execute(): Promise<Brand[]> {
    const result = await this.brandRepository.findAll()
    return result
  }
}