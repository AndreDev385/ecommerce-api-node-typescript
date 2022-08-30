import { CreateVariation, ReadVariationDTO, Variation } from "../../../domain/entity/variation";
import { VariationRepository } from "../../../domain/repository/interface/variation-repository";
import { CreateVariationUseCase } from "../../usecases/variation/create-variation-usecase";
import { CreateReadVariationDTO } from "../../utils/createDtos";

export class CreateVariationImpl implements CreateVariationUseCase {
  constructor(private repository: VariationRepository) {}

  async execute(variation: CreateVariation): Promise<ReadVariationDTO> {
    Variation.validateCreateVariation(variation);
    if (!variation.stock) {
      variation.stock = 0
    }
    variation.stock > 0
      ? (variation.isAvaible = true)
      : (variation.isAvaible = false);
    const result = await this.repository.create(variation);
    return CreateReadVariationDTO(result)
  }
}
