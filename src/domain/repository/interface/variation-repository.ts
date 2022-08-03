import { CreateVariation, Variation } from "../../entity/variation";

export interface VariationRepository {
  create(variation: CreateVariation): Promise<Variation>
  findAll(): Promise<Variation[]>
}