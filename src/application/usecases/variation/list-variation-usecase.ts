import { Variation } from "../../../domain/entity/variation";

export interface ListVariationUseCase {
  execute(): Promise<Variation[]>;
}
