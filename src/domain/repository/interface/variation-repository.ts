import {
  CreateVariation,
  UpdateVariation,
  Variation,
} from "../../entity/variation";

export interface VariationRepository {
  create(variation: CreateVariation): Promise<Variation>;
  findAll(): Promise<Variation[]>;
  findOne(id: number): Promise<Variation>;
  update(id: number, data: UpdateVariation): Promise<Variation>;
  delete(id: number): Promise<void>;
}
