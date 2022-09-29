import { Attribute } from '../../../domain/entity/variation'

export interface CreateAttributeUseCase {
  execute: (attribute: Attribute) => Promise<Attribute>
}
