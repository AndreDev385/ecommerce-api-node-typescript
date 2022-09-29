import { ReadVariationDTO } from '../../../domain/dtos/variation-dtos';
import { VariationRepository } from '../../../domain/repository/interface/variation-repository';
import { ListVariationUseCase } from '../../usecases/variation/list-variation-usecase';

export class ListVariationImpl implements ListVariationUseCase {
  private static instance: ListVariationUseCase;
  constructor(private readonly repository: VariationRepository) {}

  static getInstance(repo: VariationRepository) {
    if (!ListVariationImpl.instance) {
      ListVariationImpl.instance = new ListVariationImpl(repo);
    }
    return ListVariationImpl.instance;
  }

  async execute(): Promise<ReadVariationDTO[]> {
    const result = await this.repository.findAll();
    return result.map((v) => v.getData());
  }
}
