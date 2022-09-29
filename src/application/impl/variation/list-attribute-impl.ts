import { Attribute } from '../../../domain/entity/variation'
import { AttributeRepository } from '../../../domain/repository/interface/attribute-respository'
import { ListAttributeUseCase } from '../../usecases/variation/list-attribute-usecase'

export class ListAttributeImpl implements ListAttributeUseCase {
  constructor (private readonly repository: AttributeRepository) {}

  async execute (): Promise<Attribute[]> {
    const result = await this.repository.findAll();
    return result;
  }
}
