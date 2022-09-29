import { Attribute } from '../../../domain/entity/variation'
import { AttributeRepository } from '../../../domain/repository/interface/attribute-respository'
import { CreateAttributeUseCase } from '../../usecases/variation/create-attribute-usecase'

export class CreateAttributeImpl implements CreateAttributeUseCase {
  constructor (private readonly repository: AttributeRepository) {}

  async execute (attribute: Attribute): Promise<Attribute> {
    const result = await this.repository.create(attribute)
    return result
  }
}
