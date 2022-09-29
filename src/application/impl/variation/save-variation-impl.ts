import { v4 } from 'uuid';
import { InputVariationDto, ReadVariationDTO } from '../../../domain/dtos/variation-dtos';
import { Variation } from '../../../domain/entity/variation';
import { VariationRepository } from '../../../domain/repository/interface/variation-repository';
import { SaveVariationUseCase } from '../../usecases/variation/save-variation-usecase';

export class SaveVariationImpl implements SaveVariationUseCase {
  private static instance: SaveVariationUseCase;
  constructor(private readonly repository: VariationRepository) {}

  static getInstance(repo: VariationRepository) {
    if (!SaveVariationImpl.instance) {
      SaveVariationImpl.instance = new SaveVariationImpl(repo);
    }

    return SaveVariationImpl.instance;
  }

  async execute(input: InputVariationDto): Promise<ReadVariationDTO> {
    let result: Variation;
    if (input.id) {
      const variation = new Variation(input);
      result = await this.repository.update(variation);
    } else {
      const id = v4();
      const variation = new Variation({ ...input, id });
      result = await this.repository.create(variation);
    }

    return result.getData();
  }
}
