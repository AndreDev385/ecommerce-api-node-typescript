import { CreateVariation, Variation } from "../../../domain/entity/variation";

export interface CreateVariationUseCase {
  execute(variation: CreateVariation): Promise<Variation>
}