import { CreateVariation, Variation } from "../../../domain/entity/variation";
import { VariationRepository } from "../../../domain/repository/interface/variation-repository";
import { CreateVariationUseCase } from "../../usecases/variation/create-variation-usecase";

export class CreateVariationImpl implements CreateVariationUseCase {
  constructor(private repository: VariationRepository) {}

  async execute(variation: CreateVariation): Promise<Variation> {
    Variation.validateCreateVariation(variation);
    if (!variation.stock) {
      const result = await this.repository.create(variation);
      return result;
    }
    variation.stock > 0
      ? (variation.isAvaible = true)
      : (variation.isAvaible = false);
    const result = await this.repository.create(variation);
    return result;
  }
}
