import { Brand } from "../../../domain/entity/brand";
import { NotFoundError } from "../../../domain/exceptions/exceptions";
import { BrandRepository } from "../../../domain/repository/interface/brand-repository";
import { DeleteBrandUseCase } from "../../usecases/brand/delete-brand";

export class DeleteBrandImpl implements DeleteBrandUseCase {
  private brandRepository: BrandRepository;

  constructor(repository: BrandRepository) {
    this.brandRepository = repository;
  }

  async execute(id: number): Promise<void> {
    const brand = await this.brandRepository.findById(id);
    if (!brand) throw new NotFoundError("Brand");
    await this.brandRepository.delete(id);
  }
}
