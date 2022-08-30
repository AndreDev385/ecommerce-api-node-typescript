import { ReadVariationDTO, Variation } from "../../../domain/entity/variation";
import { VariationRepository } from "../../../domain/repository/interface/variation-repository";
import { ListVariationUseCase } from "../../usecases/variation/list-variation-usecase";
import { CreateReadVariationDTO } from "../../utils/createDtos";

export class ListVariationImpl implements ListVariationUseCase {
  constructor(private repository: VariationRepository) {}

  async execute(): Promise<ReadVariationDTO[]> {
    const result = await this.repository.findAll();
    return result.map((v) => CreateReadVariationDTO(v));
  }
}
