import { Variation } from '../../entity/variation';

export interface VariationRepository {
  create: (variation: Variation) => Promise<Variation>
  findAll: () => Promise<Variation[]>
  findOne: (id: string) => Promise<Variation | null>
  update: (variation: Variation) => Promise<Variation>
  delete: (id: string) => Promise<void>
}
