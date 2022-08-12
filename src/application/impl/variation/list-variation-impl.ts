import { Variation } from "../../../domain/entity/variation";
import { VariationRepository } from "../../../domain/repository/interface/variation-repository";
import { ListVariationUseCase } from "../../usecases/variation/list-variation-usecase";

export class ListVariationImpl implements ListVariationUseCase {
  constructor(private repository: VariationRepository) {}

  async execute(): Promise<Variation[]> {
    return await this.repository.findAll();
  }
}
